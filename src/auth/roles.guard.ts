import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roles || !Array.isArray(user.roles)) {
      throw new UnauthorizedException('No roles attached');
    }

    const hasRole = requiredRoles.some(role => user.roles.includes(role));
    if (!hasRole) {
      throw new UnauthorizedException('You do not have permission');
    }

    return true;
  }
}