import { IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@Length(5, 12)
	username: string;

	@IsOptional()
	@Length(1, 12)
	name: string;

	@IsNotEmpty()
	@Length(8, 20)
	password: string;
}
