import Dispatcher from ".pnpm/undici-types@6.19.8/node_modules/undici-types/dispatcher";

export declare class RedirectHandler implements Dispatcher.DispatchHandlers {
  constructor(
    dispatch: Dispatcher,
    maxRedirections: number,
    opts: Dispatcher.DispatchOptions,
    handler: Dispatcher.DispatchHandlers,
    redirectionLimitReached: boolean
  );
}

export declare class DecoratorHandler implements Dispatcher.DispatchHandlers {
  constructor(handler: Dispatcher.DispatchHandlers);
}
