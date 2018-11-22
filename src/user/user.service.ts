import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, DeepPartial } from 'typeorm';
import { JwtPayload } from 'auth/auth.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private readonly UserRepository: Repository<UserEntity>) {}

    /**
     * 查询全部用户
     */
	async findAll() {
		return this.UserRepository.find();
	}

	/**
     * 新增一个用户
     * @param data 用户信息
     */
	async createUser(data: DeepPartial<UserEntity>) {
		const user = this.UserRepository.create(data);
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
		await this.UserRepository.insert(user);
		return user;
	}

	/**
     * 通过jwt荷载查找用户
     * @param payload 荷载
     */
	async findOne(payload: JwtPayload) {
		return await this.UserRepository.findOne(payload);
	}

	/**
     * 通过用户名查找用户
     * @param username 用户名
     */
	async findOneByUsername(username: string) {
		return await this.UserRepository.findOne({ username });
	}

	/**
     * 获得某个用户的全部Todo
     * @param user 用户信息
     */
	async getUserTodos(user: UserEntity) {
		const userWithTodo = await this.UserRepository.findOne({
			where: { id: user.id },
			relations: [ 'todos' ]
		});
		return userWithTodo.todos;
	}

	validatePassword(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}
}
