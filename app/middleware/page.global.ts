export default defineNuxtRouteMiddleware((to, from) => {

    if (to.matched.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: `Page ${to.path} not found`
        })
    }




    // const store = useAuthStore()
    // return abortNavigation('Page is blocked')
    // return navigateTo('/')
})