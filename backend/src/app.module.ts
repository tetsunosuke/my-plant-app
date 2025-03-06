import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Plant } from './plants/plant.entity';
import { Img } from './img/img.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PlantsController } from './plants/plants.controller';
import { ImgController } from './img/img.controller';
import { PlantsService } from './plants/plants.service';
import { ImgService } from './img/img.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cv4s4kofnakc73bsj0s0-a',
      port: 5432,
      username: 'postgres',
      password: 'cwn05diU16ECH5y55JXPkpuYNRA51vel',
      database: 'plantapp_fk3a',
      entities: [User, Plant, Img], // 必要なエンティティを追加
      synchronize: true, // 開発中はtrue、プロダクションではfalseにすることをお勧めします
    }),
    TypeOrmModule.forFeature([User, Plant, Img]),
    JwtModule.register({
      secret: 'secret1111',
      signOptions: { expiresIn: '60m' },
    }),
    AuthModule, // エンティティの設定
  ],
  controllers: [
    UserController,
    PlantsController,
    ImgController,
    AuthController,
  ],
  providers: [UserService, PlantsService, ImgService, AuthService, JwtStrategy],
})
export class AppModule {}
