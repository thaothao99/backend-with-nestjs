import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-app', {
      useNewUrlParser: true,
    }),
    AccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
