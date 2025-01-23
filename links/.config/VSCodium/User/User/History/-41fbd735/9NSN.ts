import { env } from '$env/dynamic/public';

export const API_URL = `http://${env.BACKEND_HOST}:${env.BACKEND_PORT}/api`;
export const WEBSOCKET_URL = `ws://${env.BACKEND_HOST}:${env.BACKEND_PORT}/ws`;
