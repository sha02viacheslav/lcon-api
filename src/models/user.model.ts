import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    ntid: String,
    email: String,
    name: String,
    role: String,
    emailAlerts: Boolean,
  },
  { collection: 'escalationsUsers' },
);
