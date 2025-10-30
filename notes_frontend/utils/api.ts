import { useRuntimeConfig } from '#imports'

/**
 * PUBLIC_INTERFACE
 * getApiBase
 * Returns the API base URL resolved from runtimeConfig.public.apiBase or defaults to '/api'.
 */
export function getApiBase(): string {
  /** This is a public function to resolve the API base URL using env-configured runtimeConfig. */
  const cfg = useRuntimeConfig()
  const base = (cfg.public?.apiBase as string) || '/api'
  return base.replace(/\/+$/, '') // trim trailing slash
}

/**
 * PUBLIC_INTERFACE
 * apiFetch
 * Minimal wrapper around $fetch using the configured API base.
 */
export async function apiFetch<T>(path: string, opts?: any): Promise<T> {
  const base = getApiBase()
  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`
  return await $fetch<T>(url, { ...opts })
}
