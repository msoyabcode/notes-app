import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request) {

    try{

        const body = await request.json()
        const {name, email, password} = body

        await dbConnect()

        const existingUser = await User.findOne({email})
        if(existingUser){
            return Response.json(
                {"message": "Email already registered"},
                {status: 400}
            )
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        return Response.json(
            { message: "User created successfully"},
            {status: 201}
        )

        
    } catch(error){
        console.error("singup error:", error.message)
        return Response.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}
