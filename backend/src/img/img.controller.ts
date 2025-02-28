import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  // Param, Delete
} from '@nestjs/common';
import { ImgService } from './img.service';
import { PlantImgDto } from './dto/plant-img.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('imgs')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post('save-plant-imgs')
  async savePlantInfo(@Body() fileDataArray: PlantImgDto[]): Promise<any> {
    try {
      await this.imgService.savePlantImgs(fileDataArray);

      return {
        message: 'PlantInfo saved successfully',
      };
    } catch (error) {
      console.error('Error saving plant info:', error);
      throw new Error('Error saving plant info');
    }
  }

  @Get('get-plant-img')
  @UseGuards(AuthGuard('jwt'))
  async getPlantImg(@Request() req): Promise<any> {
    try {
      const userId = req.user.sub;
      const getPlantImg = await this.imgService.getPlantImg(userId);

      return {
        message: 'get plantImg  successfully',
        data: getPlantImg,
      };
    } catch (error) {
      console.error('Error get plant img:', error);
      throw new Error('Error get plant img');
    }
  }
}
