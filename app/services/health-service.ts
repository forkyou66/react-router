import type {HealthStatus} from '~/types/health';
import {httpClient} from './http-client';

export const fetchHealth = async (signal?: AbortSignal): Promise<HealthStatus> => {
  const {data} = await httpClient.get<HealthStatus>('/api/health', {signal});
  return data;
};
