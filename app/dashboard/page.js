"use client"

import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";

const Dashboard = () => {

  const router = useRouter()
  const [notes, setNotes] = useState([])

  useEffect (() =>{
    const fetchNOtes = async () =>{
      const res = await fetch("/api/notes")
      const data = await res.json()
      console.log("data",data)
      setNotes(data.notes)
    }
    fetchNOtes()
  },[])


  return (
    <div className="px-6 md:px-10 py-8 bg-gray-50 min-h-screen">

      {/* Top Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
        
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">My Notes</h1>

        {/* Search + Button */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="🔍 Search notes..."
            className="border border-gray-300 rounded-xl px-4 py-2.5 w-full md:w-[280px] outline-none shadow-sm text-base"
          />
          <button onClick={()=>router.push("/create-note")}
          className="bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm md:text-base font-semibold px-4 md:px-6 py-2.5 rounded-xl shadow-md transition-all duration-200 whitespace-nowrap">
            + New Note
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

        
  {notes.map((note) => (
    <div key={note._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[200px] flex flex-col">
      <div className="h-2 bg-red-500"></div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-gray-800">{note.title}</h2>
        <p className="text-sm text-gray-600 mt-2 flex-1">{note.content}</p>
        <div className="flex gap-2 mt-4">
          <button className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition">✏️ Edit</button>
          <button className="border border-red-300 text-red-500 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50 transition">🗑️ Delete</button>
        </div>
      </div>
    </div>
  ))}

        {/* Card 1 */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[200px] flex flex-col">
          <div className="h-2 bg-red-500"></div>
          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-lg font-bold text-gray-800">Meeting Notes</h2>
            <p className="text-sm text-gray-400 mt-1">Today, 10:30 AM</p>
            <p className="text-sm text-gray-600 mt-2 flex-1">Discussed project timeline and assigned tasks to team members...</p>
            <div className="flex gap-2 mt-4">
              <button className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition">✏️ Edit</button>
              <button className="border border-red-300 text-red-500 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50 transition">🗑️ Delete</button>
            </div>
          </div>
        </div>    */}
        {/* Card 2 */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[200px] flex flex-col">
          <div className="h-2 bg-violet-500"></div>
          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-lg font-bold text-gray-800">Study Plan</h2>
            <p className="text-sm text-gray-400 mt-1">Yesterday, 6:00 PM</p>
            <p className="text-sm text-gray-600 mt-2 flex-1">Next.js project phases — UI, Backend, Auth, CRUD...</p>
            <div className="flex gap-2 mt-4">
              <button className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition">✏️ Edit</button>
              <button className="border border-red-300 text-red-500 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50 transition">🗑️ Delete</button>
            </div>
          </div>
        </div> */}
        {/* Card 3 */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[200px] flex flex-col">
          <div className="h-2 bg-green-500"></div>
          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-lg font-bold text-gray-800">Shopping List</h2>
            <p className="text-sm text-gray-400 mt-1">2 days ago</p>
            <p className="text-sm text-gray-600 mt-2 flex-1">Milk, Bread, Eggs and some vegetables from market...</p>
            <div className="flex gap-2 mt-4">
              <button className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition">✏️ Edit</button>
              <button className="border border-red-300 text-red-500 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50 transition">🗑️ Delete</button>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default Dashboard;