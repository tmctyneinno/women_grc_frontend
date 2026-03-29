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
                        <button class="btn btn-theme btn-sm" @click="showCreate = true">
                            <i class="bi bi-plus-circle me-1"></i> Create Forum
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

            <div class="card border-0 mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                        <div class="fw-semibold">My Forums</div>
                        <input v-model="searchText" class="form-control form-control-sm search-input" placeholder="Search forums by title/category">
                    </div>
                    <div v-if="loading" class="text-center py-4">
                        <div class="spinner-border text-theme"></div>
                    </div>
                    <div v-else-if="filteredJoined.length === 0" class="small text-muted py-3">You have not joined any forum yet.</div>
                    <div v-else class="row g-3 mt-1">
                        <div v-for="forum in filteredJoined" :key="forum.id" class="col-md-6 col-xl-4">
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
                                    <button v-if="forum.type === 'public'" class="btn btn-theme btn-sm" @click="joinForum(forum.id)">Join Forum</button>
                                    <button v-else class="btn btn-outline-theme btn-sm" disabled>Invite Only</button>
                                    <NuxtLink :to="`/account/forum/${forum.id}`" class="btn btn-light border btn-sm">Preview</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card border-0">
                <div class="card-body">
                    <div class="fw-semibold mb-2">Invitations</div>
                    <div v-if="pendingInvites.length === 0" class="small text-muted">No pending invitations.</div>
                    <div v-else class="d-grid gap-2">
                        <div v-for="invite in pendingInvites" :key="invite.id" class="invite-row">
                            <div>
                                <div class="fw-medium">{{ invite.forum?.title }}</div>
                                <div class="small text-muted">Invited by {{ invite.inviter?.first_name }} {{ invite.inviter?.last_name }}</div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-theme btn-sm" @click="respondInvite(invite.id, 'accept')">Accept</button>
                                <button class="btn btn-light border btn-sm" @click="respondInvite(invite.id, 'decline')">Decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showCreate" class="modal-backdrop-custom" @click.self="showCreate = false">
                <div class="modal-card-custom">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="fw-semibold">Create Forum</div>
                        <button class="btn btn-sm btn-light border" @click="showCreate = false">
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
                        <button class="btn btn-light border btn-sm" @click="showCreate = false">Cancel</button>
                        <button class="btn btn-theme btn-sm" :disabled="creating" @click="createForum">
                            <span v-if="creating" class="spinner-border spinner-border-sm me-1"></span>Create
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

definePageMeta({
    middleware: 'account-route-middleware',
})

const loading = ref(false)
const creating = ref(false)
const showCreate = ref(false)
const searchText = ref('')
const joinedForums = ref<any[]>([])
const discoverForums = ref<any[]>([])
const invitations = ref<any[]>([])
const unreadCount = ref(0)
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

const filteredJoined = computed(() => {
    if (!searchText.value.trim()) return joinedForums.value
    const q = searchText.value.toLowerCase()
    return joinedForums.value.filter((forum) =>
        `${forum.title} ${forum.category || ''}`.toLowerCase().includes(q)
    )
})

const pendingInvites = computed(() => invitations.value.filter((invite) => invite.status === 'pending'))
const regionOptions = computed(() => {
    const values = timezoneRows.value
        .map((row: any) => row?.timezone || row?.name || row?.label || '')
        .filter((value: string) => Boolean(value))

    return Array.from(new Set(values))
})

const loadForums = async () => {
    loading.value = true
    try {
        const [mineRes, allRes] = await Promise.all([
            api.forumList({ mine: 1 }),
            api.forumList(),
        ])

        const mine = mineRes?.data?.data?.data || []
        const all = allRes?.data?.data?.data || []

        joinedForums.value = mine
        const joinedIds = new Set(mine.map((f: any) => Number(f.id)))
        discoverForums.value = all.filter((forum: any) => !joinedIds.has(Number(forum.id)))
    } catch (error: any) {
        joinedForums.value = []
        discoverForums.value = []
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

const loadInvitations = async () => {
    try {
        const res = await api.forumInvitations()
        invitations.value = res?.data?.data || []
    } catch (error) {
        invitations.value = []
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

const loadAll = async () => {
    await Promise.all([loadForums(), loadInvitations(), loadNotifications(), loadTimezones()])
}

const joinForum = async (forumId: number) => {
    try {
        await api.forumJoin(forumId)
        await loadForums()
        await Swal.fire({
            icon: 'success',
            title: 'Joined forum',
            text: 'You can now participate in discussions.',
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

const respondInvite = async (invitationId: number, action: 'accept' | 'decline') => {
    try {
        await api.forumRespondInvitation(invitationId, action)
        await loadAll()
        await Swal.fire({
            icon: 'success',
            title: action === 'accept' ? 'Invitation accepted' : 'Invitation declined',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Action failed',
            text: error?.response?.data?.message || 'Unable to process invitation.',
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

    try {
        creating.value = true
        const tags = createForm.tagsText
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)

        await api.forumCreate({
            title: createForm.title,
            description: createForm.description,
            category: createForm.category,
            type: createForm.type,
            tags,
            region_based: createForm.region_based,
            region: createForm.region || null,
        })

        showCreate.value = false
        createForm.title = ''
        createForm.description = ''
        createForm.category = ''
        createForm.type = 'public'
        createForm.tagsText = ''
        createForm.region_based = false
        createForm.region = ''

        await loadAll()
        await Swal.fire({
            icon: 'success',
            title: 'Forum created',
            text: 'Your forum has been created successfully.',
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
        creating.value = false
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

.invite-row {
    border: 1px solid #e6ebf8;
    border-radius: 12px;
    padding: 10px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    width: min(640px, 100%);
    border-radius: 16px;
    border: 1px solid #d7e3ff;
    background: #fff;
    padding: 16px;
    box-shadow: 0 20px 40px rgba(17, 29, 59, 0.22);
}
</style>
