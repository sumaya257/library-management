import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import bookRoutes from './routes/book.route';
import borrowRoutes from './routes/borrow.route';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add this route before 404
app.get('/', (_req: Request, res: Response) => {
  res.send('📚 Welcome to the Library Management API');
});

app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

// 404 Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
