import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    data: {
      username: string;
      email: string;
      password: string;
      role: string;
    },
  ) {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data);
  }

  @Get('users') 
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
