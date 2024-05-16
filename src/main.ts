import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('The weather API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ["GET", "POST", "OPTIONS"],
    preflightContinue: true
  });

  app.useBodyParser('json', { limit: "50mb" });
  app.useBodyParser('urlencoded', { limit: "50mb", extended: true })
  await app.listen(3001);
}

bootstrap();
