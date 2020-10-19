import { Module, Global } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccSchema } from './account.schema';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccSchema }]),
  ],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
