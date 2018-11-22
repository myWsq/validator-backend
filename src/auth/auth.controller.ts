import { Controller, Post, Body, NotFoundException, BadRequestException, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { Auth } from './auth.decorator';

export class LoginCto {
	@IsNotEmpty() username: string;

	@IsNotEmpty() password: string;
}

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

	@Post()
	async login(@Body() loginCto: LoginCto) {
		const user = await this.userService.findOneByUsername(loginCto.username);
		if (!user) {
			throw new BadRequestException('User Not Found');
		} else if (!this.userService.validatePassword(loginCto.password, user.password)) {
			throw new BadRequestException('Invalid Password');
		} else {
			return {
				token: this.authService.generateJwtToken(user)
			};
		}
	}

	@Get()
	@Auth()
	async me(@User() user: UserEntity) {
		delete user.password;
		return user;
	}
}
