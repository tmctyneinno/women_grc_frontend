<template>
    <nav class="navbar navbar-expand-lg fixed-top p-3 bg-white" :class="customClass">
        <div class="container">
            <NuxtLink class="navbar-brand" to="/">
                <img src="/images/WGRC-logo.png" width="45" alt="site_logo">
            </NuxtLink>
            <button class="navbar-toggler border-0" data-bs-toggle="offcanvas" data-bs-target="#menuOffcanvas"
                aria-controls="menuOffcanvas" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">


                    <li v-for="({ title, routePath }, i) in templateStore.navBarMenus" :key="i" class="nav-item ">
                        <NuxtLink class="nav-link me-2 " :class="{ 'text-whit': route.path == '/' && !headerDropped }"
                            :to="routePath">
                            {{ title }}
                        </NuxtLink>
                    </li>
                </ul>
                <div class="d-flex">
                    <NuxtLink to="/" class="btn btn-theme nav-link  p-1 px-3">
                        Register
                    </NuxtLink>
                </div>
            </div>
        </div>
    </nav>
    <LandingMobileMenu />
</template>

<script setup lang="ts">


const templateStore = useTemplateStore()
const headerDropped = ref<boolean>(false)
const route = useRoute()
const router = useRouter()

const customClass = computed(() => ({
    'bg-transparent text-white': !headerDropped.value && route.path == '/',
    'animate__animated animate__slideInDown animate__faster': headerDropped.value && route.path == '/',
    'shadow-sm': headerDropped.value || route.path !== '/'
}))


onMounted(() => {
    window.addEventListener("scroll", function () {
        const scrollThreshold = 50;
        if (window.scrollY > scrollThreshold)
            headerDropped.value = true;
        else
            headerDropped.value = false;
    })
})

</script>


<style scoped>
.navbar-nav .nav-link.active,
.navbar-nav .nav-link.show {
    color: var(--theme-color) !important;
    /* font-weight: bolder; */
    border-bottom: 1px solid var(--theme-color) !important;
}

.navbar-nav .nav-link {
    transition: all ease-in-out 0.4s;
}

.navbar-nav .nav-link:hover {
    color: #000 !important;
    transform: translateY(-5px);
}
</style>