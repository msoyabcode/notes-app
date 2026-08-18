
// export async function POST(request) {
//   // Step 1: Cookie se token nikalo
//   // Step 2: Token verify karo
//   // Step 3: userId nikalo
//   // Step 4: DB connect karo
//   // Step 5: Data lo request se
//   // Step 6: Note save karo
//   // Step 7: Response bhejo


import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";


// POST function for note create
export async function POST (request) {
    try{
        
        // Step 1 — Cookie Se Token Nikalo:
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        if(!token){
            return Response.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }
        
        // Step 2 — Token Verify Karo:
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const userID = decode.userId
        
        // DB connect karo
        await dbConnect()
        
        // Data lo
        const {title, content } = await request.json()
        
        // Note save kro
        const note = await Note.create({
            title,
            content,
            userID: userID
        })
        
        // Response behjo
        return Response.json(
            {message: "Note created", note},
            {status: 201}
        )
        
    } catch(error){
        console.error("Note Error", error.message)
        return Response.json(
            {message: "Something went wrong"},
        {status: 500}        )
    }
    }
    


// 1. Cookie se token nikalo
// 2. Token verify karo → userId nikalo
// 3. DB connect karo
// 4. Sirf is userId ke notes dhundho
// 5. Notes return karo


// GET FUNCTION FOR NOTE FETCH = note get krne ke liye
export async function GET (request){
    try{
        const cookiesStore = await cookies()
        const token = cookiesStore.get("token")?.value
        if(!token){
            return Response.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userID = decoded.userId
        
        await dbConnect()
        
        const notes = await Note.find({userID: userID})
        
        return Response.json(
            {notes},
            {status: 200}
        )
    }catch(error){
        console.error("error",error.message)
        return Response.json(
            {message: "something went wrong"},
            {status: 500}
        )
    }


             
}
