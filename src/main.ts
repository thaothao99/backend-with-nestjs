import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
declare const module: any;
const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
