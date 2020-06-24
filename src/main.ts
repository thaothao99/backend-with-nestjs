import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
declare const module: any;
const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log(process.env.PORT)
  Logger.log(`🚀 Server ready at http://localhost:${port}`, 'Bootstrap')

}
bootstrap();
