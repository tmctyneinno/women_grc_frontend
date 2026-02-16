export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // --- Handle token from query params ---
  if (to.query?.token) {
    await authStore.loginViaToken(to.query.token as string) // saves token + fetches profile
    // Remove token from URL without reloading
    return navigateTo({ path: to.path, query: { ...to.query, token: undefined } }, { replace: true })
  }

  // --- If logged in but profile not loaded yet ---
  if (authStore.isLoggedIn && !authStore.user) {
    await authStore.getProfile()
  }

  // --- Redirect if not logged in ---
  if (!authStore.isLoggedIn) {
    return navigateTo('/auth/login', { replace: true })
  }
})
