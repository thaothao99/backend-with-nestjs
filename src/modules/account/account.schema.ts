import * as mongoose from 'mongoose';

export const AccSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  phone: String,
  email: String,
});
