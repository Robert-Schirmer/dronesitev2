import { NextRequest, NextResponse } from 'next/server';
import { isJWTTokenError, validJWTToken } from 'utils/api/jwt';
import { RoleToken } from 'utils/api/jwt/types';
import { CookieName } from 'utils/cookies/enums';
import { Role } from 'utils/models/DocInterfaces';

/*
 * Middleware for Admin endpoint
 */
export async function middleware(req: NextRequest) {
  let authenticated = false;

  try {
    if (process.env.ENFORCE_ROLES === 'false') {
      // Not enforcing roles to view page
      authenticated = true;
    } else if (req.cookies[CookieName.ROLE_TOKEN]) {
      // Enforcing roles, get and check role token
      const payload = await validJWTToken<RoleToken>(req.cookies[CookieName.ROLE_TOKEN]);
      if (payload.roles.includes(Role.ADMIN)) {
        // User has admin role, proceed
        authenticated = true;
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

  if (authenticated) {
    return NextResponse.next();
  }
  // Redirect to sign in
  return NextResponse.redirect(new URL(`${req.nextUrl.origin}/user/login`));
}
