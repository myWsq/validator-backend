import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid') id: string;

	@PrimaryColumn({ length: 12 })
	username: string;

	@Column({ length: 12, default: '' })
	name: string;

	@Column({ length: 32 })
	password: string;
}
