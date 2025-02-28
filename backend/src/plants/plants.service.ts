import { Injectable } from '@nestjs/common';
import { Plant } from './plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantInfoDto } from '../plants/dto/plant-info.dto';
import { User } from '../user/user.entity';
import { Equal } from 'typeorm';
import { Img } from '../img/img.entity';
@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Img)
    private imgRepository: Repository<Img>,
  ) {}

  async savePlantInfo(plantInfo: PlantInfoDto, userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    let plantInfoData;
    if (plantInfo.id) {
      plantInfoData = await this.plantRepository.findOne({
        where: { id: plantInfo.id },
      });
      if (!plantInfoData) {
        throw new Error('Plant not found');
      }
    } else plantInfoData = new Plant();

    plantInfoData.plantPopularName = plantInfo.popularName;
    plantInfoData.plantOfficialName = plantInfo.officialName;
    plantInfoData.plantFamily = plantInfo.family;
    plantInfoData.possessed = plantInfo.possessed;
    plantInfoData.featureShadeTolerance = plantInfo.shadeTolerance;
    plantInfoData.featureDryingTolerance = plantInfo.dryingTolerance;
    plantInfoData.featureColdTolerance = plantInfo.coldTolerance;
    plantInfoData.featureHeatTolerance = plantInfo.heatTolerance;
    plantInfoData.price = plantInfo.price;
    plantInfoData.purchaseDate = plantInfo.purchaseDate;
    plantInfoData.buyer = plantInfo.buyer;
    plantInfoData.userId = user;
    plantInfoData.favorite = false;
    return this.plantRepository.save(plantInfoData);
  }

  async getPlantInfoDetails(plantId: number): Promise<any> {
    const plant: Plant = await this.plantRepository.findOne({
      where: { id: plantId },
      relations: ['images', 'userId'],
    });
    if (!plant) {
      throw new Error('Plant not found');
    }

    const query = `
    SELECT plant_popular_name
    FROM plant
    WHERE user_id=$1
    AND plant_family=$2
    AND id!=$3
    `;

    const params = [plant.userId.id, plant.plantFamily, plant.id];
    const sameFamilyPlants: string[] = await this.plantRepository.query(
      query,
      params,
    );
    return { plant: plant, sameFamilyPlants: sameFamilyPlants };
  }

  async getPlantInfoMyPage(userId: number): Promise<any> {
    const plants = await this.plantRepository.find({
      where: { userId: { id: Equal(userId) } },
    });
    const possessedPlant = plants.filter((plant) => plant.possessed === true);
    const totalNumbersOfPlants: number = possessedPlant.length;
    const totalMoney = plants.reduce((sum, plant) => {
      return sum + (plant.price || 0);
    }, 0);
    return {
      totalNumbersOfPlants: totalNumbersOfPlants,
      totalMoney: totalMoney,
    };
  }

  async deletePlantInfo(deletePlantId: number): Promise<any> {
    const targetPlant = await this.plantRepository.findOne({
      where: { id: deletePlantId },
    });

    await this.imgRepository.delete({ plantId: targetPlant });
    await this.plantRepository.delete({ id: deletePlantId });
  }

  async favoritePlant(plantId: number, favoriteBoolean: boolean): Promise<any> {
    const targetPlant = await this.plantRepository.findOne({
      where: { id: plantId },
    });
    targetPlant.favorite = favoriteBoolean;
    const response = await this.plantRepository.save(targetPlant);
    return response;
  }
}
