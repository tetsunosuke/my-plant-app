import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class PlantInfoDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  popularName: string;

  @IsOptional()
  @IsString()
  officialName: string | null;

  @IsOptional()
  @IsString()
  family: string | null;

  @IsOptional()
  @IsNumber()
  shadeTolerance: number | null;

  @IsOptional()
  @IsNumber()
  dryingTolerance: number | null;

  @IsOptional()
  @IsNumber()
  heatTolerance: number | null;

  @IsOptional()
  @IsNumber()
  coldTolerance: number | null;

  @IsOptional()
  @IsNumber()
  price: number | null;

  @IsOptional()
  @IsDate()
  purchaseDate: Date | null;

  @IsOptional()
  @IsString()
  buyer: string | null;

  @IsNotEmpty()
  possessed: boolean;
}
