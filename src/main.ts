import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: "50mb" });
  app.useBodyParser('urlencoded', { limit: "50mb", extended: true })
  await app.listen(3000);
}

bootstrap();
