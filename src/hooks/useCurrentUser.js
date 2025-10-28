import { useEffect, useState } from 'react';
import { axiosConfig } from '../services/axiosConfig';

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axiosConfig.get('/auth/me');
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loadingUser };
}
