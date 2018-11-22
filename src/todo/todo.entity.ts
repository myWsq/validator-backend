import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'user/user.entity';

@Entity()
export class TodoEntity {
	@PrimaryGeneratedColumn('uuid') id: string;

	@Column({ length: 20 })
	title: string;

	@ManyToOne((type) => UserEntity, (user) => user.todos)
	user: UserEntity;
}
