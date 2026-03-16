<template>
    <NuxtLayout name="account-layout">
        <div class="container py-3 members-page">
            <div class="members-hero p-4 p-md-5 mb-4">
                <div class="d-lg-flex justify-content-between align-items-end gap-3">
                    <div>
                        <div class="small text-uppercase fw-semibold hero-kicker mb-1">Members Hub</div>
                        <h3 class="fw-bold mb-2">Connect with verified WGRCFP members</h3>
                        <p class="mb-0">Find peers, start private circles, and build meaningful professional connections.</p>
                    </div>
                    <div class="d-flex gap-2 mt-3 mt-lg-0 flex-wrap">
                        <button class="btn btn-light btn-sm border" @click="refreshAll">
                            <i class="bi bi-arrow-clockwise me-1"></i> Refresh
                        </button>
                        <button v-if="hasActiveMembership" class="btn btn-theme btn-sm" @click="showCreateForum = true">
                            <i class="bi bi-plus-circle me-1"></i> Create Forum
                        </button>
                        <NuxtLink v-if="hasActiveMembership" to="/account/forum" class="btn btn-outline-theme btn-sm">
                            Visit Forum Hub
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div v-if="membershipStatusLoading" class="card border-0">
                <div class="card-body d-flex align-items-center justify-content-center text-muted">
                    Checking membership status...
                </div>
            </div>

            <div v-else-if="hasActiveMembership" class="d-grid gap-3">
                <div class="row g-3">
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">My Forums</div>
                            <div class="metric-value">{{ joinedForums.length }}</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Total Members</div>
                            <div class="metric-value">{{ totalMembersCount }}</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Pending Invites</div>
                            <div class="metric-value">{{ pendingInvites.length }}</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Unread Alerts</div>
                            <div class="metric-value">{{ unreadCount }}</div>
                        </div>
                    </div>
                </div>

                <div class="card border-0">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                            <div>
                                <div class="fw-semibold">Member Directory</div>
                                <div class="small text-muted">Browse members inside your forums.</div>
                            </div>
                            <div class="d-flex gap-2 flex-wrap">
                                <select v-model="selectedForumId" class="form-select form-select-sm forum-select">
                                    <option disabled value="">Select a forum</option>
                                    <option v-for="forum in joinedForums" :key="forum.id" :value="Number(forum.id)">
                                        {{ forum.title }}
                                    </option>
                                </select>
                                <input v-model="memberSearch" class="form-control form-control-sm search-input" placeholder="Search members">
                            </div>
                        </div>

                        <div v-if="membersLoading" class="text-center py-4">
                            <div class="spinner-border text-theme"></div>
                        </div>
                        <div v-else-if="!selectedForumId" class="small text-muted py-4">
                            Select a forum to view members.
                        </div>
                        <div v-else-if="filteredMembers.length === 0" class="small text-muted py-4">
                            No members found for this forum.
                        </div>
                        <div v-else class="row g-3 mt-1">
                            <div v-for="member in filteredMembers" :key="member.id" class="col-md-6 col-xl-4">
                                <div class="member-card h-100">
                                    <div class="d-flex justify-content-between align-items-start gap-3">
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="avatar-circle">{{ initials(member) }}</div>
                                            <div>
                                                <div class="fw-semibold">{{ member.first_name }} {{ member.last_name }}</div>
                                                <div class="small text-muted">{{ member.roleLabel }}</div>
                                            </div>
                                        </div>
                                        <span class="badge rounded-pill text-bg-light border">{{ member.forumRole }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border-0">
                    <div class="card-body">
                        <div class="fw-semibold mb-2">My Forums</div>
                        <div v-if="joinedForums.length === 0" class="small text-muted">
                            You are not part of any forum yet. Create one to start inviting members.
                        </div>
                        <div v-else class="row g-3">
                            <div v-for="forum in joinedForums" :key="forum.id" class="col-md-6 col-xl-4">
                                <div class="forum-card h-100">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span class="badge bg-theme-subtle text-theme">{{ forum.category || 'General' }}</span>
                                        <span class="badge" :class="forum.type === 'public' ? 'text-bg-success' : 'text-bg-warning'">{{ forum.type }}</span>
                                    </div>
                                    <div class="fw-semibold mb-1">{{ forum.title }}</div>
                                    <p class="small text-muted line-clamp-3 mb-2">{{ forum.description || 'No description provided.' }}</p>
                                    <div class="small d-flex flex-wrap gap-2 mb-3">
                                        <span class="tiny-pill">{{ forum.members_count || 0 }} members</span>
                                        <span class="tiny-pill">{{ forum.threads_count || 0 }} threads</span>
                                        <span class="tiny-pill text-capitalize">{{ forum.status }}</span>
                                    </div>
                                    <div class="d-flex gap-2 mt-auto">
                                        <NuxtLink :to="`/account/forum/${forum.id}`" class="btn btn-theme btn-sm">Open</NuxtLink>
                                        <button class="btn btn-outline-theme btn-sm" @click="leaveForum(forum.id)">Leave</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="card border-0">
                <div class="card-header bg-transparent border-0 fw-semibold">
                    Unlock the Members Community
                </div>
                <div class="card-body">
                    <div class="row g-3 align-items-center mb-3">
                        <div class="col-lg-7">
                            <div class="membership-banner p-4">
                                <div class="fw-semibold fs-5 mb-2">Choose the membership tier that fits your goals</div>
                                <div class="small text-muted">
                                    Get access to member-only forums, curated networking, leadership opportunities, and more.
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="membership-stats p-4">
                                <div class="stat-line">
                                    <span class="small text-muted">Status</span>
                                    <span class="fw-semibold text-danger">Not a member</span>
                                </div>
                                <div class="stat-line">
                                    <span class="small text-muted">Access</span>
                                    <span class="fw-semibold">Member directory locked</span>
                                </div>
                                <div class="stat-line">
                                    <span class="small text-muted">Next step</span>
                                    <span class="fw-semibold">Pick a tier below</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="isMembershipsLoading" class="text-center py-4 text-muted">
                        Loading memberships...
                    </div>
                    <div v-else class="membership-shell p-3 p-md-4">
                        <div class="small text-muted mb-3">Pick a membership type, then select a tier.</div>
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
                                    <button class="btn btn-sm btn-theme mt-3" @click="addMembershipToCart(activeCategory, tier)">
                                        <i class="bi bi-cart-plus"></i> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showCreateForum" class="modal-backdrop-custom" @click.self="showCreateForum = false">
                <div class="modal-card-custom">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="fw-semibold">Create Member Forum</div>
                        <button class="btn btn-sm btn-light border" @click="showCreateForum = false">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div class="row g-2">
                        <div class="col-12">
                            <label class="form-label small">Title</label>
                            <input v-model="createForm.title" class="form-control form-control-sm">
                        </div>
                        <div class="col-12">
                            <label class="form-label small">Description</label>
                            <textarea v-model="createForm.description" class="form-control form-control-sm" rows="3"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small">Category</label>
                            <input v-model="createForm.category" class="form-control form-control-sm">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small">Type</label>
                            <select v-model="createForm.type" class="form-select form-select-sm">
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small">Tags (comma separated)</label>
                            <input v-model="createForm.tagsText" class="form-control form-control-sm" placeholder="AML, ESG, Leadership">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small">Region (optional)</label>
                            <select v-model="createForm.region" class="form-select form-select-sm">
                                <option value="">Select region/timezone</option>
                                <option v-for="option in regionOptions" :key="option" :value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                        <div class="col-12">
                            <div class="form-check">
                                <input id="region_based" v-model="createForm.region_based" class="form-check-input" type="checkbox">
                                <label class="form-check-label small" for="region_based">Enable region-based visibility</label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2 mt-3">
                        <button class="btn btn-light border btn-sm" @click="showCreateForum = false">Cancel</button>
                        <button class="btn btn-theme btn-sm" :disabled="creatingForum" @click="createForum">
                            <span v-if="creatingForum" class="spinner-border spinner-border-sm me-1"></span>Create
                        </button>
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
import { useAccountCache } from '~/composables/useAccountCache'

definePageMeta({
    middleware: 'account-route-middleware',
})

type MembershipTier = {
    id: number
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

const cartStore = useCartStore()
const { getCached, setCached } = useAccountCache()

const membershipStatusLoading = ref(false)
const hasActiveMembership = ref<boolean | null>(null)
const membershipCategories = ref<MembershipCategory[]>([])
const isMembershipsLoading = ref(false)
const activeCategory = ref<MembershipCategory | null>(null)

const joinedForums = ref<any[]>([])
const pendingInvites = ref<any[]>([])
const unreadCount = ref(0)
const membersLoading = ref(false)
const selectedForumId = ref<number | ''>('')
const forumMembers = ref<any[]>([])
const memberSearch = ref('')
const showCreateForum = ref(false)
const creatingForum = ref(false)
const timezoneRows = ref<any[]>([])

const createForm = reactive({
    title: '',
    description: '',
    category: '',
    type: 'public',
    tagsText: '',
    region_based: false,
    region: '',
})

const totalMembersCount = computed(() => {
    return joinedForums.value.reduce((sum, forum) => sum + Number(forum.members_count || 0), 0)
})

const regionOptions = computed(() => {
    const values = timezoneRows.value
        .map((row: any) => row?.timezone || row?.name || row?.label || '')
        .filter((value: string) => Boolean(value))

    return Array.from(new Set(values))
})

const filteredMembers = computed(() => {
    const query = memberSearch.value.trim().toLowerCase()
    if (!query) return forumMembers.value
    return forumMembers.value.filter((member: any) => {
        const fullName = `${member.first_name || ''} ${member.last_name || ''}`.toLowerCase()
        return fullName.includes(query)
    })
})

const initials = (member: any) => {
    const first = String(member?.first_name || '').trim().charAt(0)
    const last = String(member?.last_name || '').trim().charAt(0)
    return `${first}${last}`.toUpperCase() || 'WG'
}

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
        setCached('account-membership-status', hasActiveMembership.value, 180000)
    } catch (error) {
        hasActiveMembership.value = false
    } finally {
        membershipStatusLoading.value = false
    }
}

const fetchMemberships = async (force = false) => {
    try {
        isMembershipsLoading.value = true
        if (!force) {
            const cached = getCached<MembershipCategory[]>('account-memberships')
            if (cached) {
                membershipCategories.value = cached
                return
            }
        }
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
            setCached('account-memberships', membershipCategories.value, 300000)
        }
    } catch (error) {
        console.error('Failed to fetch memberships:', error)
    } finally {
        isMembershipsLoading.value = false
    }
}

const openCategory = (category: MembershipCategory) => {
    activeCategory.value = category
}

const closeCategory = () => {
    activeCategory.value = null
}

const addMembershipToCart = async (category: MembershipCategory, tier: MembershipTier) => {
    const cartId = tier.id
    const exists = cartStore.items.some(item => item.source === 'membership' && Number(item.id) === cartId)

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

const loadForums = async () => {
    try {
        const mineRes = await api.forumList({ mine: 1 })
        const mine = mineRes?.data?.data?.data || []
        joinedForums.value = mine
        if (!selectedForumId.value && joinedForums.value.length) {
            selectedForumId.value = Number(joinedForums.value[0].id)
        }
    } catch (error) {
        joinedForums.value = []
    }
}

const loadInvitations = async () => {
    try {
        const res = await api.forumInvitations()
        pendingInvites.value = res?.data?.data || []
    } catch (error) {
        pendingInvites.value = []
    }
}

const loadNotifications = async () => {
    try {
        const res = await api.forumNotifications()
        unreadCount.value = Number(res?.data?.data?.unread_count || 0)
    } catch (error) {
        unreadCount.value = 0
    }
}

const loadTimezones = async () => {
    try {
        const res = await api.timezone()
        timezoneRows.value = res?.data?.data || []
    } catch (error) {
        timezoneRows.value = []
    }
}

const loadForumMembers = async (forumId: number | '') => {
    if (!forumId) {
        forumMembers.value = []
        return
    }
    membersLoading.value = true
    try {
        const res = await api.forumDetails(forumId)
        const forum = res?.data?.data || {}
        const memberships = forum?.memberships || []
        forumMembers.value = memberships.map((row: any) => ({
            id: row.user?.id || row.id,
            first_name: row.user?.first_name || '',
            last_name: row.user?.last_name || '',
            forumRole: row.role || 'member',
            roleLabel: row.role === 'creator' ? 'Forum Creator' : row.role === 'moderator' ? 'Moderator' : 'Member',
        }))
    } catch (error) {
        forumMembers.value = []
    } finally {
        membersLoading.value = false
    }
}

const leaveForum = async (forumId: number) => {
    try {
        await api.forumLeave(forumId)
        await loadForums()
        await Swal.fire({
            icon: 'success',
            title: 'Left forum',
            text: 'You have left this forum.',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Leave failed',
            text: error?.response?.data?.message || 'Unable to leave forum.',
            confirmButtonColor: '#293567',
        })
    }
}

const createForum = async () => {
    if (!createForm.title.trim()) {
        await Swal.fire({
            icon: 'info',
            title: 'Title required',
            text: 'Please provide a forum title.',
            confirmButtonColor: '#293567',
        })
        return
    }

    creatingForum.value = true
    try {
        const payload = {
            title: createForm.title.trim(),
            description: createForm.description.trim(),
            category: createForm.category.trim(),
            type: createForm.type,
            tags: createForm.tagsText
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean),
            region_based: createForm.region_based,
            region: createForm.region || null,
        }
        await api.forumCreate(payload)
        showCreateForum.value = false
        Object.assign(createForm, {
            title: '',
            description: '',
            category: '',
            type: 'public',
            tagsText: '',
            region_based: false,
            region: '',
        })
        await loadForums()
        await Swal.fire({
            icon: 'success',
            title: 'Forum created',
            text: 'Your new member forum is ready.',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Create failed',
            text: error?.response?.data?.message || 'Unable to create forum.',
            confirmButtonColor: '#293567',
        })
    } finally {
        creatingForum.value = false
    }
}

const refreshAll = async () => {
    await fetchMembershipStatus(true)
    if (hasActiveMembership.value === false) {
        await fetchMemberships(true)
        return
    }
    await Promise.all([loadForums(), loadInvitations(), loadNotifications(), loadTimezones()])
}

watch(selectedForumId, (value) => {
    loadForumMembers(value)
})

onMounted(async () => {
    await fetchMembershipStatus()
    if (hasActiveMembership.value === false) {
        await fetchMemberships()
        return
    }
    await Promise.all([loadForums(), loadInvitations(), loadNotifications(), loadTimezones()])
})
</script>

<style scoped>
.members-page {
    --members-primary: #293567;
    --members-accent: #b03436;
}

.members-hero {
    border-radius: 18px;
    color: #f4f7ff;
    background:
        radial-gradient(circle at top right, rgba(176, 52, 54, 0.38) 0%, transparent 45%),
        linear-gradient(145deg, #293567 0%, #394a87 55%, #24315f 100%);
}

.hero-kicker {
    color: #ffd8d8;
    letter-spacing: 0.05em;
}

.metric-card {
    background: #fff;
    border: 1px solid #e5eaf8;
    border-radius: 14px;
    padding: 14px;
}

.metric-title {
    color: #6d7695;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.metric-value {
    font-size: 26px;
    line-height: 1.1;
    font-weight: 700;
    color: var(--members-primary);
    margin-top: 8px;
}

.search-input {
    width: 220px;
}

.forum-select {
    min-width: 220px;
}

.member-card {
    border-radius: 14px;
    border: 1px solid #e3e9fb;
    background: #fff;
    padding: 14px;
}

.avatar-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2f3f83 0%, #b03436 100%);
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.forum-card {
    display: flex;
    flex-direction: column;
    border-radius: 14px;
    border: 1px solid #e5eaf8;
    background: #ffffff;
    padding: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.forum-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(31, 48, 108, 0.1);
}

.tiny-pill {
    border-radius: 999px;
    border: 1px solid #e1e8fb;
    background: #f8faff;
    padding: 2px 9px;
    font-size: 11px;
    color: #56608a;
}

.membership-banner {
    border-radius: 16px;
    border: 1px solid #f1dcdc;
    background: linear-gradient(135deg, rgba(176, 52, 54, 0.08), rgba(41, 53, 103, 0.06));
}

.membership-stats {
    border-radius: 16px;
    border: 1px solid #e2e9fb;
    background: #fff;
}

.stat-line {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
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

.modal-backdrop-custom {
    position: fixed;
    inset: 0;
    background: rgba(17, 29, 59, 0.45);
    z-index: 1040;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.modal-card-custom {
    width: min(700px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 16px;
    border: 1px solid #d7e3ff;
    background: #fff;
    padding: 18px;
    box-shadow: 0 20px 40px rgba(17, 29, 59, 0.22);
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.bg-theme-subtle {
    background-color: #e9efff;
}

.btn-outline-theme {
    border: 1px solid #c4d2ff;
    color: #2f4384;
}

.btn-outline-theme:hover {
    background: #edf2ff;
    color: #24386f;
}

@media (min-width: 768px) {
    .membership-tier-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 576px) {
    .search-input,
    .forum-select {
        width: 100%;
    }
}
</style>
