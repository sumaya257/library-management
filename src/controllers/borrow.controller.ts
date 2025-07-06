import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Borrow from '../models/borrow.model';
import Book from '../models/book.model';

export const createBorrow = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookId, quantity, dueDate } = req.body;

    // Step 1: Find the book inside the session
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new Error('Book not found');
    }

    // Step 2: Check if copies are enough
    if (book.copies < quantity) {
      throw new Error('Not enough copies available.');
    }

    // Step 3: Update book fields
    book.copies -= quantity;
    book.available = book.copies > 0;
    await book.save({ session });

    // Step 4: Create borrow entry
    const borrow = new Borrow({ book: bookId, quantity, dueDate });
    await borrow.save({ session });

    // Step 5: Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, borrow });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      { $unwind: '$bookInfo' },
      {
        $project: {
          title: '$bookInfo.title',
          isbn: '$bookInfo.isbn',
          totalQuantity: 1,
        },
      },
    ]);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};
