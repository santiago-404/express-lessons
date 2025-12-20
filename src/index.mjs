import express from 'express';


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())

let mockUsers = [ {id: 1, userName: 'abe', displayName: 'Abe'}, {id: 2, userName: 'ali', displayName: 'Ali'}, {id: 3, userName: 'lily', displayName: 'Lily'}, {id: 4, userName: 'leo', displayName: 'Leo'}, {id: 5, userName: 'luna', displayName: 'Luna'}, {id: 6, userName: 'miming', displayName: 'Miming'} ];

app.get('/api/users/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  
  if(isNaN(parsedId)){
    return res.status(400).send({msg: 'Bad Request.'})
  }

  const userData = mockUsers.find(user => {
    return user.id === parsedId;
  })

  if(!userData){
    return res.status(404).send({msg: 'User does not exist'})
  }

  return res.json(userData);
})


app.get('/api/users', (req, res) => {
  const {filter, value} = req.query;
  
  if(filter && value){
    return res.send(
      mockUsers.filter(user => user[filter].includes(value))
    )
  }
  
  return res.send(mockUsers)
})

app.post('/api/users', (req, res) => {
  const body = req.body;

  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    userName: body.userName,
    displayName: body.displayName
  }

  mockUsers.push(newUser);

  res.status(201).send(mockUsers)
})

app.put('/api/users/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  const body = req.body;

  if(isNaN(parsedId)) return res.status(400).send('Bad Request');

  let findUser = mockUsers.findIndex(user => user.id === parsedId);

  if(findUser === -1){return res.sendStatus(404)}
  console.log(findUser);
  
  mockUsers[findUser] = {id: parsedId,...body}
  res.send(mockUsers)
})


app.patch('/api/users/:id', (req, res) => {
  const parseId = parseInt(req.params.id);
  const body = req.body;

  if(isNaN(parseId)) return res.status(400).send('Bad Request');

  const findUserIndex = mockUsers.findIndex(user => user.id === parseId);

  if(findUserIndex === -1) return res.sendStatus(404);

  mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body}

  return res.send(mockUsers);
})

app.delete('/api/users/:id', (req, res) => {
  const parseId = parseInt(req.params.id);
  const body = req.body;

  if(isNaN(parseId)) return res.status(400).send('Bad Request');

  const findUserIndex = mockUsers.findIndex(user => user.id === parseId);

  if(findUserIndex === -1) return res.sendStatus(404);

  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
  
});