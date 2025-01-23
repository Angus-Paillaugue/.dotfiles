import { BACKEND_PORT, BACKEND_HOST } from '$env/static/public'

export const API_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api`;
export const WEBSOCKET_URL = `ws://${BACKEND_HOST}:${BACKEND_PORT}/ws`;
