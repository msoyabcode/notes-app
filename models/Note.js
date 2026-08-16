import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema)

export default Note




// Ye file kyu banayi?
// Ye folder kyu banaya?
// Ye code kya karta hai?
// Agar is code ko hata doon to kya hoga?
// Ye industry mein kyu use hota hai?