import { PUBLIC_BACKEND_PORT, PUBLIC_BACKEND_HOST } from '$env/static/public';

export const API_URL = `http://${PUBLIC_BACKEND_HOST}:${PUBLIC_BACKEND_PORT}/api`;
export const WEBSOCKET_URL = `ws://${PUBLIC_BACKEND_HOST}:${PUBLIC_BACKEND_PORT}/ws`;
