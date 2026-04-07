<template>
    <NuxtLayout name="account-layout">
        <div class="container py-3 forum-page">
            <div class="forum-hero p-4 p-md-5 mb-4">
                <div class="d-lg-flex justify-content-between align-items-end gap-3">
                    <div>
                        <div class="small text-uppercase fw-semibold hero-kicker mb-1">Forum Hub</div>
                        <h3 class="fw-bold mb-2">Collaborate, discuss, and build impact together</h3>
                        <p class="mb-0">Join public communities, accept private invites, and participate in structured discussions.</p>
                    </div>
                    <div class="d-flex gap-2 mt-3 mt-lg-0">
                        <button class="btn btn-light btn-sm border" @click="loadAll">
                            <i class="bi bi-arrow-clockwise me-1"></i> Refresh
                        </button>
                    </div>
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-6 col-md-3">
                    <div class="metric-card h-100">
                        <div class="metric-title">Joined Forums</div>
                        <div class="metric-value">{{ joinedForums.length }}</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card h-100">
                        <div class="metric-title">Discover Forums</div>
                        <div class="metric-value">{{ discoverForums.length }}</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card h-100">
                        <div class="metric-title">Pending Requests</div>
                        <div class="metric-value">{{ pendingRequests.length }}</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card h-100">
                        <div class="metric-title">Unread Alerts</div>
                        <div class="metric-value">{{ unreadCount }}</div>
                    </div>
                </div>
            </div>

            <div class="card border-0 mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                        <div class="fw-semibold">My Forums</div>
                        <input v-model="searchText" class="form-control form-control-sm search-input" placeholder="Search forums by title/category">
                    </div>
                    <div v-if="loading" class="text-center py-4">
                        <div class="spinner-border text-theme"></div>
                    </div>
                    <div v-else-if="joinedForums.length === 0" class="small text-muted py-3">You have not joined any forum yet.</div>
                    <div v-else class="row g-3 mt-1">
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

            <div class="card border-0 mb-4">
                <div class="card-body">
                    <div class="fw-semibold mb-2">Discover Forums</div>
                    <div v-if="discoverForums.length === 0" class="small text-muted">No forums available right now.</div>
                    <div v-else class="row g-3">
                        <div v-for="forum in discoverForums" :key="forum.id" class="col-md-6 col-xl-4">
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
                                </div>
                                <div class="d-flex gap-2 mt-auto">
                                    <button
                                        class="btn btn-theme btn-sm"
                                        :disabled="isPendingRequest(forum.id)"
                                        @click="joinForum(forum.id)"
                                    >
                                        {{ isPendingRequest(forum.id) ? 'Pending Approval' : 'Request to Join' }}
                                    </button>
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

definePageMeta({
    middleware: 'account-route-middleware',
})

const loading = ref(false)
const searchText = ref('')
const joinedForums = ref<any[]>([])
const discoverForums = ref<any[]>([])
const unreadCount = ref(0)
const pendingRequests = ref<number[]>([])

let forumSearchTimer: number | null = null

const isPendingRequest = (forumId: number) => pendingRequests.value.includes(Number(forumId))

const loadForums = async () => {
    loading.value = true
    try {
        const query = searchText.value.trim()
        const [mineRes, allRes] = await Promise.all([
            api.forumList(query ? { mine: 1, q: query } : { mine: 1 }),
            api.forumList(query ? { q: query } : {}),
        ])

        const mine = mineRes?.data?.data?.data || []
        const all = allRes?.data?.data?.data || []

        joinedForums.value = mine
        const joinedIds = new Set(mine.map((f: any) => Number(f.id)))
        discoverForums.value = all.filter((forum: any) => !joinedIds.has(Number(forum.id)))
        pendingRequests.value = all
            .filter((forum: any) => Number(forum?.has_pending_request || 0) > 0)
            .map((forum: any) => Number(forum.id))
    } catch (error: any) {
        joinedForums.value = []
        discoverForums.value = []
        pendingRequests.value = []
        await Swal.fire({
            icon: 'error',
            title: 'Unable to load forums',
            text: error?.response?.data?.message || 'Please try again later.',
            confirmButtonColor: '#293567',
        })
    } finally {
        loading.value = false
    }
}

watch(searchText, () => {
    if (forumSearchTimer) window.clearTimeout(forumSearchTimer)
    forumSearchTimer = window.setTimeout(() => {
        loadForums()
    }, 400)
})

const loadNotifications = async () => {
    try {
        const res = await api.forumNotifications()
        unreadCount.value = Number(res?.data?.data?.unread_count || 0)
    } catch (error) {
        unreadCount.value = 0
    }
}

const loadAll = async () => {
    await Promise.all([loadForums(), loadNotifications()])
}

const joinForum = async (forumId: number) => {
    try {
        const res = await api.forumJoin(forumId)
        const status = res?.data?.data?.status
        if (status === 'pending' && !pendingRequests.value.includes(Number(forumId))) {
            pendingRequests.value.push(Number(forumId))
        }
        await loadForums()
        await Swal.fire({
            icon: 'success',
            title: status === 'pending' ? 'Request sent' : 'Joined forum',
            text: status === 'pending'
                ? 'Your request has been sent for approval. You will be notified once approved.'
                : 'You can now participate in discussions.',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Join failed',
            text: error?.response?.data?.message || 'Unable to join forum right now.',
            confirmButtonColor: '#293567',
        })
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

onMounted(loadAll)
</script>

<style scoped>
.forum-page {
    --forum-primary: #293567;
    --forum-accent: #b03436;
}

.forum-hero {
    border-radius: 18px;
    color: #f4f7ff;
    background:
        radial-gradient(circle at top right, rgba(176, 52, 54, 0.35) 0%, transparent 42%),
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
    color: var(--forum-primary);
    margin-top: 8px;
}

.search-input {
    width: min(280px, 100%);
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

</style>
