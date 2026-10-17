"use client"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../Redux/auth/authThunk";


export default  function register() {

  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


    const handlesubmit=async (e)=>{
   
    e.preventDefault();
    setSuccessMessage("");

  
    const userData={
        name:name,
        email:email,
        password:password
    }


     try {
          const result = await dispatch(
            registerUser(userData)
          ).unwrap();
    
          setSuccessMessage(
            result.message || "registration successfull."
          );
        } catch (error) {
          console.log(error);
        }

         


    }


  return (
    <div className="w-full h-full">
        <form className="space-y-5" onSubmit={handlesubmit}>

                        {/* Name */}
            
         
                        <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-[#111827] mb-2"
                        >
                            Full name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="John Doe"
                            className="w-full h-12 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#111827] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                        />
                        </div>

                        {/* Email */}
                        <div>
                        <label
                            htmlFor="register-email"
                            className="block text-sm font-medium text-[#111827] mb-2"
                        >
                            Email address
                        </label>

                        <input
                            id="register-email"
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full h-12 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#111827] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                        />
                        </div>

                        {/* Password */}
                        <div>
                        <label
                            htmlFor="register-password"
                            className="block text-sm font-medium text-[#111827] mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="register-password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
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
                            {loading ? "creating..." : "Create account"}
                       
                        </button>
        </form>
    </div>

  )

}