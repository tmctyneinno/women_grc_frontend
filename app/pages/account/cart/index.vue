<template>
    <NuxtLayout name="account-layout">
        <div class="container">
            <div v-if="isCheckingCart" class="text-center py-5">
                <div class="spinner-border text-theme" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else class="card border-0 h-100">
                <div class="card-body">

                    <h4 class="fw-medium">
                        Shopping Cart
                    </h4>
                    <div class="mb-3">
                        {{ cartStore.items.length }}
                        {{ cartStore.items.length == 1 ? 'item' : 'items' }}
                        in cart
                    </div>

                    <div class="row g-3">
                        <div class="col-md-8">
                            <div v-for="cartItem in cartStore.items">
                                <AccountCartItemDisplay :item="cartItem" @remove="removeFromCart" />
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-header bg-transparent border-0">Subtotal</div>
                                <div class="card-body">
                                    <div class="fw-semibold fs-3">
                                        GBP {{ digitDisplay(arraySum(cartStore.items, 'price')) }}
                                    </div>
                                    <div @click="goToCheckOut" class="btn btn-theme w-100 mt-2">
                                        Proceed to Checkout
                                    </div>
                                    <div class="small text-muted">
                                        You won’t be charged yet
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

import { useCartStore } from '~/stores/cart-store'
import useFxn from '~/composables/useFxn'
import { navigateTo } from 'nuxt/app'

// explicit imports help prevent runtime errors during dynamic page loading

definePageMeta({
    middleware: 'account-route-middleware'
})

const cartStore = useCartStore()
const isCheckingCart = ref(true)

function removeFromCart(id: number | string) {
    cartStore.removeFromCart(id)
}

const { arraySum, digitDisplay }: any = useFxn

function goToCheckOut() {
    navigateTo('/account/cart/checkout')
}

const redirectIfEmpty = async () => {
    if (!cartStore.items.length) {
        await navigateTo('/account/dashboard')
    }
}

onMounted(async () => {
    await cartStore.fetchCart()
    await redirectIfEmpty()
    isCheckingCart.value = false
})

watch(
    () => cartStore.items.length,
    async (count) => {
        if (!isCheckingCart.value && count === 0) {
            await navigateTo('/account/dashboard')
        }
    }
)

</script>
