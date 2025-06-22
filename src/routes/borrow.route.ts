import express from 'express';
import { borrowBook, borrowSummary } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/borrow', borrowBook);
router.get('/borrow', borrowSummary);

export default router;
