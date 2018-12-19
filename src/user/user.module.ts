import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
		]),
	],
	controllers: [
		UserController,
	],
	providers: [
		UserService,
	],
	exports: [
		UserService,
	],
})
export class UserModule {}
