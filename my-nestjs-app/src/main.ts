import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that are not defined in our DTOs
      forbidNonWhitelisted: true, // halts the request if extra properties are detected
      transform: true, // automatically transforms payloads to be typed according to their DTO classes
      disableErrorMessages: false,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();