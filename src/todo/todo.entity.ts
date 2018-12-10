import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	PrimaryColumn,
	ManyToOne,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class TodoEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ length: 20 })
	title: string;

	@ManyToOne((type) => UserEntity, (user) => user.todos, { nullable: false })
	user: UserEntity;

	@UpdateDateColumn() updateDate: Date;
	@CreateDateColumn() createDate: Date;
}
