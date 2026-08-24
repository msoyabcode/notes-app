'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
const router = useRouter()


  // logout ke liye
  const handleLogout = async () =>{
    const res = await fetch("/api/auth/logout",{
      method: "POST"
    })
    const data = await res.json()
    if(data){
      router.push("/login")
    }
  }


  return (
    <nav className=" w-full  bg-gray-800  text-white">

      <div className=" max-w-8xl mx-auto h-17 md:h-20 px-8 flex justify-between items-center ">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide cursor-pointer hover:scale-105 transition">
          📝 NotesApp
        </h1>

        {/* Links */}
        <div className="flex items-center gap-2 md:gap-5 text-md md:text-xl font-medium">

          {/* <Link
            href="/"
            className="hover:text-black hover:bg-white rounded-full px-4 py-2 transition duration-300"
          >
            Home
          </Link> */}

          <Link
            href="/login"
            className="px-4 py-2 rounded-full  hover:bg-white hover:text-black transition duration-300"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-4 py-2 rounded-full hover:text-black  hover:bg-white transition duration-300 "
          >
            Signup
          </Link>
          
          <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full hover:text-black  hover:bg-white transition duration-300"
          >Logout</button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;