import type { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore/lite';

/**
 * All docs should extend this base doc ref
 * When turning a fetched doc into data use the fromFirestore function
 */
export interface BaseDocRef {
  docRef: DocumentReference<DocumentData>;
}

export enum Role {
  ADMIN = 'admin',
}

/**
 * /roles/{doc}
 */
export interface UserRoleDoc extends BaseDocRef {
  roles: Role[];
}

/**
 * /images/{doc}
 */
export interface ImageDoc extends BaseDocRef {
  src: string;
  headerImage: boolean;
  meta: PhotoMeta[];
  posted: Date | Timestamp;
}

export interface PhotoMeta {
  label: string;
  value: string;
}
