import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/conection';
import express from 'express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT;

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers});

const app = express();

app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


function authenticateUser(token: string) {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
}




server.listen().then(({ url }) => {
  console.log(`Apollo Server ready at ${url}`);
});


