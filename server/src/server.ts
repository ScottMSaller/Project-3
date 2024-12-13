import dotenv from 'dotenv';
dotenv.config();
import connectToMongoDB from './config/conection';
import express, { Application, NextFunction, Request, Response } from 'express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
// import jwt from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';
// import { authMiddleware } from './util/auth';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';
import { authenticate } from './util/auth';


async function startServer() {
  const app: Application = express();
  const PORT = 3001;

  // Connect to MongoDB
  connectToMongoDB();

  // Create Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      if (process.env.NODE_ENV === 'production') {
        return new Error('Internal server error');
      }
      return error;

    },
    plugins: [
      ApolloServerPluginLandingPageLocalDefault(),
    ],
  });

  // Start Apollo Server
  await apolloServer.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(apolloServer)
  );

  //Authentication middleware
  app.use(authenticate);
  
  //Express middleware to capture and log any errors that occur in the API
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Express Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
  app.use(express.static(path.join(__dirname, '../../client/dist')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist'));
  });

  // Default route
  app.get('/', (req: Request, res: Response) => {
    res.send('Express Server is running with Apollo Server!');
  });

  // Start Express server
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});



