import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { TodoEntity } from 'todo/todo.entity';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn('uuid') id: string;

	@PrimaryColumn({ length: 12, unique: true })
	username: string;

	@Column({ length: 12, default: '' })
	name: string;

	@Column({ length: 32 })
	password: string;

	@OneToMany((type) => TodoEntity, (todo) => todo.user)
	todos: TodoEntity[];
}
