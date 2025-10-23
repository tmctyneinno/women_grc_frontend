// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-aos',
    'vue3-carousel-nuxt',
    'nuxt-vue3-google-signin',
  ],

  runtimeConfig: {
    public: {
      googleSignIn: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
      }
    }
  },


  app: {
    head: {
      title: 'Women in GRCFP',
      // titleTemplate: '%s - WIGRCFP', // This adds suffix to all titles
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },


  ssr: false,   // For static hosting

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
    '~/layouts/styles/custom.css?v=' + Date.now()
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
- npm add vue3-select-component
- npm install maska
- npx nuxi@latest module add nuxt-vue3-google-signin
- npm install --save-dev @types/node
- npm install vue-tel-input
- npm install vee-validate --save
- npm install @vee-validate/yup

*/