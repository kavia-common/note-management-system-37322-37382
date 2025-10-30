export default defineNuxtPlugin((nuxtApp) => {
  // other components can inject via useNuxtApp().$toast if needed in future
  const api = {
    success: (msg: string) => {
      // The Toast component exposes provide('toast'), which is used in pages.
      // This plugin is a placeholder for future global integration if needed.
      console.debug('[toast]', msg)
    }
  }
  return {
    provide: {
      toast: api
    }
  }
})
