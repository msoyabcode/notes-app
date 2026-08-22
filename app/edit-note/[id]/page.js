"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditNote = () => {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: ""
  })

  useEffect(()=>{
    const fetchNote = async () =>{
        const res = await fetch(`/api/notes/${id}`)
            const data = await res.json()
            setFormData({
                title: data.note.title,
                content: data.note.content
            })
    }
    fetchNote()
  },[])

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async () =>{
    console.log("submitting", formData)
    const res = await fetch(`/api/notes/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log("response", data)
    if(res.ok){
        router.push("/dashboard")
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-6 py-8">
      <div className="w-full max-w-md md:max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Edit Note
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-6">

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-gray-200 text-sm font-medium mb-2">
              Title
            </label>
            <input
            value={formData.title}
            onChange={handleChange}
              type="text"
              id="title"
              placeholder="Note title..."
              className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label htmlFor="content" className="block text-gray-200 text-sm font-medium mb-2">
              Content
            </label>
            <textarea
            value={formData.content}
            onChange={handleChange}
              id="content"
              rows={6}
              placeholder="Write your note here..."
              className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
            onClick={handleSubmit} className="w-1/2 py-3 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold transition-all duration-200 shadow-lg">
              Save Changes
            </button>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-1/2 py-3 rounded-lg border border-gray-500 text-gray-300 font-semibold hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              ← Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditNote;