import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import '../../utils/firebase/app'; // Make sure firebse is initialized
import { UserAuthContext } from './useUserAuth';
import { setCookie } from '../../utils/cookies';
import { CookieName } from '../../utils/cookies/enums';
import type { Role } from '../../utils/models/DocInterfaces';

const auth = getAuth();

export const UserAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        // Fetch the users role token
        const idToken = await user.getIdToken();
        // Send idToken to get roles token for user
        const response = await fetch('/api/user/roles', {
          method: 'POST',
          body: JSON.stringify({ user_token: idToken }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
        const data = await response.json();
        if (response.status !== 200) {
          console.error('Error fetching role token', data);
        } else {
          // On request successful, role token will already be set
          // Get the rols from the data returned and set them for user
          setRoles(data.roles as Role[]);
        }
      } else {
        // User is signed out
        setUser(null);
        setRoles([]);
        // Clear the role token
        setCookie(CookieName.ROLE_TOKEN, '', 0);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  /*
   * Perform sign in using Google's auth system
   */
  const googleSignIn = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      // Allow user to select account when signing in
      prompt: 'select_account',
    });
    await signInWithPopup(auth, provider);
  }, []);

  /*
   * Perform sign out for current user
   */
  const signUserOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, roles, loading, googleSignIn, signOut: signUserOut }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
