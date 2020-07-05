import {Document} from 'mongoose';

export interface Account extends Document {
  readonly username: string;
  readonly password: string;
}