import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.decorator';
import { UserEntity } from './user.entity';
import { TodoService } from '../todo/todo.service';
import { Auth } from '../auth/auth.decorator';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService, private readonly todoService: TodoService) {}

	@Post()
	async register(@Body() body: CreateUserDto) {
		if (!await this.userService.findOneByUsername(body.username)) {
			const user = await this.userService.createUser(body);
			delete user.password;
			return user;
		}
		throw new BadRequestException(`User [${body.username}] Already Exists`);
	}

	@Get('todo')
	@Auth()
	async getTodo(@User() user: UserEntity) {
		return await this.userService.getUserTodos(user);
	}
}
