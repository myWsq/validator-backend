import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		UserModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'sqlite3.db',
			entities: [ __dirname + '/../**/*.entity{.ts,.js}' ],
			synchronize: true
		})
	],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
