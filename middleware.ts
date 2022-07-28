import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createJWTToken, isJWTTokenError, validJWTToken } from './src/utils/api/jwt';
import { CookieName } from './src/utils/cookies/enums';
import { setCookie } from './src/utils/api';
import { RoleToken } from './src/utils/api/jwt/types';
import { Role } from './src/utils/models/DocInterfaces';

export async function middleware(req: NextRequest) {
  /**
   * Middleware for all pages
   */
  let authenticated = false;
  const res = NextResponse.next();
  try {
    if (process.env.PASS_PROTECT_SITE === 'true' && !isUnprotectedPage(req)) {
      // Entire website is password protected, check user has valid token
      const payload = await validJWTToken(req.cookies.get(CookieName.SITE_TOKEN));
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

  if (!authenticated) {
    // Redirect to sign in
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    /**
     * Middleware for admin pages
     */
    let adminAuthenticated = false;

    try {
      if (process.env.ENFORCE_ROLES === 'false') {
        // Not enforcing roles to view page
        adminAuthenticated = true;
      } else if (req.cookies.get(CookieName.ROLE_TOKEN)) {
        // Enforcing roles, get and check role token
        const payload = await validJWTToken<RoleToken>(req.cookies.get(CookieName.ROLE_TOKEN));
        if (payload.roles.includes(Role.ADMIN)) {
          // User has admin role, proceed
          adminAuthenticated = true;
        }
      }
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

    if (!adminAuthenticated) {
      NextResponse.redirect(new URL('/user/login', req.url));
    }
  }

  return res;
}

/*
 * Routes that remain unprotected when entire website is pass protected
 */
const isUnprotectedPage = (req: NextRequest) => {
  const unprotectedPages = ['/login', '/api/auth/login'];
  return (
    unprotectedPages.includes(req.nextUrl.pathname) ||
    req.nextUrl.pathname.startsWith('/fonts') ||
    req.nextUrl.pathname.startsWith('/favicon.ico') ||
    req.nextUrl.pathname.startsWith('/_next')
  );
};
