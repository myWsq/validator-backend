import { Query, Resolver, ResolveProperty, Args, Parent, Mutation, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { Auth } from 'auth/auth.decorator';

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query()
	@Auth()
	async user(@Args('id') id: number) {
		return await this.userService.findOne(id);
	}

	@Mutation()
	async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
		return await this.userService.createUser(createUserDto);
	}
}
