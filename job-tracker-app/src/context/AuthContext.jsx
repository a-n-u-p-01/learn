import { createContext, useContext, useEffect, useState } from 'react';
import { auth, isFirebaseEnabled } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseEnabled) {
      // No config yet — the Login screen shows a setup gate.
      setLoading(false);
      return undefined;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(
        u
          ? {
              uid: u.uid,
              email: u.email,
              displayName: u.displayName || (u.email ? u.email.split('@')[0] : 'User'),
              photoURL: u.photoURL || null,
            }
          : null
      );
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signup = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    setUser({
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: name || cred.user.email.split('@')[0],
      photoURL: null,
    });
  };

  const logout = () => signOut(auth);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isConfigured: isFirebaseEnabled,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
