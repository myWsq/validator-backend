import { IsNotEmpty, Length, IsOptional, IsPhoneNumber, IsMobilePhone, Matches } from 'class-validator';

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
const ID_CARD_REGEX = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

export class ConfirmDto {
	@IsNotEmpty()
	@IsMobilePhone('zh-CN')
	phoneNumber: string;

	@IsNotEmpty()
	@Matches(ID_CARD_REGEX)
	idCardNumber: string;

	@IsNotEmpty() publicKey: string;
}
