import mongoose, { Document, Schema } from 'mongoose';

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true },
  dueDate: { type: Date, required: true },
});

export default mongoose.model<IBorrow>('Borrow', borrowSchema);
