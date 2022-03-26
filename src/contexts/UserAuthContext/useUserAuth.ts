import { createContext, useContext } from 'react';
import { UserAuthState } from './types';

export const UserAuthContext = createContext({} as UserAuthState);
const useUserAuth = () => {
  return useContext(UserAuthContext);
};

export default useUserAuth;
