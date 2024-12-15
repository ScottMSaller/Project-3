import dotenv from 'dotenv';
dotenv.config();
import connectToMongoDB from './config/conection';
import express, { Application, NextFunction, Request, Response } from 'express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { authMiddleware } from './util/auth';

interface Context {
  user?: { _id: any };
}

async function startServer() {
  const app: Application = express();
  const PORT = 3001;

  // Connect to MongoDB
  connectToMongoDB();

  // Global middlewares
  app.use(cors<cors.CorsRequest>({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Create Apollo Server
  const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      if (process.env.NODE_ENV === 'production') {
        return new Error('Internal server error');
      }
      return error;
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  // Start Apollo Server
  await apolloServer.start();

  // Apply Apollo Server middleware
  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return authMiddleware({ req });
      },
    })
  );

  // Static files and catch-all route
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist'));
  });

  // Default route
  app.get('/', (req: Request, res: Response) => {
    res.send('Express Server is running with Apollo Server!');
  });

  // Express error-handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Express Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.get('/api/quotes', async (_req, res) => {
    try {
        const response = await fetch('https://zenquotes.io/api/quotes');
        const data = await response.json();
        res.json(data); // Forward the data to your frontend
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
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



