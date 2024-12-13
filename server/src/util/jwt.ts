import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' }); // Token expires in 15 minutes
};

export const verifyToken = (token: string): object | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return typeof decoded === 'object' ? decoded : null;
  } catch (error) {
    return null; // Return null if the token is invalid
  }
};
