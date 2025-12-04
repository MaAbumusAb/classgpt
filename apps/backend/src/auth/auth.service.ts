import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // TODO: Integrate Clerk authentication
  // See: https://clerk.com/docs
  
  async validateUser(token: string): Promise<any> {
    // TODO: Validate JWT token with Clerk
    // For now, return a mock user
    return {
      id: 'mock-user-id',
      email: 'user@example.com',
    };
  }
}
