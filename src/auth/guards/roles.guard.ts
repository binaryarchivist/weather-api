import { Injectable, SetMetadata, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class RolesPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
      return false;
    }

    if (permissions && permissions.length > 0) {
      const hasPermission = () => permissions.some((permission) => user.permissions?.includes(permission));
      return user.permissions && hasPermission();
    }

    return true;
  }
}

export const Roles = (roles: string[]) => SetMetadata('roles', roles);
export const Permissions = (permissions: string[]) => SetMetadata('permissions', permissions);
