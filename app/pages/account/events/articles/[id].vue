<template>
    <NuxtLayout name="account-layout">
        <div class="article-hero">
            <div class="container py-5">
                

                <div v-if="loading" class="text-center text-white-50 py-5">
                    <div class="spinner-border text-light" role="status"></div>
                    <div class="small mt-2">Loading article...</div>
                </div>

                <div v-else-if="error" class="text-center text-white-50 py-5">
                    <i class="bi bi-exclamation-triangle fs-2"></i>
                    <div class="mt-2">{{ error }}</div>
                </div>

                <div v-else class="article-hero-content">
                    <span class="article-tag">{{ article.tag }}</span>
                    <h1 class="display-6 fw-bold text-white mt-3">{{ article.title }}</h1>
                    <p class="lead text-white-50 mt-2">{{ article.summary }}</p>
                    <div class="article-meta text-white-50">
                        <span>{{ article.author }}</span>
                        <span>�</span>
                        <span>{{ formatDate(article.date) }}</span>
                    </div>
                </div>

               <div class="d-flex justify-content-end">
                    <button class="btn btn-sm btn-ghost" @click="goBack">
                        <i class="bi bi-arrow-left my-3"></i> Back to Articles
                    </button>
                </div>
            </div>
        </div>

        <div class="container article-body-section">
            <div v-if="!loading && !error" class="row g-4 my-3 py-3">
                <div class="col-lg-8 ">
                    <div class="article-cover" v-if="article.cover_url">
                        <img :src="article.cover_url" alt="cover" />
                    </div>
                    <div class="article-content" v-html="article.content"></div>
                </div>

                <div class="col-lg-4">
                    <div class="article-sidebar">
                        <div class="sidebar-card">
                            <div class="small text-uppercase text-muted">Author</div>
                            <div class="fw-semibold mt-1">{{ article.author }}</div>
                            <div class="text-muted small mt-1">Published {{ formatDate(article.date) }}</div>
                        </div>
                        <div class="sidebar-card">
                            <div class="small text-uppercase text-muted">Tag</div>
                            <div class="tag-pill mt-2">{{ article.tag }}</div>
                        </div>
                        <div class="sidebar-card">
                            <div class="small text-uppercase text-muted">Share</div>
                            <div class="d-flex gap-2 mt-2">
                                <button class="btn btn-outline-theme btn-sm" @click="copyLink">Copy Link</button>
                                <a :href="shareUrl" target="_blank" class="btn btn-outline-theme btn-sm">Open Link</a>
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
    middleware: 'account-route-middleware',
})

const route = useRoute()
const router = useRouter()
const { getCached, setCached } = useAccountCache()

const loading = ref(true)
const error = ref('')
const article = ref({
    id: 0,
    title: '',
    summary: '',
    content: '',
    tag: 'Article',
    cover_url: '',
    author: 'WGRCFP',
    date: '',
})
const defaultArticleCover = '/images/default-article-cover.png'

const shareUrl = computed(() => {
    if (typeof window === 'undefined') return '#'
    return window.location.href
})

const goBack = () => {
    router.push('/account/events?tab=articles')
}

const formatDate = (value: string) => {
    if (!value) return 'TBD'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'TBD'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const resolveImage = (path: string | null) => {
    if (!path) return ''
    if (path.startsWith('http://')) return path.replace('http://', 'https://')
    if (path.startsWith('https://')) return path
    if (path.startsWith('/storage/')) return `${apiHost}${path}`

    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const normalizedPath = cleanPath.startsWith('storage/') ? cleanPath.slice('storage/'.length) : cleanPath
    return `${apiHost}/storage/${normalizedPath}`
}

const runtimeConfig = useRuntimeConfig()
const apiHost = (
    import.meta.env.VITE_API_URL ||
    runtimeConfig.public.apiUrl ||
    runtimeConfig.public.apiBaseUrl ||
    'http://127.0.0.1:8000'
).replace(/\/$/, '')


const normalizeArticle = (payload: any) => {
    const creatorUser = payload?.creator_user || payload?.creatorUser || null
    const creatorAdmin = payload?.creator_admin || payload?.creatorAdmin || null
    const author = creatorUser
        ? `${creatorUser.first_name || ''} ${creatorUser.last_name || ''}`.trim()
        : creatorAdmin?.name || 'WGRCFP'
    return {
        id: Number(payload?.id || 0),
        title: payload?.title || 'Untitled Article',
        summary: payload?.summary || 'No summary provided.',
        content: payload?.content || '',
        tag: payload?.tag || 'Article',
        cover_url: resolveImage(payload?.cover_image || null) || defaultArticleCover,
        author: author || 'WGRCFP',
        date: payload?.published_at || payload?.created_at || '',
    }
}

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(shareUrl.value)
    } catch (e) {
        // ignore
    }
}

const loadArticle = async () => {
    const id = String(route.params.id || '')
    if (!id) {
        error.value = 'Article not found.'
        loading.value = false
        return
    }

    const cacheKey = `account-article:${id}`
    const cached = getCached<any>(cacheKey)
    if (cached) {
        article.value = cached
        loading.value = false
        return
    }

    try {
        const res = await api.article(id)
        const payload = res?.data?.data || null
        if (!payload) {
            error.value = 'Article not found.'
        } else {
            article.value = normalizeArticle(payload)
            setCached(cacheKey, article.value, 180000)
        }
    } catch (e: any) {
        error.value = e?.response?.data?.message || 'Unable to load article.'
    } finally {
        loading.value = false
    }
}

onMounted(loadArticle)
</script>

<style scoped>
.article-hero {
    background: linear-gradient(135deg, #1d2757 0%, #2f3f7f 55%, #3f2b4b 100%);
    color: #fff;
}

.article-hero-content {
    max-width: 760px;
}

.article-tag {
    display: inline-flex;
    padding: 4px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
    color: #f1f4ff;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.article-meta {
    display: flex;
    gap: 10px;
    font-size: 13px;
}

.btn-ghost {
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    background: transparent;
}

.btn-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
}

.article-body-section {
    margin-top: -40px;
    padding-bottom: 48px;
}

.article-cover {
    border-radius: 18px;
    overflow: hidden;
    margin-bottom: 24px;
    box-shadow: 0 16px 30px rgba(20, 32, 60, 0.12);
}

.article-cover img {
    width: 100%;
    height: 320px;
    object-fit: cover;
}

.article-content {
    background: #fff;
    border: 1px solid #e9edff;
    border-radius: 18px;
    padding: 24px;
    line-height: 1.7;
    color: #1e2a4a;
    box-shadow: 0 10px 24px rgba(29, 39, 80, 0.06);
}

.article-content :deep(h2),
.article-content :deep(h3) {
    margin-top: 22px;
    margin-bottom: 10px;
}

.article-sidebar {
    position: sticky;
    top: 110px;
    display: grid;
    gap: 14px;
}

.sidebar-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #edf1ff;
    padding: 16px;
    box-shadow: 0 10px 20px rgba(33, 45, 82, 0.06);
}

.tag-pill {
    display: inline-flex;
    padding: 6px 12px;
    border-radius: 999px;
    background: #fff0f0;
    color: #b03436;
    font-size: 12px;
    font-weight: 600;
}

.btn-outline-theme {
    border: 1px solid #c4d2ff;
    color: #2f4384;
}

.btn-outline-theme:hover {
    background: #edf2ff;
    color: #24386f;
}

@media (max-width: 992px) {
    .article-body-section {
        margin-top: 0;
    }

    .article-cover img {
        height: 240px;
    }

    .article-sidebar {
        position: static;
    }
}

@media (max-width: 600px) {
    .article-content {
        padding: 18px;
    }
}
</style>
