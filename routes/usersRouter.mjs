import { Router } from "express";
import { users } from "../users.mjs";
import findIdIndex from "../middlewares/findIdIndex.mjs";


const router = Router();
//root url
//'/api/users'

//only send the main details such as id and name
//because thats the only think the users see when they look at thei profile tab
//only fetch the favourites data when they click on the favourites tab
//to make it efficient
router.get('/:id', findIdIndex(users), (req, res) => {
  let user = {id: req.validatedId, username: users[req.dataIndex].userName}
  return res.send(user);
})

router.get('/:id/favourites', findIdIndex(users), (req, res) => {
  return res.send(users[req.dataIndex].favourites);
})

export default router;