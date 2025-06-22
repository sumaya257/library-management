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
exports.borrowSummary = exports.borrowBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const handleError = (res, message, error, statusCode = 400) => {
    return res.status(statusCode).json({ success: false, message, error });
};
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book: bookId, quantity, dueDate } = req.body;
    try {
        const book = yield book_model_1.default.findById(bookId);
        if (!book || book.copies < quantity) {
            return handleError(res, 'Not enough copies available', { bookId, quantity });
        }
        book.copies -= quantity;
        book.updateAvailability();
        yield book.save();
        const borrow = yield borrow_model_1.default.create({ book: bookId, quantity, dueDate });
        return res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
    }
    catch (error) {
        return handleError(res, 'Borrowing failed', error);
    }
});
exports.borrowBook = borrowBook;
const borrowSummary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.default.aggregate([
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
    }
    catch (error) {
        return handleError(res, 'Aggregation failed', error, 500);
    }
});
exports.borrowSummary = borrowSummary;
