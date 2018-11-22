import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		const roles = this.reflector.get('auth', context.getHandler());

		return !roles || !!req.user;
	}
}
