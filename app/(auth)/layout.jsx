
// "use client";

// import { usePathname, useRouter } from "next/navigation";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

// export default function AuthLayout({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const isLogin = pathname !== "/register";

//   return (
//     <main className="min-h-full bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6">
//       <div className="w-full max-w-6xl h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

//         {/* =========================
//             LEFT SIDE - BRANDING
//         ========================= */}
//         <section className="relative lg:w-1/2 bg-[#1D4ED8] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">

//           {/* Decorative circles */}
//           <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
//           <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#F59E0B]/20" />

//           {/* Logo */}
//           <div className="relative z-10">
//             <div className="flex items-center gap-3">
//              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D4ED8] text-white">
//                            <FontAwesomeIcon icon={faBriefcase} />
//               </div>

//               <div>
//                 <h1 className="font-bold text-xl tracking-tight">
//                   Job Fit AI
//                 </h1>

//                 <p className="text-xs text-blue-100">
//                   Your AI-Powered Career Assistant
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="relative z-10 my-12 lg:my-0">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
//               <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
//               AI-Powered Career Analysis
//             </div>

//             <h2 className="text-4xl sm:text-5xl font-bold leading-tight max-w-lg">
//               {isLogin
//                 ? "Welcome back to your career journey."
//                 : "Take the next step toward your dream job."}
//             </h2>

//             <p className="mt-6 text-blue-100 text-base sm:text-lg leading-7 max-w-md">
//               {isLogin
//                 ? "Sign in to analyze job opportunities, track your skill gaps, and continue preparing for your next career move."
//                 : "Create your account to discover your job match score, identify missing skills, and get a personalized interview preparation plan."}
//             </p>
//           </div>

//           {/* Bottom */}
//           <div className="relative z-10 flex items-center gap-2 text-sm text-blue-100">
//             <span>●</span>
//             <span>AI-Powered Insights</span>
//             <span>•</span>
//             <span>Career Growth</span>
//           </div>
//         </section>

//         {/* =========================
//             RIGHT SIDE - AUTH FORM
//         ========================= */}
//         <section className="lg:w-1/2 p-6 sm:p-10 lg:p-16 flex items-center justify-center">

//           <div className="w-full max-w-md">

//             {/* Heading */}
//             <div className="mb-8">
//               <p className="text-sm font-semibold text-[#F59E0B] mb-2">
//                 {isLogin ? "WELCOME BACK" : "GET STARTED"}
//               </p>

//               <h2 className="text-3xl sm:text-4xl font-bold text-[#111827]">
//                 {isLogin ? "Sign in to Job Fit AI" : "Create your account"}
//               </h2>

//               <p className="mt-2 text-[#64748B]">
//                 {isLogin
//                   ? "Enter your credentials to continue your career preparation."
//                   : "Join Job Fit AI and discover how well your skills match your dream job."}
//               </p>
//             </div>

//             {children}

//             {/* Switch Login/Register */}
//             <div className="mt-7 text-center text-sm text-[#64748B]">

//               {isLogin ? (
//                 <>
//                   Don&apos;t have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => router.push("/register")}
//                     className="font-semibold text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
//                   >
//                     Create an account
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => router.push("/login")}
//                     className="font-semibold text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
//                   >
//                     Sign in
//                   </button>
//                 </>
//               )}

//             </div>

//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }



"use client";

import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const isLogin = pathname === "/login";

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl min-h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

        {/* LEFT SIDE */}
        <section className="relative lg:w-1/2 bg-[#1D4ED8] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#F59E0B]/20" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>

              <div>
                <h1 className="font-bold text-xl tracking-tight">
                  Job Fit AI
                </h1>
                <p className="text-xs text-blue-100">
                  Your AI-Powered Career Assistant
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 my-12 lg:my-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              AI-Powered Career Analysis
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight max-w-lg">
              {isLogin
                ? "Welcome back to your career journey."
                : "Take the next step toward your dream job."}
            </h2>

            <p className="mt-6 text-blue-100 text-base sm:text-lg leading-7 max-w-md">
              {isLogin
                ? "Sign in to analyze job opportunities, track your skill gaps, and continue preparing for your next career move."
                : "Create your account to discover your job match score, identify missing skills, and get a personalized interview preparation plan."}
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm text-blue-100">
            <span>●</span>
            <span>AI-Powered Insights</span>
            <span>•</span>
            <span>Career Growth</span>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="lg:w-1/2 p-6 sm:p-10 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">

            <div className="mb-8">
              <p className="text-sm font-semibold text-[#F59E0B] mb-2">
                {isLogin ? "WELCOME BACK" : "GET STARTED"}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827]">
                {isLogin
                  ? "Sign in to Job Fit AI"
                  : "Create your account"}
              </h2>

              <p className="mt-2 text-[#64748B]">
                {isLogin
                  ? "Enter your credentials to continue your career preparation."
                  : "Join Job Fit AI and discover how well your skills match your dream job."}
              </p>
            </div>

            {children}

            <div className="mt-7 text-center text-sm text-[#64748B]">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/register")}
                    className="font-semibold text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="font-semibold text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
