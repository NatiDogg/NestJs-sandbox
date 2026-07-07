import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
     new ValidationPipe({
      whitelist: true, //strips properties that are not defined in our DTO's
      forbidNonWhitelisted: true, // more strict than whitelist it immediately halts the request if extra properties detected
      transform: true,
      disableErrorMessages: false

     })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
