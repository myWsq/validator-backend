import { Controller, Get, Post, Body, Delete, Param, BadRequestException, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { User } from 'user/user.decorator';
import { UserEntity } from 'user/user.entity';
import { IsNotEmpty, Length, IsUUID } from 'class-validator';
import { Auth } from 'auth/auth.decorator';

class CreateTodoDto {
	@IsNotEmpty()
	@Length(1, 20)
	title: string;
}

class TodoIdDto {
	@IsNotEmpty()
	@IsUUID()
	id: string;
}

class UpdateTodoDto extends CreateTodoDto {}

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Get()
	async getAllTodo() {
		const todos = await this.todoService.getAllTodo();
		return todos.map((item) => {
			delete item.user.password;
			return item;
		});
	}

	@Post()
	@Auth()
	async createTodo(@Body() createTodoDto: CreateTodoDto, @User() user: UserEntity) {
		const todo = await this.todoService.createTodo({
			...createTodoDto,
			user
		});
		delete todo.user;
		return todo;
	}

	@Delete(':id')
	@Auth()
	async deleteTodo(@Param() { id }: TodoIdDto) {
		const todo = await this.todoService.getOneTodo(id);
		if (!todo) {
			throw new BadRequestException(`Todo [${id}] Not Found`);
		}
		return await this.todoService.deleteTodo(todo);
	}

	@Put(':id')
	@Auth()
	async updateTodo(@Param() { id }: TodoIdDto, @Body() updateTodoDto: UpdateTodoDto) {
		const todo = await this.todoService.getOneTodo(id);
		if (!todo) {
			throw new BadRequestException(`Todo [${id}] Not Found`);
		}
		return await this.todoService.updateTodo(id, updateTodoDto);
	}
}
