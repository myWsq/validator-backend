import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly authService: AuthService) {}
	resolve(...args: any[]) {
		return async (req, res, next) => {
			req.user = await this.authService.validateUser(req);
			next();
		};
	}
}
