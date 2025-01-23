import express from 'express';
import { createServer } from 'http';
import { getBackendConfig, getFrontendConfig } from '../../shared/configs.ts';

import { handler } from '../build/handler.js';

const backendConfig = getBackendConfig();
const frontendConfig = getFrontendConfig;
const port = backendConfig.port;
const app = express();
const server = createServer(app);

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

console.log(`Server listening on http://${frontendConfig}:${port}`);
server.listen(port);
