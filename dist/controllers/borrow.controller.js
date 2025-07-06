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
exports.getBorrowSummary = exports.createBorrow = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
const createBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { bookId, quantity, dueDate } = req.body;
        // Step 1: Find the book inside the session
        const book = yield book_model_1.default.findById(bookId).session(session);
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
        yield book.save({ session });
        // Step 4: Create borrow entry
        const borrow = new borrow_model_1.default({ book: bookId, quantity, dueDate });
        yield borrow.save({ session });
        // Step 5: Commit transaction
        yield session.commitTransaction();
        session.endSession();
        res.status(201).json({ success: true, borrow });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createBorrow = createBorrow;
const getBorrowSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
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
    }
    catch (error) {
        next(error);
    }
});
exports.getBorrowSummary = getBorrowSummary;
