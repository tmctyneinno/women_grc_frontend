export default defineNuxtRouteMiddleware((to, from) => {

    if (to.matched.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: `Page ${to.path} not found`
        })
    }


    // console.log(to);


    // return abortNavigation('Page is blocked')
    // return navigateTo('/')
})