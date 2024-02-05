import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const rolesRequired = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!rolesRequired) {
      return true;
    }
    console.log(rolesRequired);

    const { user } = context.switchToHttp().getRequest();

    console.log(user);
    return rolesRequired.some((role) => user.role === role);
  }
}
