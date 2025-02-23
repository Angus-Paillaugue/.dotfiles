import LazyResult from '.pnpm/postcss@8.4.47/node_modules/postcss/lib/lazy-result'
import { SourceMap } from '.pnpm/postcss@8.4.47/node_modules/postcss/lib/postcss'
import Processor from '.pnpm/postcss@8.4.47/node_modules/postcss/lib/processor'
import Result, { Message, ResultOptions } from '.pnpm/postcss@8.4.47/node_modules/postcss/lib/result'
import Root from '.pnpm/postcss@8.4.47/node_modules/postcss/lib/root'
import Warning from '.pnpm/postcss@8.4.47/node_modules/postcss/lib/warning'

declare namespace NoWorkResult {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  export { NoWorkResult_ as default }
}

/**
 * A Promise proxy for the result of PostCSS transformations.
 * This lazy result instance doesn't parse css unless `NoWorkResult#root` or `Result#root`
 * are accessed. See the example below for details.
 * A `NoWork` instance is returned by `Processor#process` ONLY when no plugins defined.
 *
 * ```js
 * const noWorkResult = postcss().process(css) // No plugins are defined.
 *                                             // CSS is not parsed
 * let root = noWorkResult.root // now css is parsed because we accessed the root
 * ```
 */
declare class NoWorkResult_ implements LazyResult<Root> {
  catch: Promise<Result<Root>>['catch']
  finally: Promise<Result<Root>>['finally']
  then: Promise<Result<Root>>['then']
  constructor(processor: Processor, css: string, opts: ResultOptions)
  async(): Promise<Result<Root>>
  sync(): Result<Root>
  toString(): string
  warnings(): Warning[]
  get content(): string
  get css(): string
  get map(): SourceMap
  get messages(): Message[]
  get opts(): ResultOptions
  get processor(): Processor
  get root(): Root
  get [Symbol.toStringTag](): string
}

declare class NoWorkResult extends NoWorkResult_ {}

export = NoWorkResult
