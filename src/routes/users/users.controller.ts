import { Controller, Get, UseGuards, Request, Response, Post, Put, Body, Delete, Query } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getUsers(@Query('ntid') ntid, @Query('role') role, @Response() res) {
    try {
      const users = await this.usersService.getUsers(ntid, role);
      res.send({ data: users, error: null });
    } catch (error) {
      res.send({ data: null, error: error });
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addUser(
    @Body('ntid') ntid,
    @Body('email') email,
    @Body('name') name,
    @Body('role') role,
    @Body('emailAlerts') alerts,
    @Response() res,
  ) {
    try {
      const user = await this.usersService.addUser(ntid, email, name, role, alerts);
      res.send({ data: user, error: null });
    } catch (error) {
      res.send({ data: null, error: error });
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Put()
  async updateUser(@Body('ntid') ntid, @Request() req, @Response() res) {
    try {
      const user = await this.usersService.updateUser(ntid, req);
      res.send({ data: user, error: null });
    } catch (error) {
      res.send({ data: null, error: error });
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Delete()
  async deleteUser(@Query('ntid') ntid, @Response() res) {
    try {
      const user = await this.usersService.deleteUser(ntid);
      res.send({ data: user, error: null });
    } catch (error) {
      res.send({ data: null, error: error });
    }
  }
}
