import axios from 'axios';

export const createClient = (baseUrl: string, token?: string) => {
  const instance = axios.create({ baseURL: baseUrl });
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    login: (payload: { username: string; password: string }) => instance.post('/auth/login', payload),
    getMe: () => instance.get('/users/me'),
    createQuote: (orgId: string, payload: any) => instance.post(`/organizations/${orgId}/quotes`, payload)
  };
};
