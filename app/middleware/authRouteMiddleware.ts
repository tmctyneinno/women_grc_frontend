export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()
    if (authStore.isLoggedIn) {
        return navigateTo('/account/dashboard')
    }
})