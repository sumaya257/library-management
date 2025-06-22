# Library Management API

A RESTful API for managing books and borrowing activities in a library system, built with **Express**, **TypeScript**, and **MongoDB**.

---

## Features

- Create, read, update, and delete books
- Borrow books with quantity and due dates
- Aggregate borrowed books summary
- Input validation and error handling
- Modular code structure for scalability

---

## Tech Stack

- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- dotenv for environment variables

---

## Folder Structure

src/
├── controllers/
│   ├── book.controller.ts
│   └── borrow.controller.ts
├── models/
│   ├── book.model.ts
│   └── borrow.model.ts
├── routes/
│   ├── book.route.ts
│   └── borrow.route.ts
├── app.ts
└── server.ts
.env
tsconfig.json
package.json

---

## Getting Started

### Prerequisites

- Node.js  installed
- MongoDB instance ( MongoDB Atlas)

### Installation

1. Clone the repository

```bash
git clone https://github.com/sumaya257/library-management.git
cd library-management-api
Install dependencies

npm install
Create a .env file at the project root and add your MongoDB connection string and port:

MONGO_URI=your_mongodb_connection_string
PORT=5000
Start the development server

npm run dev
The server should be running at http://localhost:5000

API Endpoints
Books
Method	Endpoint	Description
POST	/api/books	Create a new book
GET	/api/books	Get all books
GET	/api/books/:id	Get a book by ID
PUT	/api/books/:id	Update a book by ID
DELETE	/api/books/:id	Delete a book by ID

Borrow
Method	Endpoint	Description
POST	/api/borrow	Borrow a book
GET	/api/borrow	Get summary of borrowed books

Error Handling
All API responses include a consistent JSON structure with success status, message, and data or error details.

Scripts
npm run dev — Run the server in development mode with hot reload

tsc — Compile TypeScript to JavaScript