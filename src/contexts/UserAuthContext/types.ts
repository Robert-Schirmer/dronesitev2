import type { User } from 'firebase/auth';
import { Role } from '../../utils/models/DocInterfaces';

export interface UserAuthState {
  user: User | null;
  roles: Role[];
  googleSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}
