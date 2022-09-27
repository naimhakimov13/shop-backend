import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.get('Authorization').split(' ')[1];
    if (token) {
      this.userService.checkToken(token);
      return true;
    } else {
      throw new UnauthorizedException('Please sign in!');
    }
  }
}
