import Agent from '.pnpm/undici-types@6.20.0/node_modules/undici-types/agent'
import Dispatcher from '.pnpm/undici-types@6.20.0/node_modules/undici-types/dispatcher'

export default EnvHttpProxyAgent

declare class EnvHttpProxyAgent extends Dispatcher {
  constructor(opts?: EnvHttpProxyAgent.Options)

  dispatch(options: Agent.DispatchOptions, handler: Dispatcher.DispatchHandlers): boolean;
}

declare namespace EnvHttpProxyAgent {
  export interface Options extends Agent.Options {
    /** Overrides the value of the HTTP_PROXY environment variable  */
    httpProxy?: string;
    /** Overrides the value of the HTTPS_PROXY environment variable  */
    httpsProxy?: string;
    /** Overrides the value of the NO_PROXY environment variable  */
    noProxy?: string;
  }
}
