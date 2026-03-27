<template>
    <NuxtLayout name="account-layout">
        <div class="container py-3 search-page">
            <div class="search-hero p-4 p-md-5 mb-4">
                <div class="d-lg-flex justify-content-between align-items-end gap-3">
                    <div>
                        <div class="small text-uppercase fw-semibold hero-kicker mb-1">Search</div>
                        <h3 class="fw-bold mb-2">Find anything across your account</h3>
                        <p class="mb-0">Courses, forums, events, podcasts, and articles -- all in one place.</p>
                    </div>
                    <div class="search-box mt-3 mt-lg-0">
                        <i class="bi bi-search text-muted"></i>
                        <input v-model="searchText" class="form-control form-control-sm" placeholder="Search..." />
                    </div>
                </div>
            </div>

            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-theme"></div>
                <div class="small text-muted mt-2">Searching...</div>
            </div>

            <template v-else>
                <div class="row g-3 mb-4">
                    <div class="col-lg-6">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                                <div class="fw-semibold mb-2">Courses</div>
                                <div v-if="courses.length === 0" class="small text-muted">No courses found.</div>
                                <div v-else class="d-grid gap-2">
                                    <div v-for="course in courses" :key="course.id" class="search-row">
                                        <div>
                                            <div class="fw-medium">{{ course.title }}</div>
                                            <div class="small text-muted">{{ course.category || 'General' }}</div>
                                        </div>
                                        <NuxtLink :to="`/account/learning-center/${course.id}`" class="btn btn-outline-theme btn-sm">
                                            View
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                                <div class="fw-semibold mb-2">Forums</div>
                                <div v-if="forums.length === 0" class="small text-muted">No forums found.</div>
                                <div v-else class="d-grid gap-2">
                                    <div v-for="forum in forums" :key="forum.id" class="search-row">
                                        <div>
                                            <div class="fw-medium">{{ forum.title }}</div>
                                            <div class="small text-muted">{{ forum.category || 'General' }}</div>
                                        </div>
                                        <NuxtLink :to="`/account/forum/${forum.id}`" class="btn btn-outline-theme btn-sm">
                                            Open
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row g-3">
                    <div class="col-lg-6">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                                <div class="fw-semibold mb-2">Events</div>
                                <div v-if="events.length === 0" class="small text-muted">No events found.</div>
                                <div v-else class="d-grid gap-2">
                                    <div v-for="event in events" :key="event.id" class="search-row">
                                        <div>
                                            <div class="fw-medium">{{ event.title }}</div>
                                            <div class="small text-muted">{{ event.venue || 'Venue TBA' }}</div>
                                        </div>
                                        <NuxtLink :to="`/account/events`" class="btn btn-outline-theme btn-sm">
                                            View
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                                <div class="fw-semibold mb-2">Podcasts</div>
                                <div v-if="podcasts.length === 0" class="small text-muted">No podcasts found.</div>
                                <div v-else class="d-grid gap-2">
                                    <div v-for="podcast in podcasts" :key="podcast.id" class="search-row">
                                        <div>
                                            <div class="fw-medium">{{ podcast.title }}</div>
                                            <div class="small text-muted">{{ podcast.tag || 'Podcast' }}</div>
                                        </div>
                                        <NuxtLink :to="`/account/events`" class="btn btn-outline-theme btn-sm">
                                            Listen
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row g-3 mt-3">
                    <div class="col-lg-6">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                                <div class="fw-semibold mb-2">Articles</div>
                                <div v-if="articles.length === 0" class="small text-muted">No articles found.</div>
                                <div v-else class="d-grid gap-2">
                                    <div v-for="article in articles" :key="article.id" class="search-row">
                                        <div>
                                            <div class="fw-medium">{{ article.title }}</div>
                                            <div class="small text-muted">{{ article.tag || 'Article' }}</div>
                                        </div>
                                        <NuxtLink :to="`/account/events`" class="btn btn-outline-theme btn-sm">
                                            Read
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import api from '~/api'

definePageMeta({
    middleware: 'account-route-middleware',
})

const route = useRoute()
const loading = ref(false)
const searchText = ref(String(route.query.q || ''))
const courses = ref<any[]>([])
const forums = ref<any[]>([])
const events = ref<any[]>([])
const podcasts = ref<any[]>([])
const articles = ref<any[]>([])
let searchTimer: number | null = null

const loadSearch = async () => {
    const query = searchText.value.trim()
    if (!query) {
        courses.value = []
        forums.value = []
        events.value = []
        podcasts.value = []
        articles.value = []
        return
    }

    loading.value = true
    try {
        const [coursesRes, forumsRes, forumMineRes, eventsRes, podcastsRes, articlesRes] = await Promise.all([
            api.learningCourses({ q: query }),
            api.forumList({ q: query }),
            api.forumList({ mine: 1, q: query }),
            api.events({ q: query }),
            api.podcasts({ search: query }),
            api.articles({ q: query }),
        ])

        const coursesPayload = coursesRes?.data?.data?.data || coursesRes?.data?.data || []
        courses.value = Array.isArray(coursesPayload) ? coursesPayload : []

        const forumsPayload = forumsRes?.data?.data?.data || []
        const forumMinePayload = forumMineRes?.data?.data?.data || []
        const forumMap = new Map<number, any>()
        forumsPayload.concat(forumMinePayload).forEach((forum: any) => {
            forumMap.set(Number(forum.id), forum)
        })
        forums.value = Array.from(forumMap.values())

        const eventsPayload = eventsRes?.data?.data?.data || []
        events.value = Array.isArray(eventsPayload) ? eventsPayload : []

        const podcastPayload = podcastsRes?.data?.data?.data || []
        podcasts.value = Array.isArray(podcastPayload) ? podcastPayload : []

        const articlePayload = articlesRes?.data?.data?.data || []
        articles.value = Array.isArray(articlePayload) ? articlePayload : []
    } finally {
        loading.value = false
    }
}

watch(searchText, () => {
    if (searchTimer) window.clearTimeout(searchTimer)
    searchTimer = window.setTimeout(async () => {
        await navigateTo({ path: '/account/search', query: { q: searchText.value.trim() || undefined } })
        loadSearch()
    }, 400)
})

watch(
    () => route.query.q,
    (value) => {
        searchText.value = String(value || '')
        loadSearch()
    }
)

onMounted(loadSearch)
</script>

<style scoped>
.search-hero {
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

.search-box {
    position: relative;
    width: min(280px, 100%);
}

.search-box i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
}

.search-box input {
    padding-left: 30px;
}

.search-row {
    border: 1px solid #e6ebf8;
    border-radius: 12px;
    padding: 10px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
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
