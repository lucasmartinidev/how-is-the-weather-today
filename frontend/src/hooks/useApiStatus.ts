import { useEffect, useState } from 'react';
import { checkApiHealth } from '../services/weatherApi';

export type ApiStatus = 'checking' | 'online' | 'offline';

export function useApiStatus(): ApiStatus {
  const [status, setStatus] = useState<ApiStatus>('checking');
  useEffect(() => {
    let isActive = true;
    const refreshStatus = async () => {
      const isOnline = await checkApiHealth();
      if (isActive) setStatus(isOnline ? 'online' : 'offline');
    };
    void refreshStatus();
    const interval = setInterval(() => void refreshStatus(), 30_000);
    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, []);
  return status;
}
