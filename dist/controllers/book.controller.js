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
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBook = exports.getBooks = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.default.find();
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.getBooks = getBooks;
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.findById(req.params.id);
        if (!book) {
            res.status(404);
            throw new Error('Book not found');
        }
        res.json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.getBook = getBook;
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_model_1.default(req.body);
        yield book.save();
        res.status(201).json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield book_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            res.status(404);
            throw new Error('Book not found');
        }
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield book_model_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404);
            throw new Error('Book not found');
        }
        res.json({ message: 'Book deleted' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
