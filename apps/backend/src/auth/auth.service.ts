import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // TODO: Integrate Clerk authentication
  // See: https://clerk.com/docs
  
  async validateUser(_token: string): Promise<{ id: string; email: string }> {
    // TODO: Validate JWT token with Clerk
    // For now, return a mock user
    return {
      id: 'mock-user-id',
      email: 'user@example.com',
    };
  }
}
