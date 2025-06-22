import express from 'express';
import bookRoutes from './routes/book.route';
import borrowRoutes from './routes/borrow.route';

const app = express();
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Welcome to the Library Management API');
});

app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);

export default app;
