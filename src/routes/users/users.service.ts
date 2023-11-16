import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

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
