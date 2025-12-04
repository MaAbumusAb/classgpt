import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

// TODO: Implement Clerk authentication guard
// import { ClerkAuthGuard } from './clerk-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  // @UseGuards(ClerkAuthGuard) // TODO: Add when Clerk is integrated
  async getCurrentUser() {
    // TODO: Get user from request context after Clerk integration
    return {
      id: 'mock-user-id',
      email: 'user@example.com',
      name: 'Test User',
    };
  }
}
