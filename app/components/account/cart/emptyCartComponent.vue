<template>
    <div class="card">
        <div>
            <div class="text-center">
                <NuxtImg src="/images/account/learning/empty-cart.png" alt="img" />
            </div>
            <div class="text-center fs-5">YOUR CART IS EMPTY. LET’S CHANGE THAT!</div>
            <div class="text-center text-muted">
                Browse Our Courses Page to Check How We Can Serve You Better
            </div>
            <div class="text-center mt-3">
                <NuxtLink class="btn btn-theme btn-sm" to="/account/learning-center">
                    Browse Courses
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>