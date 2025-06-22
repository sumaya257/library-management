import { RequestHandler } from 'express';
import Book from '../models/book.model';
import Borrow from '../models/borrow.model';

const handleError = (res: any, message: string, error: any, statusCode = 400) => {
  return res.status(statusCode).json({ success: false, message, error });
};

export const borrowBook: RequestHandler = async (req, res) => {
  const { book: bookId, quantity, dueDate } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book || book.copies < quantity) {
      return handleError(res, 'Not enough copies available', { bookId, quantity });
    }

    book.copies -= quantity;
    book.updateAvailability();
    await book.save();

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
    return res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
  } catch (error) {
    return handleError(res, 'Borrowing failed', error);
  }
};

export const borrowSummary: RequestHandler = async (_req, res) => {
  try {
    const data = await Borrow.aggregate([
      { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo'
        }
      },
      { $unwind: '$bookInfo' },
      {
        $project: {
          book: { title: '$bookInfo.title', isbn: '$bookInfo.isbn' },
          totalQuantity: 1
        }
      }
    ]);
    return res.json({ success: true, message: 'Borrowed books summary retrieved successfully', data });
  } catch (error) {
    return handleError(res, 'Aggregation failed', error, 500);
  }
};
