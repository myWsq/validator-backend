export const JWT_SECRET_KEY = 'simple-startkit';
export const JWT_HEADER = 'Authorization';
export const JWT_HEADER_PREFIX = 'JWT';

export interface JwtPayload {
	id: number;
	username: string;
}

export interface VerifyPayload {
	type: 'JWT' | 'Bearer';
	token: string;
}
