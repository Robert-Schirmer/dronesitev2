import { CookieSerializeOptions, serialize } from 'cookie';
import type { NextApiResponse } from 'next';
import type { NextResponse } from 'next/server';
import type { ServerResponse } from 'http';
import type { BlendResponse } from './types';

interface Args {
  name: string;
  value: string;
  options?: CookieSerializeOptions;
}

export const setCookie = <T extends BlendResponse>(
  res: T,
  { name, value, options = { httpOnly: true, path: '/' } }: Args,
): T => {
  // The NextResponse class has propertiy 'cookies' for setting cookies
  if ((res as NextResponse).cookies) {
    (res as NextResponse).cookies.set(name, value, options);
  } else {
    // Use default 'setHeader' if not NextResponse class, exists on ServerResponse | NextApiResponse
    (res as ServerResponse | NextApiResponse).setHeader('Set-Cookie', serialize(name, value, options));
  }
  return res;
};
