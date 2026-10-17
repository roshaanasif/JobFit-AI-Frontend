
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function page({children}) {
  const router=useRouter()
  const [isLogin, setIsLogin] = useState(true);


  return (
    <main className="min-h-full bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

        {/* =========================
            LEFT SIDE - BRANDING
        ========================= */}
        <section className="relative lg:w-1/2 bg-[#1D4ED8] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#F59E0B]/20" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">
                <span className="text-[#1D4ED8] font-bold text-xl">
                  RB
                </span>
              </div>

              <div>
                <h1 className="font-bold text-xl tracking-tight">
                 Resmue builder
                </h1>

                <p className="text-xs text-blue-100">
                  Secure authentication
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 my-12 lg:my-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              Secure & Reliable
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight max-w-lg">
              {isLogin
                ? "Welcome back to your account."
                : "Create your account today."}
            </h2>

            <p className="mt-6 text-blue-100 text-base sm:text-lg leading-7 max-w-md">
              {isLogin
                ? "Sign in to continue managing your account and access all your personalized features."
                : "Join us and start managing your account with a simple, secure and modern experience."}
            </p>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center gap-2 text-sm text-blue-100">
            <span>●</span>
            <span>Secure authentication</span>
            <span>•</span>
            <span>Protected data</span>
          </div>
        </section>

       
        <section className="lg:w-1/2 p-6 sm:p-10 lg:p-16 flex items-center justify-center">

          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#F59E0B] mb-2">
                {isLogin ? "WELCOME BACK" : "GET STARTED"}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827]">
                {isLogin ? "Sign in" : "Create account"}
              </h2>

              <p className="mt-2 text-[#64748B]">
                {isLogin
                  ? "Enter your credentials to access your account."
                  : "Fill in your details to create your new account."}
              </p>
            </div>

           {
            children
           }


            {/* Switch Login/Register */}
            <div className="mt-7 text-center text-sm text-[#64748B]">

              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      router.push("/register");
                    }}
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
                    onClick={() => {
                      setIsLogin(true);
                      router.push("/login");
                    }}
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
