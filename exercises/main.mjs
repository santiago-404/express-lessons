import express from 'express';
import { validateBookSchema, validateGenreSchema } from '../utils/validators.mjs';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', stock: 5 },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', stock: 12 },
    { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', stock: 8 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Fiction', stock: 3 }
];

let lastId = books.length;

app.get('/api/books', (req, res) => {
  const {error, value} = validateGenreSchema(req.query);

  if(error) res.sendStatus(401);

  let filteredBooks = [...books]

  if(value.genre){
    filteredBooks = books.filter(book => book.genre.toLowerCase() === value.genre.toLowerCase());

    return res.send(filteredBooks);
  }

  return res.send(filteredBooks)
})

app.post('/api/books', validateBook, (req, res) => {
  
  const {error, value} = validateBookSchema(req.body);

  if(error) res.status(400).send(error.details)
  
  const newBook = {
    id: lastId + 1,
    title: value.title, 
    author: value.tuthor, 
    genre: value.genre, 
    stock: value.stock
  }

  lastId++;
  
  books.push(newBook);

  res.sendStatus(201);
})

app.put('/api/books/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  const body = req.body;

  if(isNaN(parsedId)) res.status(400).json({msg: "Bad Request"})

  const findBookIndex = books.findIndex(book => book.id === parsedId);

  if(findBookIndex === -1) res.sendStatus(404);

  books[findBookIndex] = {id: parsedId, ...body};

  return res.sendStatus(201);
})

app.patch('/api/books/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  const newStock = parseInt(req.body.newStock);

  if(isNaN(newStock) || newStock < 0) return res.status(400).json({msg: "Bad Request"})

  if(isNaN(parsedId)) return res.status(400).json({msg: "Bad Request"})

  const findBookIndex = books.findIndex(book => book.id === parsedId);

  if(findBookIndex === -1) return res.sendStatus(404);

  books[findBookIndex].stock = newStock === 0 ? "Out of Stock" : newStock ;

  return res.send(books[findBookIndex]);
})

app.delete('/api/books/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);

  if(isNaN(parsedId)) return res.status(400).json({msg: "Bad Request"})

  const findBookIndex = books.findIndex(book => book.id === parsedId);

  if(findBookIndex === -1) return res.sendStatus(404);

  books.splice(findBookIndex, 1);
  return res.sendStatus(204);
})

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
  
})