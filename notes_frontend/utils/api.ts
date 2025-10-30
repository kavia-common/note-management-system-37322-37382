import { useRuntimeConfig } from '#imports'

type FeatureFlags = Record<string, string | boolean>

/**
 * Parse feature flags from either JSON string or "KEY=VALUE,KEY2=VALUE2" format.
 */
function parseFeatureFlags(raw: string | undefined): FeatureFlags {
  if (!raw) return {}
  // Try JSON first
  try {
    const data = JSON.parse(raw)
    if (data && typeof data === 'object') return data as FeatureFlags
  } catch {
    // Fallback to CSV key=value
  }
  const flags: FeatureFlags = {}
  for (const part of String(raw).split(',').map(s => s.trim()).filter(Boolean)) {
    const [k, ...rest] = part.split('=')
    const v = rest.join('=')
    if (!k) continue
    const val =
      v === ''
        ? true
        : v?.toLowerCase?.() === 'true'
          ? true
          : v?.toLowerCase?.() === 'false'
            ? false
            : v
    flags[k] = val
  }
  return flags
}

/**
 * PUBLIC_INTERFACE
 * getApiBase
 * Returns the API base URL resolved from runtimeConfig.public values.
 * Logic:
 *  - If feature flag USE_EXTERNAL_BACKEND=true and backendUrl is set, use backendUrl as base
 *  - Else use apiBase (default '/api') which points to Nuxt server routes (mock)
 */
export function getApiBase(): string {
  /** This is a public function to resolve the API base URL using env-configured runtimeConfig. */
  const cfg = useRuntimeConfig()
  const pub = cfg.public as any
  const featureFlags = parseFeatureFlags(pub?.featureFlags)
  const useExternal = Boolean(featureFlags['USE_EXTERNAL_BACKEND'] || featureFlags['use_external_backend'])

  let base = (pub?.apiBase as string) || '/api'

  // Prefer explicit backendUrl if external flag enabled
  if (useExternal && pub?.backendUrl) {
    base = String(pub.backendUrl)
  }

  // Ensure no trailing slash
  return base.replace(/\/+$/, '')
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
