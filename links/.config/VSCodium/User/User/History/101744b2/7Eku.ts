// This file is an augmentation to the built-in ImportMeta interface
// Thus cannot contain any top-level imports
// <https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation>

interface ImportMetaEnv {
  [key: string]: any
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean
}

interface ImportMeta {
  url: string

  readonly hot?: import('.pnpm/vite@5.4.8_@types+node@22.7.3/node_modules/vite/types/hot.js').ViteHotContext

  readonly env: ImportMetaEnv

  glob: import('.pnpm/vite@5.4.8_@types+node@22.7.3/node_modules/vite/types/importGlob.js').ImportGlobFunction
}
