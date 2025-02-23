import Agent from '.pnpm/undici-types@6.19.8/node_modules/undici-types/agent'
import buildConnector from '.pnpm/undici-types@6.19.8/node_modules/undici-types/connector';
import Dispatcher from '.pnpm/undici-types@6.19.8/node_modules/undici-types/dispatcher'
import { IncomingHttpHeaders } from '.pnpm/undici-types@6.19.8/node_modules/undici-types/header'

export default ProxyAgent

declare class ProxyAgent extends Dispatcher {
  constructor(options: ProxyAgent.Options | string)

  dispatch(options: Agent.DispatchOptions, handler: Dispatcher.DispatchHandlers): boolean;
  close(): Promise<void>;
}

declare namespace ProxyAgent {
  export interface Options extends Agent.Options {
    uri: string;
    /**
     * @deprecated use opts.token
     */
    auth?: string;
    token?: string;
    headers?: IncomingHttpHeaders;
    requestTls?: buildConnector.BuildOptions;
    proxyTls?: buildConnector.BuildOptions;
    clientFactory?(origin: URL, opts: object): Dispatcher;
  }
}
