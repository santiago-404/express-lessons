import { Router } from "express";
import { books } from "../books.mjs";
import { users } from "../users.mjs";
import findIdIndex from "../middlewares/findIdIndex.mjs";


const router = Router();
//root url
//'/api/users'

//only send the main details such as id and name
//because thats the only think the users see when they look at thei profile tab

router.get('/', (req, res) => {
  if(!req.session.user) return res.sendStatus(401);
  return res.send(req.session.user);
})

//only fetch the favourites data when they click on the favourites tab
//to make it efficient
router.get('/favourites', (req, res) => {
  if(!req.session.user) return res.sendStatus(401);
  return res.send(req.session.user.favourites);
})

router.post('/:id/favourites', findIdIndex(users), (req, res) => {
  const book = books.find(book => book.id === req.body.id);
  if (!book) return res.sendStatus(404);
  users[req.dataIndex].favourites.push(book.id);
  return res.send(users[req.dataIndex].favourites);
})

router.delete('/:id/favourites', findIdIndex(users), (req, res) => {
  const userIndex = req.dataIndex;
  const bookIndexInFavourites = users[userIndex].favourites.findIndex(id => id === req.body.id);
  if (bookIndexInFavourites === -1) return res.sendStatus(404);
  users[req.dataIndex].favourites.splice(bookIndexInFavourites ,1);
  return res.send(users[req.dataIndex]);
})

export default router;