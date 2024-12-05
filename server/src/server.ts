import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/conection';
import express from 'express';
const app = express();

connectDB();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));