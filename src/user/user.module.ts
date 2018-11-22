import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { TodoService } from '../todo/todo.service';
import { TodoEntity } from '../todo/todo.entity';

@Module({
	imports: [ TypeOrmModule.forFeature([ UserEntity, TodoEntity ]) ],
	controllers: [ UserController ],
	providers: [ UserService, TodoService ],
	exports: [ UserService ]
})
export class UserModule {}
