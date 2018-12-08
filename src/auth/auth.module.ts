import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';

@Module({
	imports: [
		UserModule,
	],
	providers: [
		AuthService,
		AuthMiddleware,
		AuthGuard,
		AuthResolver,
	],
	exports: [
		AuthService,
	],
	controllers: [
		AuthController,
	],
})
export class AuthModule {}
