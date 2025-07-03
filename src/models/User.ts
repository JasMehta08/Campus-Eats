import mongoose ,{ Schema, Document}from "mongoose";


export interface IUser extends Document{
  googleId: string;
  displayName?: string;
  email?: string;
  photo?: string;
  role: "student" | "cafeteria_manager" | "owner" | "admin";
  cafeteria?: mongoose.Types.ObjectId | null;
}
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  email: String,
  photo: String,
  role: { type: String, enum: ["student", "cafeteria_manager", "owner", "admin"], default: "student" },
  cafeteria: { type: mongoose.Schema.Types.ObjectId, ref: "Cafeteria", default: null },
  
});

export default mongoose.model("User", userSchema);