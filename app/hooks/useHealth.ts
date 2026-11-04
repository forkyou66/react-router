import {useEffect, useState} from 'react';
import {fetchHealth} from '~/services/health-service';
import type {HealthStatus} from '~/types/health';

export const useHealth = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchHealth(controller.signal)
      .then(setHealth)
      .catch((err: unknown) => {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : 'Request failed');
      });
    return () => controller.abort();
  }, []);

  return {health, error, isLoading: health === null && error === null};
};
