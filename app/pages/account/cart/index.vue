<template>
    <NuxtLayout name="account-layout">
        <div class="container">


            <AccountCartEmptyCartComponent v-if="cartStore.items.length == 0" />
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
                                        ${{ digitDisplay(arraySum(cartStore.items, 'price')) }}
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


definePageMeta({
    middleware: 'account-route-middleware'
})

const cartStore = useCartStore()

function removeFromCart(id: number | string) {
    cartStore.removeFromCart(id)
}

const { arraySum, digitDisplay }: any = useFxn

function goToCheckOut() {
    navigateTo('/account/cart/checkout')
}

</script>