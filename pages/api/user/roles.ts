import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../../src/utils/api';
import { initializeFirebaseAdmin } from '../../../src/utils/api/firebase';
import { createJWTToken } from '../../../src/utils/api/jwt';
import { CookieName } from '../../../src/utils/cookies/enums';
import { Role, UserRoleDoc } from '../../../src/utils/models/DocInterfaces';
import { fromFirestore } from '../../../src/utils/models/ModelUtils';

interface Success {
  status: 'SUCCESS';
  roles: Role[];
}

interface FailedRequest {
  error: 'Missing user_token' | 'Invalid ID token' | 'Server error';
}

type Data = Success | FailedRequest;

/*
 * User will pass their token, verify and retieve roles for user based on token
 * Return a JWT token that can be decoded by middleware to allow access to pages
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.body.user_token) {
    try {
      // Token decoded successfully, fetch the users roles based on their email
      let roles: Role[] = [];
      if (process.env.ENFORCE_ROLES !== 'false') {
        // Roles are enforced, check firebase for roles
        initializeFirebaseAdmin();
        let decode: DecodedIdToken;
        try {
          // Decode user's id token
          decode = await getAuth().verifyIdToken(req.body.user_token, true);
        } catch (error) {
          return res.status(403).json({
            error: 'Invalid ID token',
          });
        }

        const roleSnap = await getFirestore().doc(`roles/${decode.email}`).get();
        if (roleSnap.exists) {
          // If the snap exists, get the data
          const roleDoc = fromFirestore<UserRoleDoc>(roleSnap);
          roles = roleDoc.roles;
        }
      } else {
        // Roles are not enforced, give user all roles
        roles = Object.values(Role);
      }

      // Create the role token
      const roleToken = await createJWTToken({ roles });
      // Set the role token as a cookie for the user
      setCookie(res, {
        name: CookieName.ROLE_TOKEN,
        value: roleToken,
        options: { httpOnly: false, path: '/' },
      });
      return res.status(200).json({
        status: 'SUCCESS',
        roles,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Server error',
      });
    }
  }
  return res.status(400).json({
    error: 'Missing user_token',
  });
}
