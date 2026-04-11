import axios from 'axios';

const backendPort = import.meta.env.VITE_BACKEND_PORT || '5000';
const API_BASE = import.meta.env.DEV
  ? `http://localhost:${backendPort}/api`
  : '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
