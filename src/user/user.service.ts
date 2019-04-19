import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, DeepPartial } from 'typeorm';
import bcrypt from 'bcrypt';
import NodeRSA from 'node-rsa';
import { Web3Service } from 'web3/web3.service';
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
     * 通过id查找用户
     * @param id
     */
	async findOne(id: number) {
		return await this.UserRepository.findOne(id);
	}

	/**
     * 通过用户名查找用户
     * @param username 用户名
     */
	async findOneByUsername(username: string) {
		return await this.UserRepository.findOne({ username });
	}

	validatePassword(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}

	/**添加公钥 */
	async addPublicKey(id: number, publicKey: string) {
		return await this.UserRepository.update(id, { publicKey });
	}

	/** 使用用户公钥加密信息 */
	encrypt(text: any, publicKey: string) {
		const key = new NodeRSA(publicKey, 'pkcs1-public', {
			environment: 'node',
			encryptionScheme: 'pkcs1',
		});
		return key.encrypt(text, 'base64');
	}
}
