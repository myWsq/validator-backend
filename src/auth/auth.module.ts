import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthGuard } from './auth.guard';

@Module({
	imports: [ UserModule ],
	providers: [ AuthService, AuthMiddleware, AuthGuard ],
	exports: [ AuthService ],
	controllers: [ AuthController ]
})
export class AuthModule {}
