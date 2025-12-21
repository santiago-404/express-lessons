import { Router } from "express";
import { validateBookSchema, validateGenreSchema } from "../utils/validators.mjs";
import { books} from "../books.mjs";
import findIdIndex from "../middlewares/findIdIndex.mjs";

const router = Router();

let lastId = books[books.length - 1].id;

router.get('/:id', findIdIndex(books), (req, res) => {
  return res.send(books[req.dataIndex]);
})

router.get('/', (req, res) => {
  const {error, value} = validateGenreSchema(req.query);
  if(error) return res.sendStatus(401);
  let filteredBooks = [...books]
  if(value.genre){
    filteredBooks = books.filter(book => book.genre.toLowerCase() === value.genre.toLowerCase());
    return res.send(filteredBooks);
  }
  return res.send(filteredBooks)
})

router.post('/', (req, res) => {
  const {error, value} = validateBookSchema(req.body);
  if(error) return res.status(400).send(error.details)
  let newBook = {
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

router.put('/:id', findIdIndex(books), (req, res) => {
  const body = req.body;
  books[req.dataIndex] = {id: req.validatedId, ...body};
  return res.sendStatus(201);
})

router.patch('/:id', findIdIndex(books), (req, res) => {
  const newStock = parseInt(req.body.newStock);
  if(isNaN(newStock) || newStock < 0) return res.status(400).json({msg: "Bad Request"})
  books[req.dataIndex].stock = newStock === 0 ? "Out of Stock" : newStock ;
  return res.send(books[req.dataIndex]);
})

router.delete('/:id', findIdIndex(books), (req, res) => {
  books.splice(req.dataIndex, 1);
  return res.sendStatus(204);
})

export default router