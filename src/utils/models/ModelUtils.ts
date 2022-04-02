import type { DocumentSnapshot as AdminDocumentSnapshot } from 'firebase-admin/firestore';
import { DocumentData, QueryDocumentSnapshot, DocumentSnapshot, getDoc, doc } from 'firebase/firestore/lite';
import type { BaseDocRef } from './DocInterfaces';
import { firestore } from '../firebase/app';

type DocSnap =
  | QueryDocumentSnapshot<DocumentData>
  | DocumentSnapshot<DocumentData>
  | AdminDocumentSnapshot<DocumentData>;

export const fromFirestore = <T extends BaseDocRef>(docSnap: DocSnap): T => {
  // Function is used for both firebase admin and regular fiebase
  // New v9 firebase doesnt align all the way with older firebase admin
  // Specifically firebase-admin .exists is a boolean instead of a function
  if (!docSnap.exists || (typeof docSnap.exists === 'function' && !docSnap.exists())) {
    throw new Error(`Doc does not exist`);
  }
  const data = docSnap.data() as DocumentData;
  data.docRef = docSnap.ref;
  return data as T;
};

export const getDocFromFirestore = async <T extends BaseDocRef>(path: string): Promise<T> => {
  const docSnap = await getDoc(doc(firestore, path));
  return fromFirestore<T>(docSnap);
};
