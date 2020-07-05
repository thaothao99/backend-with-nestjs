import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Account } from './acc.interface'
import { CreateAccDTO } from './create-acc.dto'

@Injectable()
export class AccService {
  constructor(
    @Inject('CAT_MODEL')
    private accModel: Model<Account>,
  ) {}

  async create(createAccDto: CreateAccDTO): Promise<Account> {
    const createdAcc = new this.accModel(createAccDto);
    return createdAcc.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accModel.find().exec();
  }
}