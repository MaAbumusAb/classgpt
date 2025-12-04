import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction) {
    // TODO: Implement Clerk authentication
    // For now, this is a stub that allows all requests
    
    // Example of how Clerk integration would work:
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    
    // Verify JWT token with Clerk
    // const user = await verifyClerkToken(authHeader);
    // req.user = user;

    next();
  }
}
