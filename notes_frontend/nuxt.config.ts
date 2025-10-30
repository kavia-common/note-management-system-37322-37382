/* https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    '~/assets/styles/theme.css',
  ],
  runtimeConfig: {
    public: {
      /**
       * apiBase determines where the frontend sends requests:
       * - If using internal mock server routes, set to '/api'
       * - If using an external backend, set to the external base URL (e.g. 'https://api.example.com')
       */
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',

      /**
       * Optional external backend URL. When provided and feature flag indicates external usage,
       * utils/api.ts will prefer this to construct apiBase.
       */
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

      /**
       * featureFlags is expected to be a JSON string or comma-separated key=value pairs.
       * A flag named USE_EXTERNAL_BACKEND=true will direct the app to use backendUrl for API calls.
       */
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
