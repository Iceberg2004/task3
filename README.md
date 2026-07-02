# Book REST API (Node.js + Express)

Simple in-memory REST API for managing a list of books. No database required.

## Setup

```bash
npm install
npm start
```

Server runs at: `http://localhost:3000`

## Endpoints

| Method | Endpoint      | Description               | Body (JSON)                          |
|--------|---------------|----------------------------|----------------------------------------|
| GET    | /books        | Get all books              | -                                      |
| GET    | /books/:id    | Get a single book by id    | -                                      |
| POST   | /books        | Create a new book          | `{ "title": "", "author": "", "year": 2020 }` |
| PUT    | /books/:id    | Update an existing book    | `{ "title": "", "author": "", "year": 2020 }` (any subset) |
| DELETE | /books/:id    | Delete a book               | -                                      |

## Testing with Postman

1. Start the server (`npm start`).
2. Open Postman and create requests to `http://localhost:3000/books`.
3. For POST/PUT, set the Body tab to **raw** + **JSON**, e.g.:
```json
   { "title": "Dune", "author": "Frank Herbert", "year": 1965 }
```
4. Try each method:
   - `GET http://localhost:3000/books` — list all books
   - `GET http://localhost:3000/books/1` — get book with id 1
   - `POST http://localhost:3000/books` — add a new book
   - `PUT http://localhost:3000/books/1` — update book with id 1
   - `DELETE http://localhost:3000/books/1` — delete book with id 1

## Notes

- Data is stored in memory (a JS array), so it resets whenever the server restarts.
- `id` is auto-generated on the server; you don't send it when creating a book.
