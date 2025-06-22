import mongoose, { Document, Model, Schema } from 'mongoose';

type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

interface IBookDocument extends IBook, Document {
  updateAvailability(): void;
}

type BookModel = Model<IBookDocument>;

const bookSchema = new Schema<IBookDocument>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true }
}, { timestamps: true });

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

// mongoose pre middleware to auto-update availability before save
bookSchema.pre('save', function (next) {
  this.available = this.copies > 0;
  next();
});

const Book = mongoose.model<IBookDocument, BookModel>('Book', bookSchema);
export default Book;
