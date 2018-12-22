import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AppService } from 'app.service';
import { AuthService } from 'auth/auth.service';
import { Web3Module } from 'web3/web3.module';
import { LogModule } from 'log/log.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
		]),
		Web3Module,
		LogModule,
	],
	controllers: [
		UserController,
	],
	providers: [
		UserService,
		AuthService,
		AppService,
	],
	exports: [
		UserService,
	],
})
export class UserModule {}
