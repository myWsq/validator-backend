import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { IsNotEmpty, Max, Min, Length, MaxLength, IsEmpty, IsOptional } from 'class-validator';

class CreateUserDto {
	@IsNotEmpty()
	@Length(5, 12)
	username: string;

	@IsOptional()
	@Length(1, 12)
	name: string;

	@IsNotEmpty()
	@Length(8, 20)
	password: string;
}

@Controller('/api/user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get()
	async hello() {
		return await this.userService.findAll();
	}

	@Post()
	async register(@Body() body: CreateUserDto) {
		return await this.userService.addUser(body);
	}
}
