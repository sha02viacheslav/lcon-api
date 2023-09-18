import { Document } from 'mongoose';

export class User extends Document {
  ntid: string;
  email: string;
  name: string;
  role: string;
  emailAlerts: boolean;
}
