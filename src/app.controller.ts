import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './auth/auth.decorator';
import { Web3Service } from 'web3/web3.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly web3Serivice: Web3Service) {}

	@Get()
	async hello() {
		return await this.web3Serivice.getInfo('hello');
	}
}
