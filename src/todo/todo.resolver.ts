import { Resolver, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { CreateTodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { Auth } from 'auth/auth.decorator';

@Resolver('Todo')
export class TodoResolver {
    constructor(private readonly todoService: TodoService) {}
	@Mutation()
	@Auth()
	async createTodo(@Args('createTodoDto') createTodoDto: CreateTodoDto, @Context() ctx) {
		return await this.todoService.createTodo({
			...createTodoDto,
			user: ctx.user,
		});
	}
}
