import express from 'express';
import bookRouter from '../routes/booksRouter.mjs';
import userRouter from '../routes/usersRouter.mjs';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/books' ,bookRouter)
app.use('/api/users' ,userRouter)

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);  
})