"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState("")


  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const res = await fetch("/api/auth/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    if(res.ok){
      router.push("/login")
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      {/* Card */}
      <div className="w-full max-w-md md:max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-12">
        {/* Title */}
        <h1
          className="text-3xl font-bold text-white text-center"
        >
          Create Account
        </h1>
        <p className="text-gray-300 text-center text-sm mt-3 mb-8">
          Sign up to start managing your notes
        </p>

        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-200 mb-2 ">
              Full Name
            </label>
            <input
              id="name"
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-200 mb-2">
              Email Address
            </label>
            <input
              id="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-200 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button 
            onClick={handleSubmit}
            className="w-1/2 py-3 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold transition-all duration-200 shadow-lg">
              Sign Up
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

