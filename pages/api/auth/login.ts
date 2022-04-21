import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'utils/api';
import { createJWTToken } from 'utils/api/jwt';
import { CookieName } from 'utils/cookies/enums';

interface Success {
  status: 'SUCCESS';
}

interface Fail {
  error: 'Unauthorized';
}

type Data = Success | Fail;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const suppliedPass = req.body;
  if (suppliedPass === process.env.SITE_PASS) {
    // User can view the site
    const token = await createJWTToken({}, { expires: '24h' });
    setCookie(res, { name: CookieName.SITE_TOKEN, value: token });
    return res.status(200).json({
      status: 'SUCCESS',
    });
  }
  // Prevent brute force attacks
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return res.status(401).json({
    error: 'Unauthorized',
  });
}
