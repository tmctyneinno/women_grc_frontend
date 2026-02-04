<template>
    <Head>
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      />
      <!-- Script configuration -->
      <script>
        // Configure Tailwind to avoid conflicts with Bootstrap
        tailwind.config = {
          prefix: 'tw-',
          important: '.tw-tailwind-container',
          corePlugins: {
            preflight: false,
          }
        }
      </script>
    </Head>
    <nuxt-layout name="landing-layout">
        <landing-hero-component /> 

        <div id="landing-about"></div>
        <landing-about-us-component />

        <div id="landing-events"></div>
        <landing-events-component />

        <div id="landing-blog"></div>
        <landing-blog-component />

        <div id="landing-faqs"></div>
        <landing-faqs-component />

        <div id="landing-clients"></div>
        <landing-clients-component />

        <div class="container py-5">
            <landing-subscribe-component />
        </div>
    </nuxt-layout>

</template>