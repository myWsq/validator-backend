import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial, Raw } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class TodoService {
	constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {}
	/**
     * 获得全部Todo
     */
	async getAllTodo() {
		return this.todoRepository.find({
			relations: [
				'user',
			],
		});
	}

	async getOneTodo(id: string) {
		return await this.todoRepository.findOne({
			relations: [
				'user',
			],
			where: {
				id,
			},
		});
	}

	/**
     * 新增Todo
     * @param data Todo信息
     */
	async createTodo(data: DeepPartial<TodoEntity>) {
		const todo = this.todoRepository.create(data);
		await this.todoRepository.insert(todo);
		return todo;
	}

	/** 删除一个Todo
     * @param todo 要删除的项
     */
	async deleteTodo(todo: TodoEntity) {
		return await this.todoRepository.remove(todo);
	}

	async updateTodo(id: string, data: DeepPartial<TodoEntity>) {
		return await this.todoRepository.update({ id }, data);
	}
}
