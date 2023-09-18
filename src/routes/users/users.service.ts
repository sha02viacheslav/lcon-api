import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';
import { sanitize } from '../../utility/sanitizer.utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUsers(ntid?: any, role?: any) {
    let user = null;
    if (ntid) {
      user = await this.userModel.findOne({ ntid: ntid.toLowerCase() }).exec();
    } else if (role) {
      user = await this.userModel.find({ role: role.toLowerCase() }).exec();
    } else {
      user = await this.userModel.find().exec();
    }
    return user;
  }

  async addUser(ntid: string, email: string, name: string, role: string, emailAlerts: boolean) {
    const newUser = new this.userModel(
      await sanitize({
        ntid: ntid.toLowerCase(),
        email,
        name,
        emailAlerts,
        role: role.toLowerCase(),
      }),
    );
    return await newUser.save();
  }

  async updateUser(id: any, req: any) {
    const { ntid, email, name, emailAlerts, role } = req.body;

    return await this.userModel.findOneAndUpdate(
      { ntid: ntid.toLowerCase() },
      await sanitize({ email, name, emailAlerts, role: role.toLowerCase() }),
      { new: true },
    );
  }

  async deleteUser(ntid: string) {
    return await this.userModel.findOneAndDelete({ ntid: ntid.toLowerCase() });
  }

  async formatUser(
    ntid: string,
    email: string,
    name: string,
    title: string,
    roles: Array<string>,
    emailAlerts: boolean,
  ) {
    return {
      ntid: ntid.toLowerCase(),
      email,
      title,
      roles,
      emailAlerts,
      name: name.split(',').reverse().join().replace(',', ' '),
    };
  }
}
