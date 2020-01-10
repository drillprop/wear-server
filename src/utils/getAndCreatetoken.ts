import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

export const getIdFromToken = (req: Request) => {
  const { token } = req.cookies;
  if (token) {
    const jwtToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (jwtToken) {
      return jwtToken.id;
    }
  }
  return null;
};

export const createUserToken = (user: User) => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '7d'
  });
};
