"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch,useSelector } from "react-redux";
import {
  faGaugeHigh,
  faPlus,
  faFileLines,
  faUser,
  faArrowRightFromBracket,
  faBars,
  faBell,
  faBriefcase,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser  } from "../Redux/auth/authThunk";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { loading, error,user } = useSelector(
    (state) => state.auth
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [  
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: faGaugeHigh,
    },
    {
      name: "New Analysis",
      path: "/analyze",
      icon: faPlus,
    },
    {
      name: "My Analyses",
      path: "/history",
      icon: faFileLines,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: faUser,
    },
  ];

  const handleLogout=async()=>{
     try {
          const result = await dispatch(
            logoutUser()
          ).unwrap();
    
        //   setSuccessMessage(
        //     result.message || "logout successfully."
        //   );
    
          router.replace('/login')

  }catch(error){ 
 console.log(error);

  }
}

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">

      {/* =========================
          MOBILE OVERLAY
      ========================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-white
          border-r border-slate-200
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* =========================
            LOGO
        ========================= */}
        <div className="h-20 px-6 flex items-center border-b border-slate-100">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D4ED8] text-white">
                  <FontAwesomeIcon icon={faBriefcase} />
            </div>

            <div>

              <h1 className="font-bold text-lg tracking-tight text-[#111827]">
                Job Fit AI
              </h1>

              <p className="text-xs text-[#64748B]">
                Career intelligence
              </p>

            </div>

          </div>

        </div>


        {/* =========================
            NAVIGATION
        ========================= */}
        <div className="flex-1 px-4 py-6">

          <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Workspace
          </p>


          <nav className="space-y-2">

            {navigation.map((item) => {

        const isActive = pathname === item.path;

        return (
            <button
            key={item.path}
            onClick={() => {
                router.push(item.path);
                setSidebarOpen(false);
            }}
            className={`
                w-full
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition
                text-left

                ${
                isActive
                    ? "bg-blue-50 text-[#1D4ED8]"
                    : "text-[#64748B] hover:bg-blue-50 hover:text-[#1D4ED8]"
                }
            `}
            >
            <span className="w-6 flex justify-center">
                <FontAwesomeIcon
                icon={item.icon}
                className="text-sm"
                />
            </span>

            <span className="font-medium text-sm">
                {item.name}
            </span>
            </button>
        );
        })}

          </nav>


          {/* =========================
              ANALYZE CTA
          ========================= */}
          <div className="mt-8 p-4 rounded-2xl bg-[#1D4ED8] text-white relative overflow-hidden">

            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/10" />


            <div className="relative">

              {/* AI Icon */}
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-3">

                <FontAwesomeIcon
                  icon={faWandMagicSparkles}
                  className="text-sm"
                />

              </div>


              <h3 className="font-semibold text-sm">
                Analyze your next job
              </h3>


              <p className="text-xs text-blue-100 mt-1 leading-5">
                Discover your match score and skill gaps.
              </p>


              <button
                onClick={() => router.push("/analyze")}
                className="
                  mt-4
                  w-full
                  py-2.5
                  rounded-lg
                  bg-white
                  text-[#1D4ED8]
                  text-sm
                  font-semibold
                  hover:bg-blue-50
                  transition
                "
              >
                Start Analysis
              </button>

            </div>

          </div>

        </div>


        {/* =========================
            LOGOUT
        ========================= */}
        <div className="p-4 border-t border-slate-100">

          <button
           onClick={handleLogout}
            className="
              w-full
              flex items-center justify-center gap-3
              px-4 py-3
              rounded-xl
              text-[#64748B]
              hover:bg-red-50
              hover:text-red-600
              transition
            "
          >

            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-sm"
            />

            <span className="text-sm font-medium">
              {loading ? "loging out ...." : "Logout"}
            </span>

          </button>

            {error && (
                <p className="text-sm text-red-600" role="alert">
                {error}
                </p>
            )}

            {/* {successMessage && (
                <p className="text-sm text-green-700" role="status">
                {successMessage}
                </p>
        )} */}

        </div>

      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}
      <div className="lg:ml-72">


        {/* =========================
            HEADER
        ========================= */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">


          {/* Mobile menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              lg:hidden
              w-10 h-10
              rounded-xl
              hover:bg-slate-100
              flex items-center justify-center
              text-[#64748B]
            "
          >

            <FontAwesomeIcon
              icon={faBars}
              className="text-lg"
            />

          </button>


          {/* Desktop page area
          <div className="hidden lg:block">

            <p className="text-sm text-[#64748B]">
              Job Fit AI
            </p>

          </div> */}


          {/* =========================
              USER AREA
          ========================= */}
          <div className="flex items-center gap-3 ml-auto">


            {/* Notification */}
            {/* <button
              className="
                relative
                w-10 h-10
                rounded-xl
                hover:bg-slate-100
                flex items-center justify-center
                text-[#64748B]
                transition
              "
            >

              <FontAwesomeIcon
                icon={faBell}
                className="text-sm"
              />


              {/* Notification indicator */}
              {/* <span
                className="
                  absolute
                  top-2
                  right-2
                  w-2
                  h-2
                  bg-[#F59E0B]
                  rounded-full
                "
              />

            </button>  */}


            {/* User information */}
            <div className="hidden sm:block text-right">

              <p className="text-sm font-semibold text-[#111827]">
                  {loading ? "loading...." : user?.name}
              </p>

              <p className="text-xs text-[#64748B]">
                {loading ? "loading...." : user?.email}
              </p>

            </div>


            {/* Avatar */}
           {/* {!loading && ( */}
          <div
            className="
              w-10 h-10
              rounded-xl
              bg-[#1D4ED8]
              text-white
              flex items-center
              justify-center
              font-semibold
            "
          >
            {user?.name?.split("")?.[0]?.toUpperCase()}
          </div>
        {/* )} */}

          </div>

        </header>


        {/* =========================
            PAGE CONTENT
        ========================= */}
        <main className="p-4 sm:p-6 lg:p-8">

          {children}

        </main>

      </div>

    </div>
  );
}


