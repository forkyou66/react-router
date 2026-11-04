export const env = {
  apiURL: (import.meta.env.VITE_API_URL as string | undefined) ?? '',
  socketURL: (import.meta.env.SOCKET_API_URL as string | undefined) ?? ''
};
