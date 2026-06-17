import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

/*
 * Cloud Firestore data access for job applications.
 * Path:  users/{uid}/applications/{appId}
 */

export function subscribeApplications(uid, callback, onError) {
  const q = query(
    collection(db, 'users', uid, 'applications'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => {
      // eslint-disable-next-line no-console
      console.error('[JobTrack] Firestore subscription error:', err);
      if (onError) onError(err);
    }
  );
}

export async function addApplication(uid, data) {
  await addDoc(collection(db, 'users', uid, 'applications'), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateApplication(uid, id, data) {
  await updateDoc(doc(db, 'users', uid, 'applications', id), data);
}

export async function deleteApplication(uid, id) {
  await deleteDoc(doc(db, 'users', uid, 'applications', id));
}
