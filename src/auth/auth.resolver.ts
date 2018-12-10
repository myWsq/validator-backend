import { Query, Resolver, ResolveProperty, Args, Parent, Mutation, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { UserService } from 'user/user.service';
import { BadRequestException } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
	constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

	@Mutation()
	async login(@Args('loginDto') loginDto: LoginDto) {
		const user = await this.userService.findOneByUsername(loginDto.username);
		if (!user) {
			throw new BadRequestException('User Not Found');
		}
		if (!this.userService.validatePassword(loginDto.password, user.password)) {
			throw new BadRequestException('Invalid Password');
		}
		return {
			token: this.authService.generateJwtToken(user),
		};
	}
}
