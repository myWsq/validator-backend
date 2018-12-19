import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async register(@Body() body: CreateUserDto) {
		if (!await this.userService.findOneByUsername(body.username)) {
			const user = await this.userService.createUser(body);
			delete user.password;
			return user;
		}
		throw new BadRequestException(`User [${body.username}] Already Exists`);
	}
}
