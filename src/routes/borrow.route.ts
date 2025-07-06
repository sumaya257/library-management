import express from 'express';
import { createBorrow, getBorrowSummary } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/', createBorrow);
router.get('/summary', getBorrowSummary);

export default router;
