import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.interface';
import { CreateAccDTO } from './create-acc.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account') private readonly AccModel: Model<Account>,
  ) {}
  async getAllAcc(): Promise<Account[]> {
    const accounts = await this.AccModel.find().exec();
    return accounts;
  }
  async getAccByIds(_id: string): Promise<Account> {
    const acc = await this.AccModel.findById(_id).exec();
    return acc;
  }
  async addAcc(createAccDTO: CreateAccDTO): Promise<Account> {
    const existedUsername = await this.AccModel.findOne({
      username: createAccDTO.username,
    }).exec();
    if (existedUsername)
      throw new HttpException(
        'Username has been taken!',
        HttpStatus.BAD_REQUEST,
      );
    const existedEmail = await this.AccModel.findOne({
      email: createAccDTO.email,
    }).exec();
    if (existedEmail)
      throw new HttpException('Email has been taken!', HttpStatus.BAD_REQUEST);
    const newAcc = new this.AccModel(createAccDTO);
    return newAcc.save();
  }
  async delAcc(_id: string): Promise<any> {
    const deletedAcc = await this.AccModel.findByIdAndRemove(_id).exec();
    return deletedAcc;
  }
  async updateAcc(_id: string, createAccDTO: CreateAccDTO): Promise<Account> {
    const updatedAccount = await this.AccModel.findByIdAndUpdate(
      _id,
      createAccDTO,
      { new: true },
    );
    return updatedAccount;
  }
}
