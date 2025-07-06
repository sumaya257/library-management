import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  genre?: string;
  isbn?: string;
  description?: string;
  copies: number;
  available: boolean;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  isbn: String,
  description: String,
  copies: { type: Number, required: true, default: 1 },
  available: { type: Boolean, default: true },
});

export default mongoose.model<IBook>('Book', bookSchema);
