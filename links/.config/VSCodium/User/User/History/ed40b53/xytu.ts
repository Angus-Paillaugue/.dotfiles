/// <reference types="node" />

import type { Headers } from '.pnpm/undici-types@6.20.0/node_modules/undici-types/fetch'

export interface Cookie {
  name: string
  value: string
  expires?: Date | number
  maxAge?: number
  domain?: string
  path?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
  unparsed?: string[]
}

export function deleteCookie (
  headers: Headers,
  name: string,
  attributes?: { name?: string, domain?: string }
): void

export function getCookies (headers: Headers): Record<string, string>

export function getSetCookies (headers: Headers): Cookie[]

export function setCookie (headers: Headers, cookie: Cookie): void
