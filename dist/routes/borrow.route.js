"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("../controllers/borrow.controller");
const router = express_1.default.Router();
router.post('/borrow', borrow_controller_1.borrowBook);
router.get('/borrow', borrow_controller_1.borrowSummary);
exports.default = router;
