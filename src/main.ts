import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //전역 유효성 검증 파이프
  app.useGlobalPipes(new ValidationPipe());
  //cors미들웨어
  app.enableCors();
  //쿠키파서 미들웨어
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
