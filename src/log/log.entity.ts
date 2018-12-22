import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'user/user.entity';
import { Operation } from './log.interface';

@Entity()
export class LogEntity {
	@PrimaryGeneratedColumn() id: number;

	@ManyToOne((type) => UserEntity, (user) => user.logs)
	user: UserEntity;

	@Column({ length: 20 })
	operation: Operation;

	@UpdateDateColumn() updateDate: Date;
	@CreateDateColumn() createDate: Date;
}
