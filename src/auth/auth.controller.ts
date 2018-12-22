import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { Auth } from './auth.decorator';
import { LoginDto } from './auth.dto';
import { AppService } from 'app.service';
import { ResponseCode } from 'app.interface';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly appService: AppService
	) {}

	@Post()
	async login(@Body() loginCto: LoginDto) {
		const user = await this.userService.findOneByUsername(loginCto.username);
		if (!user) {
			return this.appService.error('Username Not Found', ResponseCode.USERNAME_NOT_EXIST);
		} else if (!this.userService.validatePassword(loginCto.password, user.password)) {
			return this.appService.error('Invaild Password', ResponseCode.INVALID_PASSWORD);
		} else {
			return this.appService.success({
				token: this.authService.generateJwtToken(user),
			});
		}
	}

	@Get()
	@Auth()
	async me(@User() user: UserEntity) {
		delete user.password;
		return this.appService.success(user);
	}
}
