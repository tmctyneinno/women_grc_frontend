<template>
    <NuxtLayout name="account-layout">
        <div class="container">

            <div class="card border-0 h-100">
                <div class="card-body">



                    <div class="row g-3">
                        <div class="col-lg-8">

                            <h5 class="fw-medium">
                                Billing Infomation
                            </h5>


                            <AccountCartCheckoutForm />

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
                                                {{ digitDisplay(arraySum(cartStore.items, 'price')) }}
                                            </span>
                                        </li>

                                        <li class="list-group-item">
                                            Tax
                                            <span class="float-end fs-semibold text-end">
                                                {{ digitDisplay(cartStore.tax) }}
                                            </span>
                                        </li>

                                        <li class="list-group-item">
                                            Total ({{ cartStore.items.length }}
                                            {{ cartStore.items.length == 1 ? 'course' : 'courses' }})

                                            <span class="float-end fs-semibold text-end">
                                                {{ totalToPay }}
                                            </span>
                                        </li>
                                    </ul>



                                    <button @click="showSuccessAlert" class="btn btn-theme w-100 mt-2">
                                        Pay ${{ totalToPay }}
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
definePageMeta({
    middleware: 'account-route-middleware'
})

const cartStore = useCartStore()


const { arraySum, digitDisplay }: any = useFxn
const { swalSuccess }: any = sweetAlerts

const totalToPay = computed(() => {
    return digitDisplay(arraySum(cartStore.items, 'price') + cartStore.tax)
})


function showSuccessAlert() {
    swalSuccess('Payment Successful',
        'You can now start learning. Thank you!',
        'Start Learning',
        'success').then((confirm: any) => {
            //    if (confirm.value)
        })
}

</script>