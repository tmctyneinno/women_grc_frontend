<template>

    <div class="row g-3 mt-2">
        <div class="col-lg-3">
            <div class="form-label"> User name </div>
            <input class="form-control" type="text" placeholder="first name">
        </div>
        <div class="col-lg-3">
            <div class="form-label d-none d-md-block"> &nbsp; </div>
            <input class="form-control" type="text" placeholder="last name">
        </div>

        <div class="col-lg-6">
            <div class="form-label"> Company name <span class="text-muted small">(optional)</span>
            </div>
            <input class="form-control" type="text" placeholder="">
        </div>

        <div class="col-lg-12">
            <div class="form-label"> Address </div>
            <input class="form-control" type="text" placeholder="">
        </div>

        <div class="col-lg-3">
            <div class="form-label"> Country </div>
            <CustomInputSelect :options="countries" :label="'name'" v-model="form.country" />
        </div>

        <div class="col-lg-3">
            <div class="form-label"> Region/State </div>
            <CustomInputSelect :options="states" :label="'name'" v-model="form.state" />
        </div>


        <div class="col-lg-3">
            <div class="form-label"> City </div>
            <CustomInputSelect :options="cities" :label="'name'" v-model="form.city" :taggable="true" />
        </div>



        <div class="col-lg-3">
            <div class="form-label"> Zip Code </div>
            <input class="form-control" type="text" placeholder="">
        </div>


        <div class="col-lg-6">
            <div class="form-label"> Email</div>
            <input class="form-control" type="email" placeholder="">
        </div>


        <div class="col-lg-6">
            <div class="form-label"> Phone Number</div>
            <input class="form-control" type="text" placeholder="">
        </div>


        <div class="col-12 mt-5">
            <div class="card">
                <div class="card-body">

                    <!-- payment Types -->
                    <div class="row g-3">
                        <div v-for="paymentType in paymentTypes" class="col-lg-3 cursor-pointer hover-tiltY">
                            <div class="card" @click="form.payment_type = paymentType.id">
                                <div class="card-body">
                                    <div class="text-center mb-2">
                                        <NuxtImg v-if="paymentType.image" width="24" :src="paymentType.image" />
                                        <i v-else class="bi bi-credit-card"></i>
                                    </div>

                                    <div class="text-center small">
                                        {{ paymentType.name }}
                                    </div>

                                    <div class="text-center">
                                        <i v-if="form.payment_type == paymentType.id"
                                            class="bi bi-check-circle-fill text-theme"></i>
                                        <i v-else class="bi bi-circle"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row g-3 mt-3">

                        <div class="col-lg-6">
                            <div class="form-label">Name on Card</div>
                            <input class="form-control" type="text" placeholder="">
                        </div>

                        <div class="col-lg-6">
                            <div class="form-label">Card Number</div>
                            <input class="form-control" type="text" placeholder="">
                        </div>

                        <div class="col-lg-6">
                            <div class="form-label">Expiry Date</div>
                            <input class="form-control" type="text" placeholder="DD/YY">
                        </div>

                        <div class="col-lg-6">
                            <div class="form-label">CVC</div>
                            <input class="form-control" type="text" placeholder="">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>



</template>

<script setup lang="ts">

import { Country, State, City } from 'country-state-city';
import type { ICountry, IState, ICity } from 'country-state-city'

const cartStore = useCartStore()


const paymentTypes = [
    { id: 1, name: 'Venmo', image: '/images/account/learning/payment-venmo.png' },
    { id: 2, name: 'Paypal', image: '/images/account/learning/payment-paypal.png' },
    { id: 3, name: 'Amazon Pay', image: '/images/account/learning/payment-amazon.png' },
    { id: 4, name: 'Debid/Credit Card', image: '' },
]

const form = reactive({
    country: null as ICountry | null,
    state: null as IState | null,
    city: null as ICity | null,
    payment_type: 4
})

const countries = computed(() => {
    return Country.getAllCountries()
})

const states = computed(() =>
    form.country
        ? State.getStatesOfCountry(form.country.isoCode)
        : []
)

const cities = computed(() =>
    form.state
        ? City.getCitiesOfState(form.state.countryCode, form.state.isoCode)
        : []
)

watch(() => form.country, () => {
    form.state = null
})

watch(() => form.state, () => {
    form.city = null
})

</script>