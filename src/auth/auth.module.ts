import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthGuard } from './auth.guard';
import { AppService } from 'app.service';

@Module({
	imports: [
		UserModule,
	],
	providers: [
		AuthService,
		AuthMiddleware,
        AuthGuard,
		AppService,
	],
	exports: [
		AuthService,
	],
	controllers: [
		AuthController,
	],
})
export class AuthModule {}
