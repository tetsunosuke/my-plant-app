import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @Body() signupDto: { name: string; password: string },
  ): Promise<any> {
    try {
      const savedUserInfo = await this.userService.signUp(
        signupDto.name,
        signupDto.password,
      );
      return {
        message: 'signup successfully',
        data: savedUserInfo,
      };
    } catch (error) {
      console.error('Error signup:', error);
      throw new Error('Error signup');
    }
  }

  @Get('get-user-info')
  @UseGuards(AuthGuard('jwt'))
  async getMyImg(@Request() req): Promise<any> {
    try {
      const userId = req.user.sub;
      const userInfo = await this.userService.getUserInfo(userId);
      return {
        message: 'getUserInfo successfully',
        data: userInfo,
      };
    } catch (error) {
      console.error('Error getUserInfo:', error);
      throw new Error('Error getUserInfo');
    }
  }

  @Post('upload-my-img')
  @UseGuards(AuthGuard('jwt'))
  async upMyImg(
    @Body() myImgData: { base64File: string; fileName: string },
    @Request() req,
  ): Promise<any> {
    try {
      const userId = req.user.sub;
      const savedMyImg = await this.userService.upMyImg(myImgData, userId);
      return {
        message: 'upMyImg successfully',
        data: savedMyImg,
      };
    } catch (error) {
      console.error('Error upMyImg:', error);
      throw new Error('Error upMyImg');
    }
  }
}
