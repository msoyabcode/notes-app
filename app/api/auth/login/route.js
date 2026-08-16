import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";


export async function POST(request){
    try{

        const body = await request.json()
        const {email, password} = body
        
        await dbConnect()
        
        const user = await User.findOne({email})
        if(!user){
            return Response.json(
                {message: "User not found"},
                {status: 404}
            )
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return Response.json(
                {message: "Invalid password"},
                {status: 401}
            )
        }

         // Step 5: JWT token 
         const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
         )

         // Step 6: Cookie mein save karo
         const cookieStore = await cookies()
         cookieStore.set("token", token, {
            httpOnly: true
         } )

         // Step 7: Response bhejo
         return Response.json(
            {message: "Login succssful"},
            {status: 200}
         )


    } catch(error){
        console.error("Login error", error.message)
        return Response.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}

// JWT bana
//    ↓
// Response ke through browser ko diya
//    ↓
// Browser ne cookie mein save kiya
//    ↓
// Future request
//    ↓
// Cookie server ko gayi
//    ↓
// Server JWT verify k