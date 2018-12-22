import { Injectable } from '@nestjs/common';
import { UserEntity } from 'user/user.entity';
import { Operation } from './log.interface';
import { LogEntity } from './log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogService {
	constructor(@InjectRepository(LogEntity) private readonly LogRepository: Repository<LogEntity>) {}
	async insertOneLog(user: UserEntity, operation: Operation) {
		await this.LogRepository.insert({
			user,
			operation,
		});
	}
}
