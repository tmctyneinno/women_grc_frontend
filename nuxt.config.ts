// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  routeRules: {
    '/api/images/**': {
      // proxy: 'http://localhost:8000/storage/**' 
      proxy: 'http://api.wgrcfp.org/storage/**'
    },
    '/account/**': { ssr: false },

    '/_nuxt/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
    },
    '/_assets/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
    },
    '/_ipx/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
    },
    '/images/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
    },
    '**/*.ico': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
    }
  },


  nitro: { 
    devProxy: {
        '/api': {
            target: process.env.API_BASE_URL || 'http://localhost:8000/api/v1',
            changeOrigin: true,
            prependPath: true,
        }
    },
    preset: 'static' 
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      googleSignIn: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
      }
    }
  },

  modules: [
    '@nuxtjs/axios',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-aos',
    'vue3-carousel-nuxt',
    'nuxt-vue3-google-signin',
    '@nuxt/image',
  ],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  app: {
    buildAssetsDir: '/_assets/',
    head: {
      title: 'Women in GRCFP',
      // titleTemplate: '%s - WIGRCFP', // This adds suffix to all titles
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // Open Graph meta tags
        { property: 'og:title', content: 'Women in GRCFP' },
        { property: 'og:description', content: 'Women in Governance, Risk, Compliance, Financial Crime, and Fraud Prevention is a pioneering initiative founded by Dr. Foluso Amusa, PhD, dedicated to empowering women professionals in these critical fields. Our mission is to foster leadership, inspire innovation, and create a collaborative platform for women to thrive, lead, and make a lasting impact across industries.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://wgrcfp.org' },
        { property: 'og:image', content: 'https://wgrcfp.org/images/WGRC-logo.png' },

        // Twitter meta tags
        // { name: 'twitter:card', content: 'summary_large_image' },
        // { name: 'twitter:title', content: 'Women in GRCFP' },
        // { name: 'twitter:description', content: 'Women in Governance, Risk, Compliance, Financial Crime, and Fraud Prevention is a pioneering initiative founded by Dr. Foluso Amusa, PhD, dedicated to empowering women professionals in these critical fields. Our mission is to foster leadership, inspire innovation, and create a collaborative platform for women to thrive, lead, and make a lasting impact across industries.' },
        // { name: 'twitter:image', content: 'https://wgrcfp.org/images/WGRC-logo.png' },

        // Fallback description for search engines
        { name: 'description', content: 'Women in Governance, Risk, Compliance, Financial Crime, and Fraud Prevention is a pioneering initiative founded by Dr. Foluso Amusa, PhD, dedicated to empowering women professionals in these critical fields. Our mission is to foster leadership, inspire innovation, and create a collaborative platform for women to thrive, lead, and make a lasting impact across industries.' }


      ]
    }
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '@vuepic/vue-datepicker/dist/main.css',
    'sweetalert2/dist/sweetalert2.min.css',
    'vue3-easy-data-table/dist/style.css',
    '@marcoschulte/vue3-progress/style',
    'animate.css',
    'vue3-carousel/carousel.css',
    'vue-tel-input/vue-tel-input.css',
    'vue-select/dist/vue-select.css',
    '~/layouts/styles/custom.css'
  ],

  plugins: [
    './plugins/bootstrap.client.ts',
    './plugins/plugins.client.ts'
  ],


})

// command-line installation ############################

/*

- npm install @marcoschulte/vue3-progress
- npm install animate.css --save
- npm i bootstrap@5.3.8
- npm i bootstrap-icons
- npx nuxi@latest module add pinia
- npm install -S vue-sweetalert2
- npm install aos --save
- npm i js-cookie
- npm install vue3-easy-data-table
- npm install @vuepic/vue-datepicker
- npm i -D @vueuse/nuxt @vueuse/core
- npx nuxi@latest module add aos
- npm i axios
- npx nuxi@latest module add vue3-carousel-nuxt
- npm i @vueform/multiselect
- npm install maska
- npx nuxi@latest module add nuxt-vue3-google-signin
- npm install --save-dev @types/node
- npm install vue-tel-input
- npm install vee-validate --save
- npm install @vee-validate/yup
- npm i country-state-city

*/