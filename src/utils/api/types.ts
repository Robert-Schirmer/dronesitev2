import type { NextApiResponse } from 'next';
// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextResponse } from 'next/server';
import type { ServerResponse } from 'http';

/*
 * Combined response types for handling any type of responses
 */
export type BlendResponse = NextApiResponse | NextResponse | ServerResponse;
