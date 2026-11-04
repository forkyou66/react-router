import type {HealthStatus} from '~/types/health';

export const loader = () => {
  const body: HealthStatus = {status: 'ok', time: new Date().toISOString()};
  return Response.json(body);
};
