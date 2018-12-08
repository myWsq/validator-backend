import {
	Controller,
	Get,
	Post,
	Body,
	Delete,
	Param,
	BadRequestException,
	Put,
	ForbiddenException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { IsNotEmpty, Length, IsNumber } from 'class-validator';
import { Auth } from '../auth/auth.decorator';

class CreateTodoDto {
	@IsNotEmpty()
	@Length(1, 20)
	title: string;
}

class TodoIdDto {
	@IsNotEmpty()
	@IsNumber()
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
			user,
		});
		delete todo.user;
		return todo;
	}

	@Delete(':id')
	@Auth()
	async deleteTodo(@Param() { id }: TodoIdDto, @User() user: UserEntity) {
		const todo = await this.todoService.getOneTodo(id);
		if (!todo) {
			throw new BadRequestException(`Todo [${id}] Not Found`);
		}
		if (todo.user.id !== user.id) {
			throw new ForbiddenException();
		}
		delete todo.user;
		return await this.todoService.deleteTodo(todo);
	}

	@Put(':id')
	@Auth()
	async updateTodo(@Param() { id }: TodoIdDto, @Body() updateTodoDto: UpdateTodoDto, @User() user: UserEntity) {
		let todo = await this.todoService.getOneTodo(id);
		if (!todo) {
			throw new BadRequestException(`Todo [${id}] Not Found`);
		}
		if (todo.user.id !== user.id) {
			throw new ForbiddenException();
		}
		await this.todoService.updateTodo(id, updateTodoDto);
		todo = await this.todoService.getOneTodo(id);
		delete todo.user;
		return todo;
	}
}
