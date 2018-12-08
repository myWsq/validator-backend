import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class LoginDto {
	@IsNotEmpty() username: string;

	@IsNotEmpty() password: string;
}
