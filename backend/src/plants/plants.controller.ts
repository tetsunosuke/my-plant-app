import { PlantsService } from './plants.service';
import { PlantInfoDto } from './dto/plant-info.dto';
import { Plant } from './plant.entity';
import {
  Controller,
  Get,
  Delete,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantService: PlantsService) {}

  @Post('save-plant-info')
  @UseGuards(AuthGuard('jwt'))
  async savePlantInfo(
    @Body() plantInfo: PlantInfoDto,
    @Request() req,
  ): Promise<any> {
    try {
      const userId = req.user.sub;
      const savedPlantInfo = await this.plantService.savePlantInfo(
        plantInfo,
        userId,
      );
      return {
        message: 'PlantInfo saved successfully',
        data: savedPlantInfo,
      };
    } catch (error) {
      console.error('Error saving plant info:', error);
      throw new Error('Error saving plant info');
    }
  }

  @Get('get-plant-info-details')
  async getPlantInfoDetails(
    @Query('plantId') plantId: number,
  ): Promise<{ plant: Plant; sameFamilyPlants: string[] }> {
    try {
      const plantDetails = await this.plantService.getPlantInfoDetails(plantId);
      return plantDetails;
    } catch (error) {
      console.error('Error get plant details:', error);
      throw new Error('Error get plant details');
    }
  }

  @Get('get-plant-info-my-page')
  @UseGuards(AuthGuard('jwt'))
  async getPlantInfoMyPage(
    @Request() req,
  ): Promise<{ totalNumbersOfPlants: number; totalMoney: number }> {
    try {
      const userId = req.user.sub;
      const gettedPlantInfoMyPage =
        await this.plantService.getPlantInfoMyPage(userId);
      return gettedPlantInfoMyPage;
    } catch (error) {
      console.error('Error get plant info:', error);
      throw new Error('Error get plant info');
    }
  }

  @Delete('delete-plant-info')
  async deletePlantInfo(
    @Query('deletePlantId') deletePlantId: number,
  ): Promise<{ totalNumbersOfPlants: number; totalMoney: number }> {
    try {
      await this.plantService.deletePlantInfo(deletePlantId);
      return;
    } catch (error) {
      console.error('Error delete plant info:', error);
      throw new Error('Error delete plant info');
    }
  }

  @Patch('favorite-plant')
  async favoritePlant(
    @Query('plantId') plantId: number,
    @Body() favorite: { favorite: boolean },
  ): Promise<any> {
    const favoriteBoolean = favorite.favorite;
    try {
      const response = await this.plantService.favoritePlant(
        plantId,
        favoriteBoolean,
      );
      return response;
    } catch (error) {
      console.error('Error favorite plant info:', error);
      throw new Error('Error favorite plant info');
    }
  }
}
