import { verifyToken } from '../util/jwt';
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).send({ message: 'Invalid or expired token' });
  }

  // Attach the user information to the request object
  (req as any).user = decoded;
  next();
};



