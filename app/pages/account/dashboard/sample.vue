<template>
    <NuxtLayout name="account-layout">

        <div class="container">

            <div class="card border-0">
                <div class="card-body">

                    <div class="fw-semibold">Welcome, {{ userName }}!</div>
                    <div class="mb-3">
                        Let’s get you started on your growth journey. Here, you can join events, connect with
                        mentors, learn, and grow in Governance, Risk, and Compliance.
                    </div>

                    <div class="card border-0 bg-account">
                        <div class="card-body">
                            <div class="fw-medium">
                                <i class="bi bi-lightbulb text-warning-emphasis"></i>
                                Complete your profile to unlock more opportunities
                            </div>

                            <div class="d-md-flex gap-2 mt-2">
                                <div class="text-theme cursor-pointer hover-tiltY">Add Certifications</div>
                                <div class="text-theme cursor-pointer hover-tiltY">Update Skills</div>
                                <div class="text-theme cursor-pointer hover-tiltY">Set Learning Goals</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>





            <div class="row g-3 mt-2">
                <div class="col-lg-6">
                    <div class="card h-100 border-0">
                        <div class="card-body">
                            <div class="fw-medium mb-2">
                                Getting Started
                                <span class="badge rounded-pill bg-theme float-end fw-normal small">25% complete</span>
                            </div>

                            <CustomProgress :height="10" :width="25" color-class="bg-theme" />

                            <div class="mt-3">
                                <ul class="list-group list-group-flush">

                                    <li v-for="(line, index) in getStartedTimelines" :key="index"
                                        class="list-group-item border- ps-0 py-3 d-lg-flex gap-2">
                                        <div class="fw-medium col-lg-8">
                                            <span class=" cursor-pointer" @click="line.ischecked = !line.ischecked">
                                                <i v-if="!line.ischecked" class="bi bi-square text-theme me-2"></i>
                                                <i v-else class="bi  bi-check-square-fill text-theme me-2"></i>
                                            </span>
                                            {{ line.title }}
                                            <span v-if="line.percent" class="xsmall text-muted">
                                                ({{ line.percent }})
                                            </span>
                                        </div>

                                        <div class="col">
                                            <div class="float-end small hover-tiltX cursor-pointer text-theme">
                                                {{ line.action }}
                                                <i class="bi bi-arrow-right"></i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div v-if="isMembershipsLoading" class="text-center py-4">
                        Loading memberships...
                    </div>


                    <div v-else class="card h-100 border-0">
                        <div class="card-header bg-transparent border-0 fw-medium">
                            Join Our Community by Subscribing to Our Membership Plan!
                        </div>
                        <div class="card-body">
                            <div class="membership-shell p-3 p-md-4">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div class="small text-muted">Pick a membership type, then select a tier.</div>
                                    <!--<button class="btn btn-sm btn-theme position-relative" type="button">
                                        <i class="bi bi-bag"></i> Cart
                                        <span v-if="cartStore.items.some(i => i.source === 'membership')" class="cart-count">{{ cartItems.length }}</span>
                                    </button>-->
                                </div>

                                <div class="row g-3">
                                    <div v-for="category in membershipCategories" :key="category.id" class="col-12 col-md-6">
                                        <div class="membership-pop h-100">
                                            <div class="membership-pop-index">{{ category.id }}</div>
                                            <div class="fw-semibold">{{ category.title }}</div>
                                            <div class="small text-muted mt-1">{{ category.summary }}</div>
                                            <button class="btn btn-sm membership-ghost-btn mt-3" @click="openCategory(category)">
                                                View Tiers
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="cartStore.items.some(i => i.source === 'membership')" class="cart-preview mt-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="fw-semibold">Selected Memberships</div>
                                        <div class="small text-muted">Total: &pound;{{ cartTotal }}</div>
                                    </div>
                                    <div class="mt-2 d-flex flex-wrap gap-2">
                                        <span v-for="item in cartItems" :key="item.key" class="cart-chip">
                                            {{ item.category }} - {{ item.tier }} (&pound;{{ item.fee }})
                                            <button class="btn btn-sm p-0 border-0 ms-1 remove-chip" @click="removeFromCart(item.key)">
                                                <i class="bi bi-x-circle"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div v-if="activeCategory" class="membership-modal-backdrop" @click.self="closeCategory">
                                <div class="membership-modal">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <div class="small text-uppercase text-muted">Membership {{ activeCategory.id }}</div>
                                            <div class="fw-semibold fs-5">{{ activeCategory.title }}</div>
                                            <div class="small text-muted">{{ activeCategory.summary }}</div>
                                        </div>
                                        <button class="btn btn-sm btn-light border" @click="closeCategory">
                                            <i class="bi bi-x-lg"></i>
                                        </button>
                                    </div>

                                    <div class="membership-tier-list">
                                        <div v-for="tier in activeCategory.tiers" :key="tier.tier" class="tier-card">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="fw-semibold">{{ tier.tier }}</div>
                                                <span class="badge rounded-pill text-bg-light border">&pound;{{ tier.fee }}/yr</span>
                                            </div>
                                            <div class="small text-muted mt-1">{{ tier.targetAudience }}</div>
                                            <div class="small mt-2">{{ tier.benefits }}</div>
                                            <button class="btn btn-sm btn-theme mt-3" @click="addToCart(activeCategory, tier)">
                                                <i class="bi bi-cart-plus"></i> Add to Cart
                                            </button>
                                        </div>
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
import api from '~/api'
import Swal from 'sweetalert2'
import { useCartStore } from '~/stores/cart-store'

definePageMeta({
    middleware: 'account-route-middleware'
})

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()


const userName = ref<string>('User')
const userProfile = ref<any>(null)
const isLoading = ref<boolean>(false)

type MembershipTier = {
    tier: string
    fee: number
    targetAudience: string
    benefits: string
}

type MembershipCategory = {
    id: number
    title: string
    summary: string
    tiers: MembershipTier[]
}

type CartItem = {
    key: string
    category: string
    tier: string
    fee: number
}

const membershipCategories = ref<MembershipCategory[]>([])
const isMembershipsLoading = ref(false)

const fetchMemberships = async () => {
    try {
        isMembershipsLoading.value = true
        const response = await api.membership()
        if (response.data.success) {
            membershipCategories.value = response.data.data.map((m: any) => ({
                id: m.id,
                title: m.name,
                summary: m.description,
                tiers: m.tiers.map((t: any) => ({
                    id: t.id,
                    tier: t.name,
                    fee: Number(t.annual_fee),
                    targetAudience: t.target_audience,
                    benefits: Array.isArray(t.benefits) ? t.benefits.join(', ') : t.benefits
                }))
            }))
        }
    } catch (error) {
        console.error('Failed to fetch memberships:', error)
    } finally {
        isMembershipsLoading.value = false
    }
}

const activeCategory = ref<MembershipCategory | null>(null)
const cartItems = ref<CartItem[]>([])



const openCategory = (category: MembershipCategory) => {
    activeCategory.value = category
}

const closeCategory = () => {
    activeCategory.value = null
}

const addToCart = async (category: MembershipCategory, tier: MembershipTier) => {
    const cartId = tier.id // numeric ID

    const exists = cartStore.items.some(item => item.id === cartId)

    if (exists) {
        await Swal.fire({
            icon: 'info',
            title: 'Already in cart',
            text: `${tier.tier} (${category.title}) is already in your cart.`,
            confirmButtonColor: '#293567'
        })
        return
    }

    try {
        await cartStore.addToCart({
            id: cartId,
            image: '/images/WGRC-logo.png',
            level: tier.tier,
            category: category.title,
            title: `${category.title} - ${tier.tier}`,
            text: tier.targetAudience,
            duration: '1 year membership',
            no_of_lectures: 0,
            price: tier.fee,
            source: 'membership',
            stars: 5,
            rating: 5,
            total_rating: 100,
        })

        await Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            text: `${tier.tier} was added to your cart.`,
            confirmButtonColor: '#293567'
        })
    } catch (error: any) {
        const status = Number(error?.response?.status || 0)
        const message = error?.response?.data?.message || 'Unable to add membership to cart.'
        await Swal.fire({
            icon: status === 409 ? 'info' : 'warning',
            title: status === 409 ? 'Already in cart' : 'Add to cart failed',
            text: message,
            confirmButtonColor: '#293567'
        })
    }
}


// Fetch user profile
const fetchUserProfile = async () => {
    try {
        isLoading.value = true
        const response = await api.profile()
        // Extract user data from response structure: response.data.data.user
        const userData = response.data?.data?.user
        if (userData) {
            userProfile.value = userData
            userName.value = userData.first_name || 'User'
        }

        // Redirect to main dashboard if user is verified
            if (userData.status === 'pending') {
                navigateTo({ path: '/account/dashboard/guest', replace: true })
            }
    } catch (error: any) {
        console.error('Failed to fetch user profile:', error)
        userName.value = 'User'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    // Handle OAuth token from query params
    if (route.query?.token) {
        authStore.loginViaToken(route.query.token as string, true)
    }

    // Fetch user profile data
    fetchUserProfile()

    fetchMemberships()
})

watch(userProfile, (newProfile) => {
    // Redirect based on user status
    if (newProfile?.user?.status === 'pending') {
        navigateTo({ path: '/account/dashboard/guest', replace: true })
    }
}, { immediate: true })

const getStartedTimelines = ref<{ title: string, action: string, percent?: string, ischecked?: Boolean }[]>([
    { title: 'Complete your profile', action: 'Complete profile', percent: '40% complete', ischecked: false },
    { title: 'Join your first event', action: 'Join an event', ischecked: true },
    { title: 'Enroll in a learning module', action: 'Continue Learning', ischecked: true },
    { title: 'Introduce yourself in the forum', action: 'Visit Comunity', ischecked: false },
    { title: 'Connect with a mentor', action: 'Find Mentors', ischecked: true },
])
</script>

<style scoped>
.lock-icon {
    position: absolute;
    right: 0;
    margin: 10px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
}

.membership-shell {
    border-radius: 16px;
    border: 1px solid #dfe8ff;
    background:
        radial-gradient(circle at top right, #ecf5ff 0%, transparent 40%),
        linear-gradient(140deg, #f8fbff 0%, #f0f5ff 100%);
}

.membership-pop {
    position: relative;
    border-radius: 14px;
    border: 1px solid #d9e4ff;
    background: #fff;
    padding: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.membership-pop:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(53, 83, 164, 0.12);
}

.membership-pop-index {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 8px;
    color: #174ea6;
    background-color: #e7f0ff;
}

.membership-ghost-btn {
    background-color: #f1f6ff;
    color: #1f56b8;
    border: 1px solid #cfe0ff;
}

.membership-ghost-btn:hover {
    background-color: #e4efff;
    color: #19489c;
}

.cart-preview {
    border-radius: 12px;
    background-color: #ffffff;
    border: 1px solid #dce7ff;
    padding: 12px;
}

.cart-chip {
    border-radius: 999px;
    border: 1px solid #d7e3ff;
    background: #f8fbff;
    color: #24406d;
    padding: 4px 10px;
    font-size: 12px;
}

.cart-count {
    position: absolute;
    top: -5px;
    right: -6px;
    min-width: 18px;
    height: 18px;
    border-radius: 999px;
    background: #dc3545;
    color: #fff;
    font-size: 11px;
    line-height: 18px;
    text-align: center;
    padding: 0 4px;
}

.remove-chip {
    color: #7f90b4;
}

.remove-chip:hover {
    color: #c0392b;
}

.membership-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(17, 29, 59, 0.45);
    z-index: 1040;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.membership-modal {
    width: min(860px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 16px;
    border: 1px solid #d7e3ff;
    background: #fff;
    padding: 18px;
    box-shadow: 0 20px 40px rgba(17, 29, 59, 0.22);
}

.membership-tier-list {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 10px;
}

.tier-card {
    border-radius: 12px;
    border: 1px solid #deebff;
    background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
    padding: 12px;
}

@media (min-width: 768px) {
    .membership-tier-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
</style>
