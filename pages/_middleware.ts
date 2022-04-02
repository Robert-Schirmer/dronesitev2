import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from '../src/utils/api';
import { createJWTToken, isJWTTokenError, validJWTToken } from '../src/utils/api/jwt/index';
import { CookieName } from '../src/utils/cookies/enums';

/**
 * Middleware for entire website
 */
export async function middleware(req: NextRequest) {
  let authenticated = false;
  const res = NextResponse.next();
  try {
    if (process.env.PASS_PROTECT_SITE === 'true' && !isUnprotectedPage(req)) {
      // Entire website is password protected, check user has valid token
      const payload = await validJWTToken(req.cookies[CookieName.SITE_TOKEN]);
      // All dates work in unix time
      const refreshCeil = new Date();
      refreshCeil.setHours(refreshCeil.getHours() + 12);
      if (payload.exp * 1000 < refreshCeil.getTime()) {
        // Payload.exp is in seconds to * 1000 for miliseconds which is returned from getTime()
        // Token is valid but will expire below refresh ceiling, set a new one
        const newToken = await createJWTToken({}, { expires: '24h' });
        setCookie(res, { name: CookieName.SITE_TOKEN, value: newToken });
      }
    }
    authenticated = true;
  } catch (error) {
    const jwtTokenError = isJWTTokenError(error);
    if (jwtTokenError) {
      // Caught JWT error
      console.log(`JWT Token error: ${jwtTokenError}`);
    } else {
      // Unknown error
      console.error(error);
    }
  }

  if (authenticated) {
    return res;
  }
  // Redirect to sign in
  return NextResponse.redirect(new URL(`${req.nextUrl.origin}/login`));
}

/*
 * Routes that remain unprotected when entire website is pass protected
 */
const isUnprotectedPage = (req: NextRequest) => {
  const unprotectedPages = ['/login', '/api/auth/login'];
  return (
    unprotectedPages.includes(req.nextUrl.pathname) ||
    req.nextUrl.pathname.startsWith('/fonts') ||
    req.nextUrl.pathname.startsWith('/favicon.ico')
  );
};
