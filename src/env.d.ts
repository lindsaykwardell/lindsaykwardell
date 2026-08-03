/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BUTTONDOWN_USERNAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
