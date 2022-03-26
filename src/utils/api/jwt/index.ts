import { SignJWT, jwtVerify } from 'jose';
import { TokenPayload } from './types';

export const validJWTToken = async <T extends TokenPayload>(token: any): Promise<T> => {
  const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SIGN));
  return verified.payload as T;
};

export const createJWTToken = async (payload: any, options?: { expires: string }) => {
  const unsignedToken = new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt();
  if (options?.expires) {
    unsignedToken.setExpirationTime(options.expires);
  }
  return await unsignedToken.sign(new TextEncoder().encode(process.env.JWT_SIGN));
};

export const isJWTTokenError = (error: any): false | string => {
  const code = (error as any).code as string | undefined;
  if (code && ['ERR_JWS_INVALID', 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED', 'ERR_JWT_EXPIRED'].includes(code)) {
    return code;
  }
  return false;
};
