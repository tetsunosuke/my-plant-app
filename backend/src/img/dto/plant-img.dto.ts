import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class PlantImgDto {
  @IsNotEmpty()
  @IsNumber()
  plantId: number;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  base64Data: string;
}

export class SavePlantRequestDto {
  fileDataArray: PlantImgDto[];
  plantInfo?: any;
}
