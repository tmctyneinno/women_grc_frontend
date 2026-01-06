<template>
    <span class="position-relative cursor-pointer" @click="goToCart">
        <i class="bi bi-cart "></i>
        <span style="font-size: 10px;"
            class="position-absolute top-0 start-100  translate-middle badge p-1 rounded-pill bg-danger">
            {{ cartStore.items.length }}
        </span>
    </span>
</template>

<script setup lang="ts">
function goToCart() {
    navigateTo('/account/cart')
}

const cartStore = useCartStore()
</script>