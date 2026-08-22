import { cookies } from "next/headers"


export async function  POST () {

    // cookie store lo
    const cookieStore = await cookies()

    // Token delete karo — naam se!
     cookieStore.delete("token")

    return Response.json(
        {message: "Logged out succefully"},
        {status: 200}
    )


}