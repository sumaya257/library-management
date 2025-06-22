"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const borrow_route_1 = __importDefault(require("./routes/borrow.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('Welcome to the Library Management API');
});
app.use('/api', book_route_1.default);
app.use('/api', borrow_route_1.default);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        error: {
            method: req.method,
            path: req.originalUrl,
        },
    });
});
exports.default = app;
