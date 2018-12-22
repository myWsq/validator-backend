import { Injectable } from '@nestjs/common';
import { ResponseCode } from 'app.interface';

@Injectable()
export class AppService {
	success(data: any) {
		return {
			code: ResponseCode.SUCCESS,
			data,
		};
	}
	error(message: string, code: ResponseCode) {
		return {
			code,
			message,
		};
	}
}
