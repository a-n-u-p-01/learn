import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { subscribeApplications } from '../services/applications.js';

/**
 * Subscribes to the signed-in user's applications and keeps them in sync
 * in real time via Firestore onSnapshot.
 */
export function useApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setApplications([]);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    const unsub = subscribeApplications(
      user.uid,
      (list) => {
        setApplications(list);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setApplications([]);
        setLoading(false);
      }
    );
    return unsub;
  }, [user]);

  return { applications, loading, error };
}
