import type { JWTPayload } from 'jose';
import type { Role } from '../../models/DocInterfaces';

export interface TokenPayload extends JWTPayload {
  exp: number; // Exp should always be defined
}

export interface RoleToken extends TokenPayload {
  roles: Role[];
}
