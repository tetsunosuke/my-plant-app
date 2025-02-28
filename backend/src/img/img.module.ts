import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Img } from './img.entity';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Img])],
  providers: [ImgService],
  controllers: [ImgController],
})
export class ImgModule {}
