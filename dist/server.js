"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('MongoDB connected successfully');
    app_1.default.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
})
    .catch(err => console.error('DB connection failed:', err));
