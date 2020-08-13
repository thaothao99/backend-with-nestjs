import { Document } from 'mongoose';

export interface Account extends Document {
  readonly username: string;
  readonly password: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
}
