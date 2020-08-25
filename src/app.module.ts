import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './common/auth/auth.module';
import { GoogleStrategy } from './common/auth/google.strategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-app', {
      useNewUrlParser: true,
    }),
    AccountModule,
    AuthModule,
    GoogleStrategy,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
