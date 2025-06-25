import mongoose, { Schema, Document } from 'mongoose';

export interface ICafeteria extends Document {
  name: string;
  type: string;
  openingHours: string;
  owners: mongoose.Types.ObjectId[];
  managers: mongoose.Types.ObjectId[];
  menu: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CafeteriaSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    openingHours: { type: String, required: true },
    owners: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    managers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // NEW
    menu: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }], // NEW
  }, { timestamps: true });

export default mongoose.model<ICafeteria>('Cafeteria', CafeteriaSchema);