// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:3000",
    }
  }
});