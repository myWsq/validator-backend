import { Injectable } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { UserEntity } from 'user/user.entity';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY, JwtPayload, JWT_HEADER, VerifyPayload } from './auth.interface';
import { Request } from 'express';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	/**
     * 生成用户的jwt
     * @param user 用户信息
     */
	generateJwtToken(user: UserEntity) {
		const payload: JwtPayload = {
			id: user.id,
			username: user.username
		};
		return jwt.sign(payload, JWT_SECRET_KEY);
	}

	/**
     * 解析用户的token
     * @param token 用户token
     */
	async verifyJwtToken(token: string) {
		try {
			const payload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
			return await this.userService.findOne(payload);
		} catch (error) {
			return null;
		}
	}

	/** 从请求中获取用户
     * @param req 当前请求
     */
	async validateUser(req: Request) {
		const authString = req.header(JWT_HEADER);
		if (authString) {
			const auth = authString.split(' ');
			const type = auth[0];
			const token = auth[1];
			switch (type) {
				case 'JWT':
					return await this.verifyJwtToken(token);
				default:
					break;
			}
		}
		return null;
	}
}
