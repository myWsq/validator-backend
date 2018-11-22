import { ReflectMetadata } from '@nestjs/common';

export const Auth = (...args: string[]) => ReflectMetadata('auth', args);
