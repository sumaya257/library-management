import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';

dotenv.config();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
  })
  .catch(err => console.error('DB connection failed:', err));
