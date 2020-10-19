import { Module } from '@nestjs/common';
import { AccountModule } from 'src/modules/account/account.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  imports: [AccountModule],
})
export class AuthModule {}
