import { RequestHandler } from 'express';
import Book from '../models/book.model';

const handleError = (res: any, message: string, error: any, statusCode = 400) => {
  return res.status(statusCode).json({ success: false, message, error });
};

export const createBook: RequestHandler = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({ success: true, message: 'Book created successfully', data: book });
  } catch (error) {
    return handleError(res, 'Validation failed', error);
  }
};

export const getAllBooks: RequestHandler = async (req, res) => {
  const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
  const query: any = {};
  if (filter) query.genre = filter;

  try {
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));
    return res.json({ success: true, message: 'Books retrieved successfully', data: books });
  } catch (error) {
    return handleError(res, 'Failed to retrieve books', error, 500);
  }
};

export const getBookById: RequestHandler = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return handleError(res, 'Book not found', { bookId: req.params.bookId }, 404);
    return res.json({ success: true, message: 'Book retrieved successfully', data: book });
  } catch (error) {
    return handleError(res, 'Failed to retrieve book', error, 404);
  }
};

export const updateBook: RequestHandler = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!book) return handleError(res, 'Book not found', { bookId: req.params.bookId }, 404);
    return res.json({ success: true, message: 'Book updated successfully', data: book });
  } catch (error) {
    return handleError(res, 'Failed to update book', error);
  }
};

export const deleteBook: RequestHandler = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return handleError(res, 'Book not found', { bookId: req.params.bookId }, 404);
    return res.json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (error) {
    return handleError(res, 'Failed to delete book', error);
  }
};
