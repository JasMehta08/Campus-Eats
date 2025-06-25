import mongoose , { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    fullName : string;
    email : string;
    role : 'student'|'cafeteria_owner'|'cafeteria_manager';
    cafeteria : mongoose.Types.ObjectId;
    createdAt : Date;
    updatedAt : Date;
}

const UserSchema : Schema = new Schema({
    fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'cafeteria_owner','cafeteria_manager'], required: true },
  cafeteria: { type: Schema.Types.ObjectId, ref: 'Cafeteria' },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);