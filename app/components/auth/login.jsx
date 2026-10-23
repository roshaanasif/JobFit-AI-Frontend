"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { loginUser } from "../../Redux/auth/authThunk";

export default function Login() {

  
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.trim();
    const password = formData.get("password");

    try {
      const result = await dispatch(
        loginUser({
          email,
          password,
        })
      ).unwrap();

      setSuccessMessage(
        result.message || "Signed in successfully."
      );

      router.replace('/dashboard')

    } catch (error) {
      console.log(error);
    }
  };


  return (
    
    <div className="w-full h-full">
           <form className="space-y-4" onSubmit={handleSubmit}>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#111827] mb-2"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="w-full h-12 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#111827] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-[#111827]"
                    >
                      Password
                    </label>

                    {/* <button
                      type="button"
                      className="text-sm font-medium text-[#1D4ED8] hover:text-[#1e40af]"
                    >
                      Forgot password?
                    </button> */}
                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="w-full h-12 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#111827] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}

                {successMessage && (
                  <p className="text-sm text-green-700" role="status">
                    {successMessage}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-[#1D4ED8] text-white font-semibold transition-all hover:bg-[#1e40af] hover:shadow-lg hover:shadow-[#1D4ED8]/20 active:scale-[0.98]"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>
    </div>
  )

}