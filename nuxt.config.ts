// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "nuxt3-leaflet"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000",
    },
  },
  imports: {
    dirs: ['types/*.d.ts'],
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
    },
  },
});