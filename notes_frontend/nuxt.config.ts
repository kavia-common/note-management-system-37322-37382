/* https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    '~/assets/styles/theme.css',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || '',
      frontendUrl: process.env.NUXT_PUBLIC_FRONTEND_URL || '',
      wsUrl: process.env.NUXT_PUBLIC_WS_URL || '',
      nodeEnv: process.env.NUXT_PUBLIC_NODE_ENV || '',
      nextTelemetryDisabled: process.env.NUXT_PUBLIC_NEXT_TELEMETRY_DISABLED || '',
      enableSourceMaps: process.env.NUXT_PUBLIC_ENABLE_SOURCE_MAPS || '',
      port: process.env.NUXT_PUBLIC_PORT || '',
      trustProxy: process.env.NUXT_PUBLIC_TRUST_PROXY || '',
      logLevel: process.env.NUXT_PUBLIC_LOG_LEVEL || '',
      healthcheckPath: process.env.NUXT_PUBLIC_HEALTHCHECK_PATH || '',
      featureFlags: process.env.NUXT_PUBLIC_FEATURE_FLAGS || '',
      experimentsEnabled: process.env.NUXT_PUBLIC_EXPERIMENTS_ENABLED || '',
    },
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
