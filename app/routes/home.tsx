import {StatusBadge} from '~/components/status-badge';
import {useHealth} from '~/hooks/useHealth';
import {useSocket} from '~/hooks/useSocket';
import type {Route} from './+types/home';

export const meta: Route.MetaFunction = () => [{title: 'React Router app'}];

const Home = () => {
  const {health, error, isLoading} = useHealth();
  const {isConnected, lastMessage} = useSocket();

  return (
    <main className="mx-auto max-w-xl space-y-6 p-8">
      <h1 className="text-2xl font-semibold">React Router app</h1>
      <section className="space-y-2">
        <h2 className="font-medium">HTTP (Axios)</h2>
        <StatusBadge label={isLoading ? 'Checking...' : (error ?? `OK at ${health?.time}`)} isOk={health !== null} />
      </section>
      <section className="space-y-2">
        <h2 className="font-medium">WebSocket (Socket.io)</h2>
        <StatusBadge label={isConnected ? 'Connected' : 'Disconnected'} isOk={isConnected} />
        {lastMessage && <p className="text-sm">Last message: {lastMessage}</p>}
      </section>
    </main>
  );
};

export default Home;
