import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ConfirmDto } from './user.dto';
import { AppService } from 'app.service';
import { ResponseCode } from 'app.interface';
import { AuthService } from 'auth/auth.service';
import { Auth } from 'auth/auth.decorator';
import { User } from './user.decorator';
import { UserEntity } from './user.entity';
import { Web3Service } from 'web3/web3.service';
import { LogService } from 'log/log.service';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly appService: AppService,
		private readonly authService: AuthService,
		private readonly web3Service: Web3Service,
		private readonly logService: LogService
	) {}

	@Post()
	async register(@Body() body: CreateUserDto) {
		if (!await this.userService.findOneByUsername(body.username)) {
			const user = await this.userService.createUser(body);
			delete user.password;
			return this.appService.success({ user, token: this.authService.generateJwtToken(user) });
		}
		return this.appService.error('Username Already exists', ResponseCode.USERNAME_EXIST);
	}

	/** 存储用户公钥, 用户私密信息上链 */
	@Post('confirm')
	@Auth()
	async confirm(@Body() body: ConfirmDto, @User() user: UserEntity) {
		/** 要加密上链的信息 */
		const encryptedBody = {
			phoneNumber: body.phoneNumber,
			idCardNumber: body.idCardNumber,
		};

		/** 加密用户信息 */
		const encryptedResult = this.userService.encrypt(encryptedBody, body.publicKey);

		/** 用户信息上链 */
		await this.web3Service.setInfo(user.username, encryptedResult);

		/** 将用户公钥存储至数据库内 */
		await this.userService.addPublicKey(user.id, body.publicKey);

		/** 记入日志 */
		this.logService.insertOneLog(user, 'AUTHENTICATION');

		const _user = await this.userService.findOne(user.id);
		delete _user.password;
		return this.appService.success(_user);
	}
	/** 从链上获取用户加密的信息 */
	@Get('confirm')
	@Auth()
	async getConfirmInfo(@User() user: UserEntity) {
		const info = await this.web3Service.getInfo(user.username);
		/** 记入日志 */
		this.logService.insertOneLog(user, 'GET_INFORMATION');
		return this.appService.success(info);
	}
}
