import { books } from "../books.mjs";

// const findIdIndex = (req, res, next) => {
//   const {id} = req.params;
//   const parsedId = parseInt(id);
//   if(isNaN(parsedId)) return res.status(400).send({msg: "Bad Request"});
//   const findBookIndex = books.findIndex(book => book.id === parsedId);
//   if(findBookIndex === -1) return res.sendStatus(404);

//   req.bookIndex = findBookIndex;
//   req.validatedId = parsedId;
//   next()
// }

const findIdIndex = (resource) => (req, res, next) => {
  const {id} = req.params;
  const parsedId = parseInt(id);
  if(isNaN(parsedId)) return res.status(400).send({msg: "Bad Request"});

  const findIndex = resource.findIndex(data => data.id === parsedId);
  if(findIndex === -1) return res.sendStatus(404);

  req.dataIndex = findIndex;
  req.validatedId = parsedId;
  next()
}

export default findIdIndex;