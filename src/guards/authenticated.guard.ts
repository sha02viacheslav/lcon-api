import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    //console.log('canActivate' + JSON.stringify(request.session));
    return request.session.user ? true : false;
  }
}
