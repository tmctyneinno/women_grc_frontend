<template>
    <NuxtLayout name="account-layout">
        <div class="container py-3 forum-detail-page">
            <div class="mb-3">
                <NuxtLink to="/account/forum" class="small text-decoration-none text-theme">
                    <i class="bi bi-arrow-left"></i> Back to Forums
                </NuxtLink>
            </div>

            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-theme"></div>
            </div>

            <template v-else-if="forum">
                <div class="forum-header p-4 p-lg-5 mb-3">
                    <div class="d-lg-flex justify-content-between align-items-start gap-3">
                        <div>
                            <div class="small text-uppercase header-meta mb-1">{{ forum.category || 'General' }}</div>
                            <h3 class="fw-bold mb-2">{{ forum.title }}</h3>
                            <p class="mb-2">{{ forum.description || 'No forum description provided.' }}</p>
                            <div class="small d-flex flex-wrap gap-2">
                                <span class="header-pill">{{ forum.memberships?.length || 0 }} members</span>
                                <span class="header-pill">{{ forum.threads?.length || 0 }} active threads</span>
                                <span class="header-pill text-capitalize">{{ forum.type }} forum</span>
                                <span class="header-pill text-capitalize">{{ forum.status }}</span>
                            </div>
                            <button v-if="isCreator" class="btn btn-danger btn-sm mt-3" @click="deleteForum">
                                <i class="bi bi-trash me-1"></i> Delete Forum
                            </button>
                        </div>
                        <div class="thread-box mt-3 mt-lg-0">
                            <div class="small text-muted mb-2">Start a discussion</div>
                            <input v-model="newThread.title" class="form-control form-control-sm mb-2" placeholder="Thread title">
                            <textarea v-model="newThread.content" class="form-control form-control-sm mb-2" rows="3" placeholder="What would you like to discuss?"></textarea>
                            <button class="btn btn-theme btn-sm w-100" :disabled="creatingThread" @click="createThread">
                                <span v-if="creatingThread" class="spinner-border spinner-border-sm me-1"></span>Create Thread
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row g-3">
                    <div class="col-lg-4">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                                <div class="fw-semibold mb-2">Threads</div>
                                <div v-if="threads.length === 0" class="small text-muted">No threads yet.</div>
                                <div v-else class="d-grid gap-2">
                                    <button
                                        v-for="thread in threads"
                                        :key="thread.id"
                                        class="thread-item-btn"
                                        :class="{ 'thread-item-active': activeThread?.id === thread.id }"
                                        @click="selectThread(thread)"
                                    >
                                        <div class="fw-medium text-start">{{ thread.title }}</div>
                                        <div class="small text-muted text-start">{{ thread.posts_count || 0 }} posts</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                                <template v-if="activeThread">
                                    <div class="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <div class="fw-semibold">{{ activeThread.title }}</div>
                                            <div class="small text-muted">{{ activeThread.content || 'No thread intro content.' }}</div>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <textarea v-model="newPost.content" class="form-control form-control-sm mb-2" rows="3" placeholder="Write a post or reply..."></textarea>
                                        <input ref="attachmentRef" type="file" class="form-control form-control-sm mb-2" accept=".jpg,.jpeg,.png,.pdf">
                                        <button class="btn btn-theme btn-sm" :disabled="posting" @click="postMessage">
                                            <span v-if="posting" class="spinner-border spinner-border-sm me-1"></span>Post Message
                                        </button>
                                    </div>

                                    <div v-if="posts.length === 0" class="small text-muted">No posts in this thread yet.</div>
                                    <div v-else class="d-grid gap-2">
                                        <div v-for="post in posts" :key="post.id" class="post-card">
                                            <div class="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <div class="fw-medium">{{ post.user?.first_name }} {{ post.user?.last_name }}</div>
                                                    <div class="small text-muted">{{ formatDate(post.created_at) }}</div>
                                                </div>
                                                <div class="d-flex gap-1">
                                                    <button
                                                        class="btn btn-sm border"
                                                        :class="getUserReaction(post) === 'like' ? 'btn-theme text-white' : 'btn-light'"
                                                        @click="react(post.id, 'like')"
                                                    >
                                                        Like ({{ post.likes_count || 0 }})
                                                    </button>
                                                    <button
                                                        class="btn btn-sm border"
                                                        :class="getUserReaction(post) === 'dislike' ? 'btn-danger text-white' : 'btn-light'"
                                                        @click="react(post.id, 'dislike')"
                                                    >
                                                        Dislike ({{ post.dislikes_count || 0 }})
                                                    </button>
                                                    <button class="btn btn-light border btn-sm" @click="reportPost(post.id)">Report</button>
                                                </div>
                                            </div>
                                            <div v-if="post.quote" class="quote-box mt-2 small">
                                                Quoted: {{ post.quote?.content }}
                                            </div>
                                            <div class="mt-2">{{ post.content }}</div>
                                            <div v-if="post.attachment_path" class="mt-2">
                                                <img
                                                    v-if="isImageAttachment(post.attachment_path)"
                                                    :src="resolveAttachmentUrl(post.attachment_path)"
                                                    alt="attachment"
                                                    class="img-fluid rounded border"
                                                    style="max-height: 240px; object-fit: cover;"
                                                />
                                                <a
                                                    v-else
                                                    :href="resolveAttachmentUrl(post.attachment_path)"
                                                    target="_blank"
                                                    class="small text-theme d-inline-block"
                                                >
                                                    <i class="bi bi-paperclip me-1"></i>Attachment
                                                </a>
                                            </div>

                                            <div v-if="(post.replies || []).length" class="reply-list mt-2">
                                                <div v-for="reply in post.replies" :key="reply.id" class="reply-card small">
                                                    <span class="fw-medium">{{ reply.user?.first_name }} {{ reply.user?.last_name }}:</span>
                                                    {{ reply.content }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <div v-else class="small text-muted">Select a thread from the left to view discussions.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import api from '~/api'
import { useAccountCache } from '~/composables/useAccountCache'

definePageMeta({
    middleware: 'account-route-middleware',
})

const route = useRoute()
const forumId = computed(() => String(route.params.id || ''))
const loading = ref(false)
const creatingThread = ref(false)
const posting = ref(false)

const forum = ref<any>(null)
const threads = ref<any[]>([])
const activeThread = ref<any>(null)
const posts = ref<any[]>([])
const attachmentRef = ref<HTMLInputElement | null>(null)
const { getCached, setCached, clearCached } = useAccountCache()

const newThread = reactive({
    title: '',
    content: '',
})

const newPost = reactive({
    content: '',
})

const authStore = useAuthStore()
const isCreator = computed(() => Number(forum.value?.created_by || forum.value?.creator?.id || 0) === Number(authStore.userData?.id || 0))

const formatDate = (date: string) => new Date(date).toLocaleString()

const runtimeConfig = useRuntimeConfig()
const apiHost = (
    import.meta.env.VITE_API_URL ||
    runtimeConfig.public.apiUrl ||
    runtimeConfig.public.apiBaseUrl ||
    'http://127.0.0.1:8000'
).replace(/\/$/, '')

const resolveAttachmentUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http://')) return path.replace('http://', 'https://')
    if (path.startsWith('https://')) return path
    if (path.startsWith('/storage/')) return `${apiHost}${path}`
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const normalizedPath = cleanPath.startsWith('storage/') ? cleanPath.slice('storage/'.length) : cleanPath
    return `${apiHost}/storage/${normalizedPath}`
}

const isImageAttachment = (path: string) => {
    return /\.(png|jpg|jpeg|gif|webp)$/i.test(path || '')
}

const getUserReaction = (post: any) => {
    const userId = Number(authStore.userData?.id || 0)
    if (!userId || !Array.isArray(post?.reactions)) return ''
    const reaction = post.reactions.find((item: any) => Number(item.user_id) === userId)
    return reaction?.reaction || ''
}

const loadForum = async () => {
    if (!forumId.value) return
    loading.value = true
    try {
        const cachedForum = getCached<any>(`forum-${forumId.value}`)
        if (cachedForum) {
            forum.value = cachedForum
            threads.value = forum.value?.threads || []
            activeThread.value = threads.value[0] || null
            if (activeThread.value) {
                await loadPosts(activeThread.value.id)
            }
            return
        }
        const res = await api.forumDetails(forumId.value)
        forum.value = res?.data?.data || null
        threads.value = forum.value?.threads || []
        activeThread.value = threads.value[0] || null
        setCached(`forum-${forumId.value}`, forum.value, 120000)
        if (activeThread.value) {
            await loadPosts(activeThread.value.id)
        }
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Unable to load forum',
            text: error?.response?.data?.message || 'Please try again later.',
            confirmButtonColor: '#293567',
        })
    } finally {
        loading.value = false
    }
}

const loadThreads = async () => {
    if (!forumId.value) return
    const cached = getCached<any[]>(`forum-${forumId.value}-threads`)
    if (cached) {
        threads.value = cached
    } else {
        const res = await api.forumThreads(forumId.value)
        threads.value = res?.data?.data?.data || []
        setCached(`forum-${forumId.value}-threads`, threads.value, 120000)
    }
    if (!activeThread.value && threads.value.length) {
        activeThread.value = threads.value[0]
    }
}

const loadPosts = async (threadId: number) => {
    if (!forumId.value || !threadId) return
    const cacheKey = `forum-${forumId.value}-thread-${threadId}-posts`
    const cached = getCached<any[]>(cacheKey)
    if (cached) {
        posts.value = cached
        return
    }
    const res = await api.forumPosts(forumId.value, threadId)
    posts.value = res?.data?.data?.data || []
    setCached(cacheKey, posts.value, 120000)
}

const selectThread = async (thread: any) => {
    activeThread.value = thread
    await loadPosts(thread.id)
}

const createThread = async () => {
    if (!newThread.title.trim()) return
    try {
        creatingThread.value = true
        await api.forumCreateThread(forumId.value, {
            title: newThread.title,
            content: newThread.content || undefined,
        })
        clearCached(`forum-${forumId.value}`)
        clearCached(`forum-${forumId.value}-threads`)
        newThread.title = ''
        newThread.content = ''
        await loadThreads()
        if (threads.value.length) {
            activeThread.value = threads.value[0]
            await loadPosts(activeThread.value.id)
        }
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Thread creation failed',
            text: error?.response?.data?.message || 'Unable to create thread.',
            confirmButtonColor: '#293567',
        })
    } finally {
        creatingThread.value = false
    }
}

const postMessage = async () => {
    if (!activeThread.value || !newPost.content.trim()) return
    try {
        posting.value = true
        const file = attachmentRef.value?.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('content', newPost.content)
            formData.append('attachment', file)
            await api.forumCreatePost(forumId.value, activeThread.value.id, formData, true)
            if (attachmentRef.value) attachmentRef.value.value = ''
        } else {
            await api.forumCreatePost(forumId.value, activeThread.value.id, { content: newPost.content })
        }

        newPost.content = ''
        if (activeThread.value) {
            clearCached(`forum-${forumId.value}-thread-${activeThread.value.id}-posts`)
        }
        await loadPosts(activeThread.value.id)
        await loadThreads()
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Unable to post',
            text: error?.response?.data?.message || 'Please try again.',
            confirmButtonColor: '#293567',
        })
    } finally {
        posting.value = false
    }
}

const react = async (postId: number, reaction: 'like' | 'dislike') => {
    try {
        await api.forumReactPost(postId, reaction)
        if (activeThread.value) {
            clearCached(`forum-${forumId.value}-thread-${activeThread.value.id}-posts`)
        }
        if (activeThread.value) await loadPosts(activeThread.value.id)
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Reaction failed',
            text: error?.response?.data?.message || 'Unable to save reaction.',
            confirmButtonColor: '#293567',
        })
    }
}

const reportPost = async (postId: number) => {
    const result = await Swal.fire({
        title: 'Report post',
        input: 'text',
        inputLabel: 'Reason (optional)',
        showCancelButton: true,
        confirmButtonText: 'Report',
        confirmButtonColor: '#293567',
    })

    if (!result.isConfirmed) return

    try {
        await api.forumReportPost(postId, { reason: result.value || 'Inappropriate content' })
        await Swal.fire({
            icon: 'success',
            title: 'Reported',
            text: 'Post has been reported for moderation.',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Report failed',
            text: error?.response?.data?.message || 'Unable to report post.',
            confirmButtonColor: '#293567',
        })
    }
}

const deleteForum = async () => {
    if (!forum.value?.id) return

    const result = await Swal.fire({
        icon: 'warning',
        title: 'Delete forum?',
        text: 'This will permanently remove the forum, threads, and posts.',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#dc3545',
    })

    if (!result.isConfirmed) return

    try {
        await api.forumDelete(forum.value.id)
        await Swal.fire({
            icon: 'success',
            title: 'Forum deleted',
            text: 'Your forum has been deleted.',
            confirmButtonColor: '#293567',
        })
        await navigateTo('/account/forum')
    } catch (error: any) {
        await Swal.fire({
            icon: 'warning',
            title: 'Delete failed',
            text: error?.response?.data?.message || 'Unable to delete forum.',
            confirmButtonColor: '#293567',
        })
    }
}

onMounted(loadForum)
</script>

<style scoped>
.forum-header {
    border-radius: 18px;
    color: #f3f6ff;
    background:
        radial-gradient(circle at top right, rgba(176, 52, 54, 0.36) 0%, transparent 42%),
        linear-gradient(140deg, #28366b 0%, #384b8b 58%, #25325f 100%);
}

.header-meta {
    color: #ffd8d9;
    letter-spacing: 0.05em;
}

.header-pill {
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.12);
    padding: 2px 10px;
    font-size: 11px;
}

.thread-box {
    width: min(320px, 100%);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.95);
    color: #25315f;
    padding: 12px;
}

.thread-item-btn {
    border: 1px solid #e4eaf9;
    border-radius: 10px;
    background: #fff;
    padding: 10px;
}

.thread-item-active {
    border-color: #293567;
    background: #eef2ff;
}

.post-card {
    border: 1px solid #e8ecfa;
    border-radius: 10px;
    padding: 10px;
    background: #fcfdff;
}

.quote-box {
    border-left: 3px solid #c7d4ff;
    background: #f5f8ff;
    padding: 8px;
    border-radius: 8px;
}

.reply-list {
    padding-left: 12px;
    border-left: 2px solid #e4eaf8;
}

.reply-card {
    background: #f8faff;
    border: 1px solid #e6ecfb;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 6px;
}
</style>
