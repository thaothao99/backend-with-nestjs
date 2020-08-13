import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
declare const module: any;
// var allowedOrigins = [`http://localhost:3000`];

const options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: options,
    logger: true,
  });
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  Logger.log(`🚀 Server running on http://localhost:${port} `, 'Bootstrap');
}
bootstrap();
