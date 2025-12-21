import express from 'express';
import bookRouter from '../routes/books.mjs';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/books' ,bookRouter)

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);  
})