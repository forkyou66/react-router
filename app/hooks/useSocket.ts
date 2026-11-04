import {useEffect, useState} from 'react';
import {createSocket} from '~/services/socket-service';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const socket = createSocket();
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('message', (message: string) => setLastMessage(message));
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return {isConnected, lastMessage};
};
