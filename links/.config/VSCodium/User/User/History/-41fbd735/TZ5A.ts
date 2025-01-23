import { BACKEND_PORT } from '$env/dynamic/public';

export const API_URL = `http://localhost:${BACKEND_PORT}/api`;
export const WEBSOCKET_URL = `ws://localhost:${BACKEND_PORT}/ws`;
