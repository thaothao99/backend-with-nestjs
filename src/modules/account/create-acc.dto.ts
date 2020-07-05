import {Document} from 'mongoose';

export interface CreateAccDTO extends Document {
  readonly username: string;
  readonly password: string;
}