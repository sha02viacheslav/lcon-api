import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.session.user) {
      return (request.session.user.roles as Array<any>).includes('Admin');
    } else {
      return false;
    }
  }
}
