import * as mongoose from 'mongoose';

export const AccSchema = new mongoose.Schema({
  username: String,
  password: String,
  created_at: { type: Date, default: Date.now }
});