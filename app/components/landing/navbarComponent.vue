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


                    <li class="nav-item ">
                        <NuxtLink class="nav-link me-2 " to="/">
                            Home
                        </NuxtLink>
                    </li>

                    <li class="nav-item me-2">
                        <div class="dropdown">
                            <button ref="dropdownToggler" class="nav-link dropdown-toggle "
                                :class="{ 'router-link-exact-active': onAboutRoute }" type="button" id="triggerId"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                About
                                <!-- <i class="bi bi-chevron-down"></i> -->
                            </button>
                            <div class="dropdown-menu animate__animated animate__zoomIn animate__faster"
                                aria-labelledby="triggerId">

                                <nuxt-link class="dropdown-item hover-tiltX cursor-pointer" to="/about-us">
                                    Who We Are
                                </nuxt-link>

                                <nuxt-link class="dropdown-item hover-tiltX cursor-pointer" to="/advisory-board">
                                    Advisory Board
                                </nuxt-link>

                            </div>
                        </div>

                    </li>


                    <li v-for="({ title, routePath, hideOnNavBar }, i) in templateStore.navBarMenus" :key="i"
                        class="nav-item ">
                        <NuxtLink v-if="!hideOnNavBar" class="nav-link me-2 "
                            :class="{ 'text-whit': route.path == '/' && !headerDropped }" :to="routePath">
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

const onAboutRoute = computed(() => {
    return ['/about-us', '/advisory-board'].includes(route.fullPath)
})

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
.nav-item .router-link-exact-active {
    font-weight: bolder;
    color: var(--theme-color);
    /* border-bottom: 1px solid var(--theme-color) !important; */
}

.navbar-nav .nav-link {
    transition: all ease-in-out 0.4s;
}

.navbar-nav .nav-link:hover {
    color: #000 !important;
    transform: translateY(-5px);
}


.dropdown-toggle::after {
    content: none !important;
}

.dropdown:hover .dropdown-menu {
    display: block;
    /* min-height: 150px; */
}

.dropdown-item:hover {
    color: var(--theme-color);
    background: transparent;
}

.dropdown-menu {
    --bs-dropdown-link-active-color: var(--bs-body-color);
    --bs-dropdown-link-active-bg: transparent;
}
</style>