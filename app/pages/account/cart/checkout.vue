<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="card border-0 h-100">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-lg-8">
                            <h5 class="fw-medium mb-3">Checkout Summary</h5>
                            <div class="card">
                                <div class="card-body">
                                    <div class="small text-muted mb-2">Items in cart</div>
                                    <ul class="list-group list-group-flush">
                                        <li
                                            v-for="(item, index) in payableItems"
                                            :key="`${item.source || 'item'}-${item.id}`"
                                            class="list-group-item px-0 d-flex justify-content-between align-items-start"
                                        >
                                            <div>
                                                <div class="fw-medium">{{ index + 1 }}. {{ item.title }}</div>
                                                <div class="small text-muted text-capitalize">{{ item.source || 'item' }}</div>
                                            </div>
                                            <div class="fw-semibold">GBP {{ digitDisplay(Number(item.price || 0)) }}</div>
                                        </li>
                                    </ul>
                                    <div v-if="payableItems.length === 0" class="small text-muted">
                                        No payable items available in your cart.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="card">
                                <div class="card-header bg-transparent border-0">
                                    order Summary
                                </div>
                                <div class="card-body">

                                    <ul class="list-group list-group-flush small">
                                        <li class="list-group-item">
                                            Total Price
                                            <span class="float-end fs-semibold text-end">
                                                {{ digitDisplay(arraySum(payableItems, 'price')) }}
                                            </span>
                                        </li>

                                        <li class="list-group-item">
                                            Tax
                                            <span class="float-end fs-semibold text-end">
                                                {{ digitDisplay(cartStore.tax) }}
                                            </span>
                                        </li>

                                        <li class="list-group-item">
                                            Total ({{ payableItems.length }}
                                            {{ payableItems.length == 1 ? 'item' : 'items' }})

                                            <span class="float-end fs-semibold text-end">
                                                {{ totalToPay }}
                                            </span>
                                        </li>
                                    </ul>



                                    <button @click="showSuccessAlert" class="btn btn-theme w-100 mt-2" :disabled="isProcessing || payableItems.length === 0">
                                        <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                                        Pay GBP {{ totalToPay }}
                                    </button>
                                    <div class="small text-muted">
                                        By completing your purchase, you agree to these Terms of Use
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
import Swal from 'sweetalert2'
import api from '~/api'
import { useCartStore } from '~/stores/cart-store'
import useFxn from '~/composables/useFxn'

definePageMeta({
    middleware: 'account-route-middleware'
})

const route = useRoute()
const cartStore = useCartStore()
const isProcessing = ref(false)


const { arraySum, digitDisplay }: any = useFxn
const payableItems = computed(() => {
    return cartStore.items.filter((item: any) => Number(item?.price || 0) > 0)
})

const totalToPay = computed(() => {
    return digitDisplay(arraySum(payableItems.value, 'price') + cartStore.tax)
})


async function showSuccessAlert() {
    if (!cartStore.items.length || isProcessing.value) return
    if (!payableItems.value.length) {
        await Swal.fire({
            icon: 'info',
            title: 'No payable items',
            text: 'Your cart currently has no payable item for checkout.',
            confirmButtonColor: '#293567',
        })
        return
    }

    try {
        isProcessing.value = true

        const base = window.location.origin
        const successUrl = `${base}/account/cart/checkout?checkout=success&session_id={CHECKOUT_SESSION_ID}`
        const cancelUrl = `${base}/account/cart/checkout?checkout=cancel`

        const response = await api.cartCheckout({
            success_url: successUrl,
            cancel_url: cancelUrl,
            tax_amount: Number(cartStore.tax || 0),
        })

        const checkoutUrl = response?.data?.data?.checkout_url
        if (!checkoutUrl) {
            throw new Error('Checkout URL missing in response')
        }

        window.location.href = checkoutUrl
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Checkout failed',
            text: error?.response?.data?.message || 'Unable to initialize checkout. Please try again.',
            confirmButtonColor: '#293567',
        })
    } finally {
        isProcessing.value = false
    }
}

const syncCheckoutStatus = async () => {
    const checkoutState = String(route.query.checkout || '')
    const sessionId = String(route.query.session_id || '')
    if (checkoutState !== 'success' || !sessionId) return

    try {
        const response = await api.cartCheckoutStatus(sessionId)
        const tx = response?.data?.data
        if (tx?.status === 'paid') {
            await cartStore.fetchCart()
            await Swal.fire({
                icon: 'success',
                title: 'Payment successful',
                text: 'Your payment has been confirmed and your access has been activated.',
                confirmButtonColor: '#293567',
            })
            await navigateTo('/account/learning-center')
            return
        }

        await Swal.fire({
            icon: 'info',
            title: 'Payment processing',
            text: 'Your payment is still being processed. Please refresh in a few seconds.',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Unable to verify payment',
            text: error?.response?.data?.message || 'Please contact support if you were charged.',
            confirmButtonColor: '#293567',
        })
    }
}

onMounted(async () => {
    await cartStore.fetchCart()
    if (!cartStore.items.length) {
        await navigateTo('/account/dashboard')
        return
    }

    await syncCheckoutStatus()
    if (String(route.query.checkout || '') === 'cancel') {
        await Swal.fire({
            icon: 'info',
            title: 'Checkout cancelled',
            text: 'Your payment was cancelled. You can continue anytime.',
            confirmButtonColor: '#293567',
        })
    }
})
</script>

<style scoped>
.spinner-border-sm {
    width: 1rem;
    height: 1rem;
}
</style>
