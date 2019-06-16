import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false,
    transform: true,
    forbidNonWhitelisted: true, // throw an error instead of strip props
    disableErrorMessages: false,
    whitelist: true, // strip the not defined properties from DTOs
    validationError: {
      target: true,
      value: true,
    },
  }));

  await app.listen(3000);
}
bootstrap();
