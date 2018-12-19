import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	PrimaryColumn,
	OneToMany,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ length: 12, unique: true })
	username: string;

	@Column({ length: 12, default: '' })
	name: string;

	@Column({ length: 128 })
	password: string;


	@UpdateDateColumn() updateDate: Date;
	@CreateDateColumn() createDate: Date;
}
