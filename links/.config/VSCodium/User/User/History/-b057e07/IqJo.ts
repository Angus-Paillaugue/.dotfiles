import Dispatcher from ".pnpm/undici-types@6.19.8/node_modules/undici-types/dispatcher";
import RetryHandler from ".pnpm/undici-types@6.19.8/node_modules/undici-types/retry-handler";

export default Interceptors;

declare namespace Interceptors {
  export type DumpInterceptorOpts = { maxSize?: number }
  export type RetryInterceptorOpts = RetryHandler.RetryOptions
  export type RedirectInterceptorOpts = { maxRedirections?: number }

  export function createRedirectInterceptor(opts: RedirectInterceptorOpts): Dispatcher.DispatcherComposeInterceptor
  export function dump(opts?: DumpInterceptorOpts): Dispatcher.DispatcherComposeInterceptor
  export function retry(opts?: RetryInterceptorOpts): Dispatcher.DispatcherComposeInterceptor
  export function redirect(opts?: RedirectInterceptorOpts): Dispatcher.DispatcherComposeInterceptor
}
