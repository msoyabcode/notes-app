import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Note from "@/models/Note";



export async function DELETE(request, { params }) {
  try {

    // Step 1: URL se ID nikalo
    const { id } = await params;


    // Step 2: Cookie se token nikalo
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

     // Step 4: Token verify karo
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decode.userId;

    await dbConnect();

    // Step 6: Note dhundho aur check karo
    const note = await Note.findById(id);

    // Step 7: Note exist karta hai?
    if(!note){
        return Response.json(
            {message: "note not found"},
            {status: 404}
        )
    }

   // Step 8: Yeh note is user ka hai?
    if (note.userID.toString() !== userId.toString()) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Step 9: Delete karo
    await Note.findByIdAndDelete(id);

    // Step 10: Response bhejo
    return Response.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("delete error:", error.message);
    return Response.json(
      { message: "the id does not delete" },
      { status: 500 },
    );
  }
}

// 1. URL se id
// 2. Cookie se token
// 3. Token verify
// 4. userId nikalo
// 5. DB connect
// 6. Note find karo
// 7. Note exist karta hai?
// 8. User ka note hai?
// 9. Request se title/content lo
// 10. Note update
// 11. Response


export async function PUT(request, {params}) {

  try{
    const {id} = await params
    
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if(!token){
      return Response.json(
        {message: "aunthorized"}
      )
    }
    
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decode.userId
    
    await dbConnect()
    
    const {title, content} = await request.json()

    const updateNote = await Note.findOneAndUpdate({
      _id: id,
      userID: userId
    },{
      title,
      content
    })

    return Response.json(
      {message: "data is updated", updateNote},
      {status: 200}
    )
    
  }catch(error){
    console.error("PUT ERROR:", error.message)
    return Response.json(
      {message: "fail to put data"},
      {status: 500}
    )
  }
}



// get note

export async  function GET (request, {params}){

  try{
    // Step 1: ID lo URL se
    const {id} = await params
    
    // cookie se token nikalo
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if(!token){
      return Response.json(
        {message: "Unauthorized"},
        {status: 401}
      )
    }
    
    // token verify kro
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const userID = decode.userId
    
    // Step 4: DB connect karo
    await dbConnect()
    
    // Step 5: Note dhundho
    const note = await Note.findById(id)
    
    // step 6: note mila ?
    if(!note){
      return Response.json(
        {message: "note not found"},
        {status: 404}
      )
    }
    
    // response bhejo
    
    return Response.json(
      {note},
      {status: 200}
    )
    
    
    
  }catch(error){
    console.error("get error", error.message)
    return Response.json(
      {message: "something went wrong"},
      {status: 500}
    )
  }
  

}