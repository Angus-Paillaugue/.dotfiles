import { env } from '$env/dynamic/public';
import { getBackendConfig } from '@shared/configs';

const backendConfig = getBackendConfig();

export const API_URL = `http://${backendConfig.host}:${backendConfig.port}/api`;
export const WEBSOCKET_URL = `ws://${env.PUBLIC_BACKEND_HOST}:${env.PUBLIC_BACKEND_PORT}/ws`;
