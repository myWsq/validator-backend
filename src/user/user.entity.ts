import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ length: 12, unique: true })
	username: string;

	@Column({ length: 128 })
	password: string;

	@Column({ length: 5000, nullable: true })
	publicKey: string;

	@UpdateDateColumn() updateDate: Date;
	@CreateDateColumn() createDate: Date;
}
