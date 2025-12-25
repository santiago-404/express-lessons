import express from 'express';
import bookRouter from '../routes/booksRouter.mjs';
import userRouter from '../routes/usersRouter.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { users } from '../users.mjs';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'why chicken',
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: 60000 * 60
  }
}))

app.use('/api/books' ,bookRouter)
app.use('/api/user' ,userRouter)

app.post('/api/login', (req, res) => {
  const {body: USER} = req;
  if(req.session.user) return res.send('Logged in');
  if(!USER) return res.sendStatus(400);
  const findUser = users.find(user => user.userName === USER.userName);
  if(!findUser || USER.password !== findUser.password) return res.sendStatus(401);
  req.session.user = findUser;
  console.log(req.session.id);
  return res.send('Logged in');
})

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);  
})