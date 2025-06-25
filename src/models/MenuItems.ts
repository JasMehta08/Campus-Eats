import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  subCategory: string;
  isAvailable: boolean;
  cafeteria: mongoose.Types.ObjectId;
}

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  cafeteria: { type: Schema.Types.ObjectId, ref: 'Cafeteria', required: true },
}, { timestamps: true });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);