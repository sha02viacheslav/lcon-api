import { Controller, Get, Request, Response, Query, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('sso')
  async ssoAuthenticate(@Query('code') code, @Request() req, @Response() res) {
    await this.authService.authSSO(code, req, res);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('session')
  async authCheck(@Request() req, @Response() res) {
    await this.authService.authCheck(req, res);
  }
}
