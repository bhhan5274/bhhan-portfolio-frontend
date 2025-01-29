import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = process.env.NEXT_PUBLIC_AUTHENTICATION_TOKEN;
  client.defaults.withCredentials = true;
  return client(options);
};
