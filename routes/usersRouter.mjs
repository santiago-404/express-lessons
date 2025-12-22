import { Router } from "express";
import { books } from "../books.mjs";
import { users } from "../users.mjs";
import findIdIndex from "../middlewares/findIdIndex.mjs";


const router = Router();
//root url
//'/api/users'

//only send the main details such as id and name
//because thats the only think the users see when they look at thei profile tab

router.get('/:id', findIdIndex(users), (req, res) => {
  let user = {id: req.validatedId, username: users[req.dataIndex].userName}
  return res.send(user);
})

//only fetch the favourites data when they click on the favourites tab
//to make it efficient
router.get('/:id/favourites', findIdIndex(users), (req, res) => {
  return res.send(users[req.dataIndex].favourites);
})

router.post('/:id/favourites', findIdIndex(users), (req, res) => {
  const validatedBookId = books.findIndex(book => book.id === req.body.id);
  if (validatedBookId === -1) return res.sendStatus(404);
  users[req.dataIndex].favourites.push(validatedBookId);
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