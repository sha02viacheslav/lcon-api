import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as jwt from 'jsonwebtoken';
import { SsoConfig } from 'src/config/sso-config';
import qs = require('querystring');
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private usersService: UsersService,
  ) {}

  async authSSO(code: string, req: any, res: any) {
    const authHeader = {
      'content-type': 'application/x-www-form-urlencoded',
    };

    try {
      this.httpService
        .post(process.env.SSO_TOKEN_ENDPOINT, qs.stringify(SsoConfig(code)), {
          headers: authHeader,
        } as AxiosRequestConfig)
        .subscribe(
          async (resp) => {
            const userHeader = { Authorization: `Bearer ${resp.data.access_token}` };
            req.session.token = resp.data.id_token;
            req['user'] = jwt.decode(req.session.token);
            req.user.sAMAccountName = req.user.onpremisessamaccountname.toLowerCase();
            this.httpService.get(process.env.GRAPH_ENDPOINT, { headers: userHeader }).subscribe(async (graphResp) => {
              req.user.graph = graphResp.data;
              const user = await this.usersService.formatUser(
                req.user.sAMAccountName,
                req.user.graph.mail,
                req.user.graph.displayName,
                req.user.graph.jobTitle,
                req.user.roles,
                false,
              );
              req.session.user = user;
              res.send({ status: 'authenticated', data: user, error: null });
              req.session.save();
            });
          },
          (error) => {
            console.log(error);
            res.send({ status: 'error', data: null, error: 'authentication error' });
          },
        );
    } catch (error) {
      console.log(error);
      res.send({ status: 'error', data: null, error: 'authentication error' });
    }
  }

  async authCheck(req: any, res: any) {
    if (req.session.token) {
      const decoded: any = jwt.decode(req.session.token);
      if (req.session.user && decoded) {
        req.session.user.roles = decoded.roles;
        res.send({ status: 'authenticated', user: req.session.user });
      } else {
        if (req.session) {
          req.session.destroy();
        }
        res.status(401).send({ status: 'failed', user: null });
      }
    } else {
      if (req.session) {
        res.session.destroy();
      }
      res.status(401).send({ status: 'failed', user: null });
    }
  }
}
