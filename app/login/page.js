"use client";
import { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

const Login = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) =>{
    setFormData({...formData,
      [e.target.id]: e.target.value
    })
    console.log(formData)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const res = await fetch("/api/auth/login",{
      method: 'POST',
      headers:{
        'Content-Type': "application/json"
      },
      body: JSON.stringify(formData)
    })
    if(res.ok){
    router.push("/dashboard")
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-6 py-8">

      {/* Card */}
      <div className="w-full max-w-md md:max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl ">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-center text-sm mt-3 mb-8">
          Login to continue to your account
        </p>

        {/* Form */}
        <div className="flex flex-col gap-5">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-200 mb-4">Email</label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Forgot */}
          <div className="text-right mt-4">
            <p className="text-sm text-red-400 hover:underline cursor-pointer">
              Forgot password?
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center mb-5">
          <button
          onClick={handleSubmit}
           className="w-1/2 py-3 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold transition-all duration-200 shadow-lg">
            Login
          </button>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Don't have an account?{" "}
          <Link href="/signup" className="text-red-400 hover:underline font-semibold">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;