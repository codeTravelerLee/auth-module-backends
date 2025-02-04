import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //전역 유효성 검증 파이프
  app.useGlobalPipes(new ValidationPipe());
  //cors미들웨어
  app.enableCors();
  //쿠키파서 미들웨어
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
  //passport와 session사용을 위한 설정
  app.use(
    session({
      secret: 'very-important-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

bootstrap();
