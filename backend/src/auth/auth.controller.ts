import {
  //   Get,
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: { name: string; password: string },
  ): Promise<any> {
    const user = await this.authService.validateUser(
      loginDto.name,
      loginDto.password,
    );
    if (user) {
      const token = await this.authService.login(user);
      return { message: 'login successful', access_token: token.access_token };
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
