"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const handleError = (res, message, error, statusCode = 400) => {
    return res.status(statusCode).json({ success: false, message, error });
};
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.create(req.body);
        return res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    }
    catch (error) {
        return handleError(res, 'Validation failed', error);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query = {};
    if (filter)
        query.genre = filter;
    try {
        const books = yield book_model_1.default.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        return res.json({ success: true, message: 'Books retrieved successfully', data: books });
    }
    catch (error) {
        return handleError(res, 'Failed to retrieve books', error, 500);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.findById(req.params.bookId);
        if (!book)
            return handleError(res, 'Book not found', { bookId: req.params.bookId }, 404);
        return res.json({ success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (error) {
        return handleError(res, 'Failed to retrieve book', error, 404);
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (!book)
            return handleError(res, 'Book not found', { bookId: req.params.bookId }, 404);
        return res.json({ success: true, message: 'Book updated successfully', data: book });
    }
    catch (error) {
        return handleError(res, 'Failed to update book', error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.findByIdAndDelete(req.params.bookId);
        if (!book)
            return handleError(res, 'Book not found', { bookId: req.params.bookId }, 404);
        return res.json({ success: true, message: 'Book deleted successfully', data: null });
    }
    catch (error) {
        return handleError(res, 'Failed to delete book', error);
    }
});
exports.deleteBook = deleteBook;
