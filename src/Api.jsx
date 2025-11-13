import axios from 'axios';

const api = axios.create({
  baseURL: 'https://freelancer-server-omega.vercel.app',
});

export default api;
