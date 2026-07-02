// server.js
// Task 3: REST API to Manage a List of Books using Node.js and Express
// In-memory storage (no database needed)

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // parse JSON request bodies

// ---- In-memory "database" ----
let books = [
  { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
];
let nextId = 4; // simple auto-increment id generator

// ---- Helper ----
function findBookIndex(id) {
  return books.findIndex((b) => b.id === Number(id));
}

// ---- Routes ----

// Root - quick sanity check / API info
app.get('/', (req, res) => {
  res.json({
    message: 'Book REST API is running',
    endpoints: {
      'GET /books': 'Get all books',
      'GET /books/:id': 'Get a single book by id',
      'POST /books': 'Create a new book { title, author, year }',
      'PUT /books/:id': 'Update a book by id',
      'DELETE /books/:id': 'Delete a book by id',
    },
  });
});

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a single book by id
app.get('/books/:id', (req, res) => {
  const index = findBookIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(books[index]);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
    year: year || null,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) an existing book
app.put('/books/:id', (req, res) => {
  const index = findBookIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { title, author, year } = req.body;
  const existing = books[index];

  books[index] = {
    ...existing,
    title: title !== undefined ? title : existing.title,
    author: author !== undefined ? author : existing.author,
    year: year !== undefined ? year : existing.year,
  };

  res.json(books[index]);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const index = findBookIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deleted = books.splice(index, 1);
  res.json({ message: 'Book deleted', book: deleted[0] });
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Book API server running at http://localhost:${PORT}`);
});