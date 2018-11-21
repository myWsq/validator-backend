import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private readonly UserRepository: Repository<User>) {}

	async findAll() {
		return this.UserRepository.find();
	}

	async addUser(data: DeepPartial<User>) {
		const user = this.UserRepository.create(data);
		await this.UserRepository.insert(user);
		return user;
	}
}
