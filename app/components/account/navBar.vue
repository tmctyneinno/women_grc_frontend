<template>
    <nav class="navbar navbar-expand-lg fixed-top p-3 bg-white" :class="customClass">
        <div class="container">
            <NuxtLink class="navbar-brand" to="/account/dashboard">
                <img src="/images/WGRC-logo.png" width="30" alt="site_logo">
            </NuxtLink>
            <button class="navbar-toggler border-0" data-bs-toggle="offcanvas" data-bs-target="#menuOffcanvas"
                aria-controls="menuOffcanvas" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0" :class="{ 'hide-but-keep-space': isGuest }">
                    <li v-for="({ title, routePath, hasDropDown, dropdownItems }, i) in templateStore.accountMenus"
                        :key="i" class="nav-item ">
                        <div v-if="hasDropDown" class="dropdown">
                            <button class="nav-link dropdown-toggle" type="button" :id="'triggerId' + i"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ title }}
                            </button>

                            <div class="dropdown-menu animate__animated animate__slideInUp animate__faster"
                                :aria-labelledby="'triggerId' + i">

                                <nuxt-link v-for="(child, index) in dropdownItems" :key="index"
                                    class="dropdown-item hover-tiltX cursor-pointer" :to="child.routePath">
                                    {{ child.title }}
                                </nuxt-link>

                            </div>
                        </div>
                        <NuxtLink v-else class="nav-link me-2 "
                            :class="{ 'text-whit': route.path == '/' && !headerDropped }" :to="routePath">
                            {{ title }}
                        </NuxtLink>
                    </li>
                </ul>
                <div class="mx-auto" :class="{ 'hide-but-keep-space': isGuest }">
                    <CustomInputSearch placeholder="Search courses, topics,platform..." />
                </div>
                <div class="mx-auto" :class="{ 'hide-but-keep-space': isGuest }">
                    <AccountNavBarNotification />
                </div>

                <div class="mx-auto" :class="{ 'hide-but-keep-space': isGuest }">
                    <AccountNavBarCart />
                </div>


                <span class="mx-auto">
                    <AccountNavBarLogout />
                </span>

            </div>
        </div>
    </nav>
    <AccountNavMobile />
</template>

<script setup lang="ts">

const templateStore = useTemplateStore()
const headerDropped = ref<boolean>(false)
const route = useRoute()

const authStore = useAuthStore()
const { isGuest } = storeToRefs(authStore)



const customClass = computed(() => ({
    'bg-transparent text-white': !headerDropped.value && route.path == '/',
    'animate__animated animate__slideInDown animate__faster': headerDropped.value && route.path == '/',
    // 'shadow-sm': headerDropped.value || route.path !== '/'
    'shadow-sm': headerDropped.value
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
    /* transform: translateY(0); */
    /* animation: slideUp 0.3s ease-in-out; */
}

.dropdown-item:hover {
    color: var(--theme-color);
    background: transparent;
}
</style>