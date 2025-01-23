import { getBackendConfig } from '@shared/configs';

const backendConfig = getBackendConfig();

export const API_URL = `http://${backendConfig.host}:${backendConfig.port}/api`;
export const WEBSOCKET_URL = `ws://${backendConfig.host}:${backendConfig.port}/ws`;
