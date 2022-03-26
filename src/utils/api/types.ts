import type { NextApiResponse } from 'next';
import type { NextResponse } from 'next/server';
import type { ServerResponse } from 'http';

/*
 * Combined response types for handling any type of responses
 */
export type BlendResponse = NextApiResponse | NextResponse | ServerResponse;
