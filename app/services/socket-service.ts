import {io, type Socket} from 'socket.io-client';
import {env} from '~/config/env';

export const createSocket = (): Socket => {
  const options = {autoConnect: false, reconnectionAttempts: 5};
  return env.socketURL ? io(env.socketURL, options) : io(options);
};
