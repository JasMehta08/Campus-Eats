import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  cafeteria: mongoose.Types.ObjectId;
  orderedItems: {
    menuItemId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  status: 'Pending' | 'Accepted' | 'Processing' | 'Prepared' | 'Fulfilled' | 'Cancelled';
  ern: string;
}

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cafeteria: { type: Schema.Types.ObjectId, ref: 'Cafeteria', required: true },
  orderedItems: [{
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    price: Number,
    quantity: Number,
  }],
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Processing', 'Prepared', 'Fulfilled', 'Cancelled'],
    default: 'Pending'
  },
  ern: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);