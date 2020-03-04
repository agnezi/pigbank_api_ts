import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';
import { Request, Response } from 'express';


class AuthMiddleware {
  public tokenAuth(req: Request, res: Response, next: Function) {
    const headerToken = req.headers.authorization;

    if (!headerToken) {
      return res.status(401).json({ error: "No token provided" })
    }

    const tokenParts = headerToken.split(" ");

    if (!tokenParts.length) {
      return res.status(401).json({ error: "Token error" })
    }

    const [scheme, token] = tokenParts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: "Token format invalid" })
    }

    jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({ error: "Token invalid" })
      }
      req.body.user_id = decoded.id;
      return next();
    })
  }
}

export default new AuthMiddleware();