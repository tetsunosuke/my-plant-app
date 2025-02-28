import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS を設定
  app.enableCors({
    // origin: 'http://localhost:58937',
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE,PATCH',
  });

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(process.env.PORT ?? 3000); // バックエンドはポート3000でリスン
}
bootstrap();
