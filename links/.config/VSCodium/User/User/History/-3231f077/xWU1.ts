import { BackendConfig } from './types';
import { backendConfig } from './backend.config';

export const getBackendConfig = (): BackendConfig => {
  return backendConfig;
}
