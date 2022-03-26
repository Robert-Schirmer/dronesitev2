import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useUserAuth from '../../contexts/UserAuthContext/useUserAuth';
import { Role } from '../models/DocInterfaces';

/*
 * Listens for changes to a user's roles and moves them off
 * A page if their role isnt correct
 */
const usePageRoles = (requiredRole: Role) => {
  const { roles, loading } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!roles.includes(requiredRole) && !loading) {
      router.push('/user/login');
    }
  }, [requiredRole, roles, router, loading]);
};

export default usePageRoles;
