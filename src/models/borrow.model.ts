import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true }
}, { timestamps: true });

// ✅ Mongoose post middleware example: log after borrowing
borrowSchema.post('save', function (doc) {
  console.log(`📚 Borrow record created for book ID: ${doc.book} with quantity ${doc.quantity}`);
});

const Borrow = mongoose.model('Borrow', borrowSchema);
export default Borrow;
