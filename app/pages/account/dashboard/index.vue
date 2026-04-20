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
                                            <span class="cursor-pointer" @click="line.ischecked = !line.ischecked">
                                                <i v-if="!line.ischecked" class="bi bi-square text-theme me-2"></i>
                                                <i v-else class="bi  bi-check-square-fill text-theme me-2"></i>
                                            </span>
                                            <span class="cursor-pointer hover-tiltX" @click="goTimeline(line)">
                                                {{ line.title }}
                                            </span>
                                            <span v-if="line.percent" class="xsmall text-muted">
                                                ({{ line.percent }})
                                            </span>
                                        </div>

                                        <div class="col">
                                            <NuxtLink
                                                v-if="line.route"
                                                :to="line.route"
                                                class="float-end small hover-tiltX cursor-pointer text-theme text-decoration-none"
                                            >
                                                {{ line.action }}
                                                <i class="bi bi-arrow-right"></i>
                                            </NuxtLink>
                                            <div
                                                v-else
                                                class="float-end small hover-tiltX cursor-pointer text-theme"
                                                @click="goTimeline(line)"
                                            >
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
                    <div v-if="membershipStatusLoading" class="card h-100 border-0">
                        <div class="card-body d-flex align-items-center justify-content-center text-muted">
                            Checking membership status...
                        </div>
                    </div>

                    <div v-else-if="showMembershipPending" class="card h-100 border-0">
                        <div class="card-header bg-transparent border-0 fw-medium">
                            Membership Approval In Progress
                        </div>
                        <div class="card-body">
                            <div class="membership-wait p-4">
                                <div class="d-flex flex-column flex-md-row align-items-start gap-3">
                                    <div class="wait-icon">
                                        <i class="bi bi-hourglass-split"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="fw-semibold fs-5 mb-2">Hang tight — we’re activating your membership</div>
                                        <div class="text-muted">
                                            Your subscription payment is confirmed. An admin is reviewing and activating your membership.
                                            You’ll get access as soon as the approval is complete.
                                        </div>
                                        <div class="d-flex flex-wrap gap-2 mt-3">
                                            <button class="btn btn-outline-theme btn-sm" @click="fetchMembershipStatus(true)">
                                                <i class="bi bi-arrow-clockwise me-1"></i> Refresh Status
                                            </button>
                                            <NuxtLink to="/account/members" class="btn btn-theme btn-sm">
                                                Explore Member Benefits
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                                <div class="wait-steps mt-4">
                                    <div class="step-item">
                                        <span class="step-dot"></span>
                                        Payment received
                                    </div>
                                    <div class="step-item active">
                                        <span class="step-dot"></span>
                                        Admin approval in progress
                                    </div>
                                    <div class="step-item">
                                        <span class="step-dot"></span>
                                        Membership fully activated
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="showMembershipPrompt" class="card h-100 border-0">
                        <div class="card-header bg-transparent border-0 fw-medium">
                            Unlock the Member Circle
                        </div>
                        <div class="card-body">
                            <div class="membership-cta p-4">
                                <div class="d-flex flex-column flex-md-row align-items-start gap-3">
                                    <div class="cta-icon">
                                        <i class="bi bi-people-fill mx-2"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                    <div class="fw-semibold fs-5 mb-2">Step into the room where decisions and opportunities happen</div>
                                    <div class="text-muted">
                                        Membership gives you direct access to verified professionals, private forums, and leadership openings.
                                        Join the WGRCFP member circle and be part of the network shaping the future of GRC and financial crime prevention.
                                    </div>
                                    <div class="d-flex flex-wrap gap-2 mt-3">
                                        <NuxtLink to="/account/members" class="btn btn-theme btn-sm">
                                            See Membership Options
                                        </NuxtLink>
                                        <NuxtLink to="/membership" class="btn btn-outline-theme btn-sm">
                                            Explore Benefits
                                        </NuxtLink>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="card h-100 border-0">
                        <div class="card-header bg-transparent border-0 fw-medium">
                            Recommended for You
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="card border-0"
                                        :style="{ backgroundColor: templateStore.themeColors.accountBg }">
                                        <div class="card-body">
                                            <span class="badge text-danger bg-danger-subtle fw-normal">
                                                <i class="bi bi-calendar3"></i> Upcoming Event
                                            </span>
                                            <span class="float-end">Nov 8</span>

                                            <div class="mt-3">
                                                <div class="fw-medium">Women Leading in Compliance</div>
                                                <p class="small">
                                                    Join industry leaders as they share insights on navigating
                                                    compliance
                                                    challenges and building successful careers in GRC. Featuring Sarah
                                                    Chen, VP
                                                    of Compliance at TechCorp.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="card border-0"
                                        :style="{ backgroundColor: templateStore.themeColors.accountBg }">
                                        <div class="card-body">
                                            <span class="badge text-success bg-success-subtle fw-normal">
                                                <i class="bi bi-book"></i> Beginner
                                            </span>
                                            <span class="float-end">2h 30m</span>

                                            <div class="mt-3">
                                                <div class="fw-medium">Introduction to GRC</div>
                                                <p class="small">
                                                    Master the fundamentals of Governance, Risk, and Compliance. Perfect
                                                    for those new to the field or looking to strengthen their
                                                    foundation.
                                                </p>

                                                <div class="fw-medium mb-2">
                                                    Progess
                                                    <span class=" float-end fw-normal small">25%
                                                        complete</span>
                                                </div>

                                                <CustomProgress :height="10" :width="25" color-class="bg-theme" />

                                            </div>

                                            <button class="btn btn-theme w-100 mt-4">
                                                <i class="bi bi-play-circle"></i> Continue Learning
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
import { useAccountCache } from '~/composables/useAccountCache'

definePageMeta({
    middleware: 'account-route-middleware'
})

const route = useRoute()
const templateStore = useTemplateStore()
const authStore = useAuthStore()
const { getCached, setCached } = useAccountCache()

const userName = ref<string>('User')
const userProfile = ref<any>(null)
const isLoading = ref<boolean>(false)
const membershipStatusLoading = ref(false)
const hasActiveMembership = ref<boolean | null>(null)
const membershipApprovalStatus = ref<'approved' | 'pending' | 'none'>('none')

const showMembershipPrompt = computed(() => hasActiveMembership.value === false)
const showMembershipPending = computed(() => hasActiveMembership.value === false && membershipApprovalStatus.value === 'pending')

const fetchMembershipStatus = async (force = false) => {
    try {
        membershipStatusLoading.value = true
        if (!force) {
            const cached = getCached<boolean>('account-membership-status')
            if (cached !== null) {
                hasActiveMembership.value = cached
                return
            }
        }
        const response = await api.myMembershipStatus()
        const data = response?.data?.data || {}
        hasActiveMembership.value = Boolean(data?.is_active)
        membershipApprovalStatus.value = data?.has_membership
            ? (data?.is_approved ? 'approved' : 'pending')
            : 'none'
        setCached('account-membership-status', hasActiveMembership.value, 180000)
    } catch (error) {
        hasActiveMembership.value = false
        membershipApprovalStatus.value = 'none'
    } finally {
        membershipStatusLoading.value = false
    }
}


// Fetch user profile
const fetchUserProfile = async (force = false) => {
    try {
        isLoading.value = true
        if (!force) {
            const cached = getCached<any>('account-profile')
            if (cached) {
                userProfile.value = cached
                userName.value = cached.first_name || 'User'
                if (cached.status === 'pending') {
                    navigateTo({ path: '/account/dashboard/guest', replace: true })
                }
                return
            }
        }
        const response = await api.profile()
        // Extract user data from response structure: response.data.data.user
        const userData = response.data?.data?.user
        if (userData) {
            userProfile.value = userData
            userName.value = userData.first_name || 'User'
            setCached('account-profile', userData, 180000)
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

    fetchMembershipStatus()
})

watch(userProfile, (newProfile) => {
    // Redirect based on user status
    if (newProfile?.user?.status === 'pending') {
        navigateTo({ path: '/account/dashboard/guest', replace: true })
    }
}, { immediate: true })

const waitingEvents = ref<{ img: string, type: string, title: string, text: string }[]>([
    { img: '/images/account/dashboard/women_in_leadership.png', type: 'Upcoming Event', title: 'Women in Leadership', text: 'Join industry leaders for insights on advancing your career in governance, risk, and compliance.', },
    { img: '/images/account/dashboard/grc_fundamentals.png', type: 'Featured Course', title: 'GRC Fundamentals', text: 'Master the essential concepts of governance risk management, and compliance in this detailed course', },
])

const getStartedTimelines = ref<{ title: string, action: string, percent?: string, ischecked?: Boolean, route?: string }[]>([
    { title: 'Complete your profile', action: 'Complete profile', percent: '40% complete', ischecked: false, route: '/account/user' },
    { title: 'Join your first event', action: 'Join an event', ischecked: true, route: '/account/events' },
    { title: 'Enroll in a learning module', action: 'Continue Learning', ischecked: true, route: '/account/learning-center' },
    { title: 'Introduce yourself in the forum', action: 'Visit Community', ischecked: false, route: '/account/forum' },
    { title: 'Connect with a mentor', action: 'Find Mentors', ischecked: true, route: '/account/members' },
])

const goTimeline = async (line: { route?: string }) => {
    if (!line.route) return
    await navigateTo(line.route)
}
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

.membership-cta {
    border-radius: 16px;
    border: 1px solid #dfe8ff;
    background:
        radial-gradient(circle at top right, #f4f7ff 0%, transparent 45%),
        linear-gradient(140deg, #ffffff 0%, #f6f9ff 100%);
}

.membership-wait {
    border-radius: 18px;
    border: 1px dashed #d4def7;
    background:
        radial-gradient(circle at top right, rgba(176, 52, 54, 0.16) 0%, transparent 45%),
        linear-gradient(140deg, #ffffff 0%, #f7f9ff 100%);
}

.wait-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, #293567 0%, #b03436 100%);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.wait-steps {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #5b647b;
    font-size: 13px;
}

.step-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.step-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d2dbf4;
}

.step-item.active .step-dot {
    background: #b03436;
}

.cta-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, #293567 0%, #b03436 100%);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
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
