import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.interface'
import { CreateAccDTO } from './create-acc.dto'

@Injectable()
export class AccountService {
  constructor (
    @InjectModel('Account') private readonly AccModel: Model<Account>
  ) {}
  async getAllAcc(): Promise<Account[]> {
    const accounts = await this.AccModel.find().exec();
    return accounts;
  }
  async getAccByIds(_id): Promise<Account> {
    const acc = await this.AccModel.findById(_id).exec();
    return acc;
  }
  async addAcc(createAccDTO: CreateAccDTO): Promise<Account>{
    const newAcc = await new this.AccModel(createAccDTO);
    return newAcc.save();
  }
  async delAcc(_id):Promise<any>{
    const deletedAcc = await this.AccModel.findByIdAndRemove(_id).exec();
    return deletedAcc;
  }
  async updateAcc(_id, createAccDTO: CreateAccDTO): Promise<Account>{
    const updatedCustomer = await this.AccModel.findByIdAndUpdate(_id, createAccDTO, { new: true });
    return updatedCustomer;
  }
}
