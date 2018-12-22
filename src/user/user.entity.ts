import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { LogEntity } from 'log/log.entity';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ length: 12, unique: true })
	username: string;

	@Column({ length: 128 })
	password: string;

	@Column({ length: 5000, nullable: true })
	publicKey: string;

	@OneToMany((type) => LogEntity, (log) => log.user)
    logs: LogEntity[];

	@UpdateDateColumn() updateDate: Date;
	@CreateDateColumn() createDate: Date;
}
