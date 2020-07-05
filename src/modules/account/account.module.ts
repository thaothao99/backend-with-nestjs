import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { AccSchema } from './account.schema'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccSchema }]),
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {}
