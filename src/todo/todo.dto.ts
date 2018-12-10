import { IsNotEmpty, Length } from 'class-validator';

export class CreateTodoDto {
	@IsNotEmpty()
	@Length(1, 20)
	title: string;
}

export class UpdateTodoDto extends CreateTodoDto {}
