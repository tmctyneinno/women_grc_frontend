<template>
    <NuxtLayout name="account-layout">
        <div class="container py-4">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <div>
                    <h5 class="fw-bold mb-1">Events Dashboard</h5>
                    <p class="text-muted small mb-0">
                        {{
                            viewMode === 'events'
                                ? 'Manage and explore all registered events'
                                : viewMode === 'podcasts'
                                    ? 'Stream event highlights and expert conversations'
                                    : 'Read event insights, recaps, and expert articles'
                        }}
                    </p>
                </div>

                <div class="d-flex flex-wrap align-items-center gap-2">
                    <div class="btn-group btn-group-sm" role="group" aria-label="Events toggle">
                        <button
                            class="btn"
                            :class="viewMode === 'events' ? 'btn-theme' : 'btn-outline-theme'"
                            @click="viewMode = 'events'"
                        >
                            <i class="bi bi-calendar-event me-1"></i> Events
                        </button>
                        <button
                            class="btn"
                            :class="viewMode === 'podcasts' ? 'btn-theme' : 'btn-outline-theme'"
                            @click="viewMode = 'podcasts'"
                        >
                            <i class="bi bi-mic-fill me-1"></i> Podcasts
                        </button>
                        <button
                            class="btn"
                            :class="viewMode === 'articles' ? 'btn-theme' : 'btn-outline-theme'"
                            @click="viewMode = 'articles'"
                        >
                            <i class="bi bi-journal-text me-1"></i> Articles
                        </button>
                    </div>

                    <div class="position-relative" style="max-width: 300px;" v-if="viewMode === 'events'">
                        <input v-model="searchQuery" type="text" placeholder="Search events..." class="form-control form-control-sm pe-5" />
                        <i class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                    </div>
                    <div class="position-relative" style="max-width: 300px;" v-else-if="viewMode === 'podcasts'">
                        <input v-model="podcastSearchQuery" type="text" placeholder="Search podcasts..." class="form-control form-control-sm pe-5" />
                        <i class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                    </div>
                    <div class="position-relative" style="max-width: 300px;" v-else>
                        <input v-model="articleSearchQuery" type="text" placeholder="Search articles..." class="form-control form-control-sm pe-5" />
                        <i class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                    </div>
                </div>
            </div>

            <div v-if="viewMode === 'events'" class="row g-3 mb-4">
                <div class="col-6 col-md-3">
                    <div class="card border-0 h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded-circle bg-primary bg-opacity-10 p-3">
                                    <i class="bi bi-calendar-event text-white"></i>
                                </div>
                                <div>
                                    <div class="text-muted small">Total Events</div>
                                    <div class="fw-bold fs-5">{{ filteredEvents.length }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card border-0 h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded-circle bg-success bg-opacity-10 p-3">
                                    <i class="bi bi-clock text-success"></i>
                                </div>
                                <div>
                                    <div class="text-muted small">Upcoming</div>
                                    <div class="fw-bold fs-5">{{ upcomingCount }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card border-0 h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded-circle bg-warning bg-opacity-10 p-3">
                                    <i class="bi bi-play-circle text-warning"></i>
                                </div>
                                <div>
                                    <div class="text-muted small">Ongoing</div>
                                    <div class="fw-bold fs-5">{{ ongoingCount }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card border-0 h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded-circle bg-secondary bg-opacity-10 p-3">
                                    <i class="bi bi-check2-circle text-secondary"></i>
                                </div>
                                <div>
                                    <div class="text-muted small">Completed</div>
                                    <div class="fw-bold fs-5">{{ completedCount }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="viewMode === 'events'" class="card border-0 mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold mb-0">My Booked Events</h6>
                        <span class="small text-muted">{{ myBookings.length }} total</span>
                    </div>

                    <div v-if="myBookings.length === 0" class="small text-muted">
                        You have not booked any event yet.
                    </div>

                    <div v-else class="row g-3">
                        <div class="col-lg-6">
                            <div class="booked-group h-100">
                                <div class="booked-title text-success mb-2">
                                    <i class="bi bi-calendar-check me-1"></i> Upcoming / Ongoing
                                </div>
                                <div v-if="upcomingBookedEvents.length === 0" class="small text-muted">No upcoming booking.</div>
                                <div v-else class="d-grid gap-2">
                                    <div v-for="booking in upcomingBookedEvents" :key="booking.booking_id" class="booked-item">
                                        <div class="fw-medium">{{ booking.event.title }}</div>
                                        <div class="small text-muted">{{ formatDate(booking.event.start_date) }} • {{ booking.event.venue }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="booked-group h-100">
                                <div class="booked-title text-secondary mb-2">
                                    <i class="bi bi-check2-circle me-1"></i> Completed
                                </div>
                                <div v-if="completedBookedEvents.length === 0" class="small text-muted">No completed booking.</div>
                                <div v-else class="d-grid gap-2">
                                    <div v-for="booking in completedBookedEvents" :key="booking.booking_id" class="booked-item">
                                        <div class="fw-medium">{{ booking.event.title }}</div>
                                        <div class="small text-muted">{{ formatDate(booking.event.end_date || booking.event.start_date) }} • {{ booking.event.venue }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="viewMode === 'podcasts'" class="card border-0 mb-4 podcast-section">
                <div class="card-body">
                    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-3">
                        <div>
                            <div class="text-uppercase small text-muted">Events Audio</div>
                            <h6 class="fw-bold mb-1">Podcast Lounge</h6>
                            <p class="text-muted small mb-0">Stream event highlights and expert conversations. No downloads.</p>
                        </div>
                        <div class="podcast-chip">
                            {{ podcastEpisodes.length }} episodes
                        </div>
                    </div>

                    <div class="podcast-grid">
                        <div class="podcast-list">
                            <div class="podcast-filters">
                                <button
                                    v-for="chip in podcastFilters"
                                    :key="chip"
                                    class="podcast-filter"
                                    :class="{ 'podcast-filter-active': activePodcastFilter === chip }"
                                    @click="activePodcastFilter = chip"
                                >
                                    {{ chip }}
                                </button>
                            </div>

                            <div v-if="podcastLoading" class="text-center text-muted py-4">
                                <div class="spinner-border spinner-border-sm text-theme" role="status"></div>
                                <div class="small mt-2">Loading podcasts...</div>
                            </div>

                            <div v-else-if="filteredPodcastEpisodes.length === 0" class="text-center text-muted py-4">
                                <i class="bi bi-mic text-muted fs-4"></i>
                                <div class="small mt-2">No podcasts available yet.</div>
                            </div>

                            <div v-else class="podcast-episode-list">
                                <button
                                    v-for="episode in filteredPodcastEpisodes"
                                    :key="episode.id"
                                    class="podcast-episode"
                                    :class="{
                                        'podcast-episode-active': activePodcast?.id === episode.id,
                                        'podcast-episode-disabled': !episode.audio_url
                                    }"
                                    @click="selectPodcast(episode)"
                                >
                                    <div class="podcast-cover">
                                        <img :src="episode.cover_url" alt="cover" />
                                    </div>
                                    <div class="podcast-body">
                                        <div class="fw-semibold">{{ episode.title }}</div>
                                        <div class="small text-muted">{{ episode.host }} · {{ episode.duration }}</div>
                                        <div class="small text-muted mt-1">{{ episode.summary }}</div>
                                        <div v-if="episode.last_position_seconds" class="small text-theme mt-1">
                                            Resume at {{ formatSeconds(episode.last_position_seconds) }}
                                        </div>
                                        <div v-if="episode.contributors?.length" class="podcast-contributors mt-2">
                                            <div class="avatar-stack">
                                                <img
                                                    v-for="(contributor, idx) in episode.contributors.slice(0, 3)"
                                                    :key="contributor.id"
                                                    :src="contributor.photo_url || '/images/avatar-placeholder.jpg'"
                                                    :alt="contributor.name"
                                                    :style="{
                                                        marginLeft: idx > 0 ? '-8px' : '0',
                                                        width: '24px',
                                                        height: '24px',
                                                        objectFit: 'cover',
                                                        borderRadius: '50%',
                                                        border: '2px solid #fff',
                                                        zIndex: 10 - idx
                                                    }"
                                                />
                                            </div>
                                            <span class="small text-muted ms-2">
                                                {{ episode.contributors.map((c) => c.name).slice(0, 2).join(', ') }}
                                            </span>
                                        </div>
                                        <div class="podcast-tags mt-2">
                                            <span class="podcast-tag">{{ episode.tag }}</span>
                                            <span v-if="!episode.audio_url" class="podcast-tag muted">Coming soon</span>
                                        </div>
                                    </div>
                                    <div class="podcast-icon">
                                        <i v-if="activePodcast?.id === episode.id" class="bi bi-pause-circle-fill"></i>
                                        <i v-else class="bi bi-play-circle"></i>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div class="podcast-player">
                            <div class="podcast-player-card">
                                <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
                                    <div>
                                        <div class="fw-semibold">{{ activePodcast?.title || 'Select an episode' }}</div>
                                        <div class="small text-muted">{{ activePodcast?.host || 'WGRCFP Audio' }}</div>
                                    </div>
                                    <span class="podcast-badge">{{ activePodcast?.tag || 'Podcast' }}</span>
                                </div>

                                <div class="small text-muted mb-3">
                                    {{ activePodcast?.summary || 'Choose an episode from the list to start listening.' }}
                                </div>

                                <div v-if="activePodcast?.contributors?.length" class="podcast-hosts mb-3">
                                    <div class="small text-muted mb-2">Contributors</div>
                                    <div class="d-flex flex-wrap gap-2">
                                        <div v-for="contributor in activePodcast.contributors" :key="contributor.id" class="podcast-host">
                                            <img :src="contributor.photo_url || '/images/avatar-placeholder.jpg'" :alt="contributor.name" />
                                            <div>
                                                <div class="small fw-semibold">{{ contributor.name }}</div>
                                                <div class="small text-muted">{{ contributor.role }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="podcast-meta">
                                    <div>
                                        <div class="podcast-meta-label">Duration</div>
                                        <div class="podcast-meta-value">{{ activePodcast?.duration || '--:--' }}</div>
                                    </div>
                                    <div>
                                        <div class="podcast-meta-label">Format</div>
                                        <div class="podcast-meta-value">Streaming only</div>
                                    </div>
                                </div>

                                <div class="mt-3">
                                    <audio
                                        v-if="podcastAudioSrc"
                                        ref="podcastAudioRef"
                                        class="w-100"
                                        controls
                                        preload="metadata"
                                        controlslist="nodownload noplaybackrate"
                                        :disablePictureInPicture="true"
                                        :src="podcastAudioSrc"
                                        @contextmenu.prevent
                                    ></audio>
                                    <div v-else class="podcast-empty">
                                        <i class="bi bi-music-note-beamed"></i>
                                        <div>No audio selected.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="small text-muted text-center mt-2">
                                Audio loads only when you play an episode to keep the app fast.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="viewMode === 'articles'" class="card border-0 mb-4 article-section">
                <div class="card-body">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
                        <div>
                            <div class="text-uppercase small text-muted">Events Library</div>
                            <h6 class="fw-bold mb-1">Article Hub</h6>
                            <p class="text-muted small mb-0">Explore event write-ups, insights, and community stories.</p>
                        </div>
                        <div class="d-flex flex-column align-items-md-end gap-2">
                            <div class="article-chip">
                                {{ filteredArticles.length }} articles
                            </div>
                            <NuxtLink class="btn btn-sm btn-theme" to="/account/events/articles/create">
                                <i class="bi bi-plus-circle me-1"></i>
                                Submit Article
                            </NuxtLink>
                        </div>
                    </div>

                    <div v-if="articlesLoading" class="text-center text-muted py-4">
                        <div class="spinner-border spinner-border-sm text-theme" role="status"></div>
                        <div class="small mt-2">Loading articles...</div>
                    </div>

                    <div v-else-if="filteredArticles.length === 0" class="text-center text-muted py-4">
                        <i class="bi bi-journal-text fs-3"></i>
                        <div class="small mt-2">No articles available yet.</div>
                    </div>

                    <div v-else class="article-grid">
                        <NuxtLink
                            v-for="article in filteredArticles"
                            :key="article.id"
                            class="article-card"
                            :to="`/account/events/articles/${article.id}`"
                        >
                            <div class="article-cover">
                                <img :src="article.cover_url" alt="cover" />
                            </div>
                            <div class="article-body">
                                <div class="article-tag">{{ article.tag }}</div>
                                <div class="fw-semibold">{{ article.title }}</div>
                                <div class="small text-muted mt-1 article-summary">{{ article.summary }}</div>
                                <div class="article-meta mt-2">
                                    <span>{{ article.author }}</span>
                                    <span>{{ formatDate(article.date) }}</span>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div v-if="viewMode === 'events'" class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold mb-0">All Events</h6>
                        <span class="small text-muted">{{ filteredEvents.length }} total</span>
            </div>

            <div v-if="viewMode === 'events' && loading" class="text-center py-5">
                <div class="spinner-border text-theme" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else-if="viewMode === 'events' && filteredEvents.length === 0" class="text-center py-5">
                <div class="mb-3">
                    <i class="bi bi-calendar-x fs-1 text-muted"></i>
                </div>
                <h6>No events found</h6>
                <p class="text-muted small">Try adjusting your search or check back later</p>
            </div>

            <div v-else-if="viewMode === 'events'" class="row g-4">
                <div v-for="event in paginatedEvents" :key="event.id" class="col-12 col-lg-6">
                    <div class="card border-0 h-100 shadow-sm hover-card">
                        <div class="row g-0">
                            <div class="col-md-4 position-relative">
                                <img :src="event.featured_image" :alt="event.title" class="img-fluid rounded-start h-100"
                                    style="object-fit: cover; min-height: 180px;" />
                                <span class="position-absolute top-0 start-0 m-2 badge" :class="{
                                    'bg-success': event.is_upcoming,
                                    'bg-warning': event.is_ongoing,
                                    'bg-secondary': event.is_past
                                }">
                                    {{ getStatusLabel(event) }}
                                </span>
                            </div>

                            <div class="col-md-8">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <span class="badge bg-theme bg-opacity-10 text-white">{{ event.type }}</span>
                                        <small class="text-muted">
                                            <i class="bi bi-calendar3 me-1"></i>
                                            {{ formatDate(event.start_date) }}
                                        </small>
                                    </div>

                                    <h6 class="card-title fw-bold mb-2 text-truncate">{{ event.title }}</h6>

                                    <p class="card-text small text-muted mb-2 line-clamp-2">
                                        {{ event.short_description }}
                                    </p>

                                    <div class="d-flex flex-wrap gap-3 small text-muted mb-2">
                                        <span>
                                            <i class="bi bi-clock me-1"></i>
                                            {{ formatTime(event.start_time) }}
                                        </span>
                                        <span>
                                            <i class="bi bi-geo-alt me-1"></i>
                                            {{ event.venue }}
                                        </span>
                                    </div>

                                    <div class="small fw-semibold mb-3">
                                        {{ event.formatted_price }} &bull;
                                        <span v-if="event.capacity > 0">
                                            {{ getBookedCount(event) }} of {{ event.capacity }} slots filled
                                        </span>
                                    </div>

                                    <div class="border-top pt-3 mt-auto">
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <small class="fw-medium">
                                                <i class="bi bi-people me-1 text-theme"></i>
                                                Speakers ({{ event.speakers?.length || 0 }})
                                            </small>
                                        </div>

                                        <div class="d-flex align-items-center">
                                            <div class="avatar-stack">
                                                <img v-for="(speaker, idx) in getDisplaySpeakers(event)" :key="speaker.id"
                                                    :src="speaker.image || '/images/avatar-placeholder.jpg'" :alt="speaker.name"
                                                    class="rounded-circle border border-white" :style="{
                                                        marginLeft: idx > 0 ? '-10px' : '0',
                                                        width: '32px',
                                                        height: '32px',
                                                        objectFit: 'cover',
                                                        zIndex: 10 - idx
                                                    }" :title="speaker.name" />
                                            </div>
                                            <span v-if="event.speakers?.length > 4" class="ms-2 small text-muted">
                                                +{{ event.speakers.length - 4 }} more
                                            </span>
                                        </div>
                                    </div>

                                    <div class="mt-3">

                                        <button
                                            class="btn btn-theme btn-sm w-100"
                                            :disabled="getAvailableSlots(event) === 0"
                                            @click="showEventDetails(event)"
                                        >
                                            <i class="bi bi-eye me-1"></i>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="viewMode === 'events' && filteredEvents.length > 0" class="d-flex justify-content-center mt-4">
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="goToPreviousPage">Previous</a>
                        </li>
                        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                            <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="goToNextPage">Next</a>
                        </li>
                    </ul>
                </nav>
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
    middleware: 'account-route-middleware'
})

const searchQuery = ref('')
const currentPage = ref(1)
const loading = ref(false)
const itemsPerPage = 6
const events = ref<any[]>([])
const myBookings = ref<any[]>([])
const cartStore = useCartStore()
const { getCached, setCached, clearCached } = useAccountCache()
const route = useRoute()
const bookingCounts = ref<Record<number, number>>({})
const viewMode = ref<'events' | 'podcasts' | 'articles'>('events')
const podcastSearchQuery = ref('')
const articleSearchQuery = ref('')
const podcastAudioRef = ref<HTMLAudioElement | null>(null)
const podcastEpisodes = ref<PodcastEpisode[]>([])
const articles = ref<any[]>([])
const podcastFilters = ['All', 'Leadership', 'Operations', 'Compliance', 'Security']
const activePodcastFilter = ref('All')
const activePodcast = ref<any>(null)
const podcastLoading = ref(false)
const podcastsLoaded = ref(false)
const articlesLoading = ref(false)
const articlesLoaded = ref(false)
const defaultArticleCover = '/images/default-article-cover.png'
const podcastProgress = ref<Record<number, any>>({})
let podcastProgressTimer: number | null = null
let eventSearchTimer: number | null = null
let podcastSearchTimer: number | null = null
let articleSearchTimer: number | null = null

const filteredEvents = computed(() => events.value)

const upcomingCount = computed(() => events.value.filter(e => e.is_upcoming).length)
const ongoingCount = computed(() => events.value.filter(e => e.is_ongoing).length)
const completedCount = computed(() => events.value.filter(e => e.is_past).length)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredEvents.value.length / itemsPerPage)))
const upcomingBookedEvents = computed(() => myBookings.value.filter((booking) => !booking?.event?.is_past))
const completedBookedEvents = computed(() => myBookings.value.filter((booking) => Boolean(booking?.event?.is_past)))
const paginatedEvents = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredEvents.value.slice(start, start + itemsPerPage)
})

const filteredPodcastEpisodes = computed(() => podcastEpisodes.value)
const filteredArticles = computed(() => articles.value)

const podcastAudioSrc = computed(() => activePodcast.value?.audio_url || '')

watch(searchQuery, () => {
    currentPage.value = 1
    if (viewMode.value !== 'events') return
    if (eventSearchTimer) window.clearTimeout(eventSearchTimer)
    eventSearchTimer = window.setTimeout(() => {
        fetchEvents(false, searchQuery.value.trim())
    }, 400)
})

watch(articleSearchQuery, () => {
    if (viewMode.value !== 'articles') return
    if (articleSearchTimer) window.clearTimeout(articleSearchTimer)
    articleSearchTimer = window.setTimeout(() => {
        fetchArticles(false, articleSearchQuery.value.trim())
    }, 400)
})

watch(filteredEvents, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value
    }
})

const runtimeConfig = useRuntimeConfig()
const apiHost = (
    import.meta.env.VITE_API_URL ||
    runtimeConfig.public.apiUrl ||
    runtimeConfig.public.apiBaseUrl ||
    'http://127.0.0.1:8000'
).replace(/\/$/, '')

type PodcastEpisode = {
    id: number
    title: string
    host: string
    duration?: string
    tag?: string
    summary?: string
    cover_url?: string
    audio_url?: string
    last_position_seconds?: number
    progress_seconds?: number
    duration_seconds?: number
    contributors?: { id: number; name: string; role?: string; photo_url?: string }[]
}

type ArticleItem = {
    id: number
    title: string
    summary: string
    tag: string
    cover_url: string
    author: string
    date: string
}

const toNumber = (value: string | number | null | undefined) => {
    const parsed = Number(value ?? 0)
    return Number.isNaN(parsed) ? 0 : parsed
}

const stripHtml = (content: string) => {
    return (content || '').replace(/<[^>]*>/g, '').trim()
}

const escapeHtml = (content: string) => {
    return (content || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

const resolveImage = (path: string | null, fallback = '/images/event-placeholder.svg') => {
    if (!path) return fallback
    if (path.startsWith('http://')) return path.replace('http://', 'https://')
    if (path.startsWith('https://')) return path
    if (path.startsWith('/storage/')) return `${apiHost}${path}`

    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const normalizedPath = cleanPath.startsWith('storage/') ? cleanPath.slice('storage/'.length) : cleanPath
    return `${apiHost}/storage/${normalizedPath}`
}

const resolvePodcastImage = (path: string | null) => {
    if (!path) return '/images/event-placeholder.svg'
    if (path.startsWith('http://')) return path.replace('http://', 'https://')
    if (path.startsWith('https://')) return path
    if (path.startsWith('/storage/')) return `${apiHost}${path}`

    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const normalizedPath = cleanPath.startsWith('storage/') ? cleanPath.slice('storage/'.length) : cleanPath
    return `${apiHost}/storage/${normalizedPath}`
}

const formatSeconds = (value: number) => {
    const total = Math.max(0, Math.floor(value || 0))
    const minutes = Math.floor(total / 60)
    const seconds = total % 60
    return `${minutes}:${String(seconds).padStart(2, '0')}`
}

const normalizePodcast = (podcast: any): PodcastEpisode => {
    const contributors = Array.isArray(podcast?.contributors) ? podcast.contributors : []
    const host = contributors.length ? contributors.map((c: any) => c.name).join(', ') : 'WGRCFP Audio'
    const rawCover = podcast?.cover_path || podcast?.cover_url || null
    const rawAudio = podcast?.audio_path || podcast?.audio_url || null
    return {
        id: Number(podcast?.id || 0),
        title: podcast?.title || 'Untitled Podcast',
        host,
        duration: podcast?.duration || '--:--',
        tag: podcast?.tag || 'Podcast',
        summary: podcast?.summary || 'No summary provided yet.',
        cover_url: resolvePodcastImage(rawCover),
        audio_url: resolvePodcastImage(rawAudio),
        contributors: contributors.map((contributor: any, idx: number) => ({
            id: Number(contributor?.id || idx),
            name: contributor?.name || 'Contributor',
            role: contributor?.role || '',
            photo_url: resolvePodcastImage(contributor?.photo_path || contributor?.photo_url || null),
        })),
    }
}

const normalizeArticle = (article: any): ArticleItem => {
    const creatorUser = article?.creator_user || article?.creatorUser || null
    const creatorAdmin = article?.creator_admin || article?.creatorAdmin || null
    const author = creatorUser
        ? `${creatorUser.first_name || ''} ${creatorUser.last_name || ''}`.trim()
        : creatorAdmin?.name || 'WGRCFP'
    return {
        id: Number(article?.id || 0),
        title: article?.title || 'Untitled Article',
        summary: stripHtml(article?.summary || article?.content || 'No summary available.').slice(0, 140),
        tag: article?.tag || 'Article',
        cover_url: resolveImage(article?.cover_image || null, defaultArticleCover),
        author: author || 'WGRCFP',
        date: article?.published_at || article?.created_at || '',
    }
}

const randomExternalEventImage = () => {
    const sources = [
        'https://picsum.photos/seed/event-a/900/600',
        'https://picsum.photos/seed/event-c/900/600',
        'https://picsum.photos/seed/event-d/900/600',
        'https://picsum.photos/seed/event-e/900/600',
    ]
    return sources[Math.floor(Math.random() * sources.length)]
}

const normalizeEvent = (event: any) => {
    const numericPrice = toNumber(event?.price)
    const registeredCount = event?.registered_count ?? 0
    const capacity = event?.capacity ?? 0
    return {
        id: event?.id ?? 0,
        title: event?.title || 'Untitled Event',
        slug: event?.slug || '',
        description: stripHtml(event?.description || 'No description available.'),
        short_description: stripHtml(event?.short_description || event?.description || 'No short description available.'),
        featured_image: event?.featured_image ? resolveImage(event.featured_image) : randomExternalEventImage(),
        start_date: event?.start_date || '',
        start_time: event?.start_time || '',
        end_date: event?.end_date || '',
        end_time: event?.end_time || '',
        venue: event?.venue || 'Venue to be announced',
        address: event?.address || 'N/A',
        city: event?.city || 'N/A',
        state: event?.state || 'N/A',
        country: event?.country || 'N/A',
        zip_code: event?.zip_code || 'N/A',
        type: event?.type || 'event',
        status: event?.status || 'published',
        speakers: (event?.speakers || []).map((speaker: any, idx: number) => ({
            id: speaker?.id ?? `${event?.id}-speaker-${idx}`,
            name: speaker?.name || 'Unknown Speaker',
            title: speaker?.title || 'N/A',
            brief: stripHtml(speaker?.brief || 'No details provided.'),
            image: resolveImage(speaker?.image ?? null),
        })),
        meeting_link: event?.meeting_link || 'N/A',
        is_online: Boolean(event?.is_online),
        is_upcoming: Boolean(event?.is_upcoming),
        is_ongoing: Boolean(event?.is_ongoing),
        is_past: Boolean(event?.is_past),
        capacity: event?.capacity ?? 0,
        registered_count: event?.registered_count ?? 0,
        available_slots: Math.max(capacity - registeredCount, 0),
        price: numericPrice,
        currency: event?.currency || 'USD',
        formatted_price: event?.formatted_price || (numericPrice > 0 ? `${event?.currency || 'USD'} ${numericPrice.toFixed(2)}` : 'Free'),
        duration_hours: event?.duration_hours ?? 0,
    }
}

const getBookedCount = (event: any) => {
    if (Number.isFinite(Number(event?.registered_count))) {
        return Number(event.registered_count)
    }
    return Math.max(Number(event?.capacity || 0) - Number(event?.available_slots || 0), 0)
}

const getAvailableSlots = (event: any) => {
    const capacity = Number(event?.capacity || 0)
    if (capacity <= 0) return 0
    if (Number.isFinite(Number(event?.registered_count))) {
        return Math.max(capacity - Number(event.registered_count), 0)
    }
    return Math.max(Number(event?.available_slots || 0), 0)
}

const applyBookingCounts = () => {
    if (!events.value.length) return
    if (!Object.keys(bookingCounts.value).length) return

    events.value = events.value.map((event) => {
        const count = bookingCounts.value[Number(event.id)]
        if (Number.isFinite(count)) {
            const capacity = Number(event.capacity || 0)
            const available = capacity > 0 ? Math.max(capacity - count, 0) : 0
            return {
                ...event,
                registered_count: count,
                available_slots: available,
            }
        }
        return event
    })
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return 'TBD'
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return 'TBD'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatTime = (timeStr: string) => {
    if (!timeStr) return 'TBD'
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    if (Number.isNaN(hour)) return 'TBD'
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${period}`
}

const getDisplaySpeakers = (event: any) => event.speakers?.slice(0, 4) || []

const getStatusLabel = (event: any) => {
    if (event.is_upcoming) return 'upcoming'
    if (event.is_ongoing) return 'ongoing'
    if (event.is_past) return 'completed'
    return 'scheduled'
}

const goToPreviousPage = () => {
    if (currentPage.value > 1) currentPage.value -= 1
}

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value += 1
}

const selectPodcast = (episode: PodcastEpisode) => {
    if (!episode.audio_url) return
    activePodcast.value = episode
    nextTick(() => {
        if (podcastAudioRef.value) {
            podcastAudioRef.value.pause()
            podcastAudioRef.value.load()
            podcastAudioRef.value.play().catch(() => undefined)
        }
    })
}

const addEventToCart = async (event: any) => {
    const eventId = Number(event.id)
    const exists = cartStore.items.some((item) => item.source === 'event' && Number(item.id) === eventId)
    if (exists) {
        await Swal.fire({
            icon: 'info',
            title: 'Already in cart',
            text: `${event.title} is already in your cart.`,
            confirmButtonColor: '#293567'
        })
        return
    }

    try {
        await cartStore.addToCart({
            id: eventId,
            image: event.featured_image || '/images/event-placeholder.svg',
            level: 'Event',
            category: event.type || 'Event',
            title: event.title || 'Untitled Event',
            text: event.short_description || 'No description available.',
            stars: 5,
            rating: 5,
            total_rating: 1,
            duration: `${event.duration_hours || 0} hours`,
            no_of_lectures: 1,
            price: toNumber(event.price),
            source: 'event',
        })

        await Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            text: `${event.title} was added to your cart.`,
            confirmButtonColor: '#293567'
        })
    } catch (error: any) {
        const status = Number(error?.response?.status || 0)
        const message = error?.response?.data?.message || 'Unable to add this event to cart.'
        await Swal.fire({
            icon: status === 409 ? 'info' : 'warning',
            title: status === 409 ? 'Already in cart' : 'Add to cart failed',
            text: message,
            confirmButtonColor: '#293567'
        })
    }
}

const showEventDetails = async (event: any) => {
    const speakerNames = event.speakers?.length
        ? event.speakers.map((speaker: any) => `${speaker.name} (${speaker.title})`).join(', ')
        : 'No speakers listed'

    const detailsHtml = `
        <div style="text-align:left;line-height:1.65">
            <p><strong>Title:</strong> ${escapeHtml(event.title)}</p>
            <p><strong>Type:</strong> ${escapeHtml(event.type)}</p>
            <p><strong>Status:</strong> ${escapeHtml(getStatusLabel(event))}</p>
            <p><strong>Date:</strong> ${escapeHtml(formatDate(event.start_date))} - ${escapeHtml(formatDate(event.end_date))}</p>
            <p><strong>Time:</strong> ${escapeHtml(formatTime(event.start_time))} - ${escapeHtml(formatTime(event.end_time))}</p>
            <p><strong>Venue:</strong> ${escapeHtml(event.venue)}</p>
            <p><strong>Address:</strong> ${escapeHtml(event.address)}, ${escapeHtml(event.city)}, ${escapeHtml(event.state)}, ${escapeHtml(event.country)}</p>
            <p><strong>Online:</strong> ${event.is_online ? 'Yes' : 'No'}</p>
            <p><strong>Meeting Link:</strong> ${escapeHtml(event.meeting_link || 'N/A')}</p>
            <p><strong>Price:</strong> ${escapeHtml(event.formatted_price || 'Free')}</p>
            <p><strong>Capacity:</strong> ${escapeHtml(String(event.registered_count || 0))}/${escapeHtml(String(event.capacity || 0))}</p>
            <p><strong>Speakers:</strong> ${escapeHtml(speakerNames)}</p>
            <p><strong>Description:</strong> ${escapeHtml(event.description || 'No description available.')}</p>
        </div>
    `

    const isPaidEvent = toNumber(event.price) > 0
    const result = await Swal.fire({
        title: event.title || 'Event details',
        html: detailsHtml,
        width: 720,
        showCancelButton: true,
        cancelButtonText: 'Close',
        confirmButtonText: isPaidEvent ? 'Add to Cart' : 'Book Event',
        confirmButtonColor: '#293567'
    })

    if (!result.isConfirmed) return

    if (isPaidEvent) {
        await addEventToCart(event)
        return
    }

    try {
        const res = await api.bookEvent(event.id)

        await Swal.fire({
            icon: 'success',
            title: 'Event booked 🎉',
            text: res?.data?.message || `You booked ${event.title} successfully.`,
            confirmButtonColor: '#293567'
        })

        clearCached('account-events')
        clearCached('account-event-bookings')
        await fetchEvents(true) // refresh counts
        await fetchMyBookings(true)

    } catch (err: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Booking failed',
            text: err?.response?.data?.message || 'Unable to book event.',
            confirmButtonColor: '#293567'
        })
    }
}

const fetchEvents = async (force = false, query = '') => {
    loading.value = true
    try {
        const cacheKey = `account-events:${query || 'all'}`
        if (!force) {
            const cached = getCached<any[]>(cacheKey)
            if (cached) {
                events.value = cached
                return
            }
        }
        const response = await api.events(query ? { q: query } : {})
        const payload = response?.data?.data?.data || []
        events.value = payload.map((event: any) => normalizeEvent(event))
        applyBookingCounts()
        setCached(cacheKey, events.value, 180000)
    } catch (error: any) {
        events.value = []
        await Swal.fire({
            icon: 'error',
            title: 'Unable to load events',
            text: error?.response?.data?.message || 'Please try again.',
            confirmButtonColor: '#293567'
        })
    } finally {
        loading.value = false
    }
}

const fetchMyBookings = async (force = false) => {
    try {
        if (!force) {
            const cached = getCached<any[]>('account-event-bookings')
            if (cached) {
                myBookings.value = cached
                return
            }
        }
        const response = await api.myEventBookings()
        const payload = response?.data?.data || []
        myBookings.value = payload.map((booking: any) => ({
            booking_id: booking.booking_id,
            status: booking.status,
            booked_at: booking.booked_at,
            event: normalizeEvent(booking.event || {}),
        }))
        bookingCounts.value = payload.reduce((acc: Record<number, number>, booking: any) => {
            const eventId = Number(booking?.event?.id || 0)
            const count = Number(booking?.event?.registered_count ?? NaN)
            if (eventId > 0 && Number.isFinite(count)) {
                acc[eventId] = count
            }
            return acc
        }, {})
        applyBookingCounts()
        setCached('account-event-bookings', myBookings.value, 180000)
    } catch (error) {
        myBookings.value = []
    }
}

const fetchArticles = async (force = false, query = '') => {
    articlesLoading.value = true
    try {
        const cacheKey = `account-articles:${query || 'all'}`
        if (!force) {
            const cached = getCached<any[]>(cacheKey)
            if (cached) {
                articles.value = cached
                articlesLoaded.value = true
                return
            }
        }
        const response = await api.articles(query ? { q: query } : {})
        const payload = response?.data?.data?.data || []
        articles.value = payload.map((item: any) => normalizeArticle(item))
        setCached(cacheKey, articles.value, 180000)
        articlesLoaded.value = true
    } catch (error) {
        articles.value = []
    } finally {
        articlesLoading.value = false
    }
}

const fetchPodcasts = async (force = false, query = '', tag = '') => {
    if (podcastsLoaded.value && !force && !query && !tag) return
    if (podcastLoading.value) return
    podcastLoading.value = true
    try {
        const cacheKey = `account-podcasts:${query || 'all'}:${tag || 'all'}`
        if (!force) {
            const cached = getCached<any[]>(cacheKey)
            if (cached) {
                podcastEpisodes.value = cached.map((podcast: any) => normalizePodcast(podcast))
                activePodcast.value = podcastEpisodes.value.find((ep) => ep.audio_url) || podcastEpisodes.value[0] || null
                await fetchPodcastProgress(false)
                applyPodcastProgress()
                podcastsLoaded.value = true
                return
            }
        }

        const params: Record<string, any> = {}
        if (query) params.search = query
        if (tag) params.tag = tag
        const response = await api.podcasts(params)
        const payload = response?.data?.data?.data || []
        podcastEpisodes.value = payload.map((podcast: any) => normalizePodcast(podcast))
        activePodcast.value = podcastEpisodes.value.find((ep) => ep.audio_url) || podcastEpisodes.value[0] || null
        setCached(cacheKey, payload, 180000)
        await fetchPodcastProgress(true)
        applyPodcastProgress()
        podcastsLoaded.value = true
    } catch (error) {
        podcastEpisodes.value = []
    } finally {
        podcastLoading.value = false
    }
}

const fetchPodcastProgress = async (force = false) => {
    if (!force) {
        const cached = getCached<any>('account-podcast-progress')
        if (cached) {
            podcastProgress.value = cached
            return
        }
    }

    try {
        const response = await api.podcastProgress()
        const list = response?.data?.data || []
        const map = list.reduce((acc: Record<number, any>, item: any) => {
            acc[Number(item.podcast_id)] = item
            return acc
        }, {})
        podcastProgress.value = map
        setCached('account-podcast-progress', map, 180000)
    } catch (error) {
        podcastProgress.value = {}
    }
}

const applyPodcastProgress = () => {
    if (!podcastEpisodes.value.length) return
    podcastEpisodes.value = podcastEpisodes.value.map((episode) => {
        const progress = podcastProgress.value[episode.id]
        if (!progress) return episode
        return {
            ...episode,
            last_position_seconds: progress.last_position_seconds || 0,
            progress_seconds: progress.progress_seconds || 0,
            duration_seconds: progress.duration_seconds || 0,
        }
    })
}

const seekToProgress = () => {
    if (!podcastAudioRef.value || !activePodcast.value) return
    const progress = podcastProgress.value[Number(activePodcast.value.id)]
    const position = Number(progress?.last_position_seconds || 0)
    if (position > 2 && podcastAudioRef.value.duration) {
        podcastAudioRef.value.currentTime = Math.min(position, podcastAudioRef.value.duration - 1)
    }
}

const savePodcastProgress = async (isCompleted = false) => {
    if (!activePodcast.value || !podcastAudioRef.value) return
    const duration = Number(podcastAudioRef.value.duration || 0)
    const current = Number(podcastAudioRef.value.currentTime || 0)
    if (!Number.isFinite(current)) return

    try {
        const payload = {
            last_position_seconds: Math.floor(current),
            duration_seconds: duration ? Math.floor(duration) : undefined,
            progress_seconds: Math.floor(current),
            completed: isCompleted,
        }
        await api.podcastUpdateProgress(activePodcast.value.id, payload)
        podcastProgress.value[Number(activePodcast.value.id)] = {
            podcast_id: Number(activePodcast.value.id),
            ...payload,
        }
        setCached('account-podcast-progress', podcastProgress.value, 180000)
    } catch (error) {
        // ignore save errors
    }
}

const bindPodcastAudioEvents = () => {
    if (!podcastAudioRef.value) return
    podcastAudioRef.value.removeEventListener('loadedmetadata', onPodcastLoadedMetadata)
    podcastAudioRef.value.removeEventListener('pause', onPodcastPause)
    podcastAudioRef.value.removeEventListener('ended', onPodcastEnded)
    podcastAudioRef.value.addEventListener('loadedmetadata', onPodcastLoadedMetadata)
    podcastAudioRef.value.addEventListener('pause', onPodcastPause)
    podcastAudioRef.value.addEventListener('ended', onPodcastEnded)
}

const clearPodcastTimer = () => {
    if (podcastProgressTimer) {
        window.clearInterval(podcastProgressTimer)
        podcastProgressTimer = null
    }
}

const onPodcastLoadedMetadata = () => seekToProgress()
const onPodcastPause = () => savePodcastProgress(false)
const onPodcastEnded = () => savePodcastProgress(true)

onMounted(() => {
    cartStore.fetchCart()
    const initialTab = String(route.query.tab || '')
    if (initialTab === 'articles') {
        viewMode.value = 'articles'
    } else if (initialTab === 'podcasts') {
        viewMode.value = 'podcasts'
    }
    fetchEvents()
    fetchMyBookings()
})

watch(viewMode, (value) => {
    if (value === 'podcasts' && !podcastsLoaded.value) {
        fetchPodcasts(false, podcastSearchQuery.value.trim(), activePodcastFilter.value === 'All' ? '' : activePodcastFilter.value)
    }
    if (value === 'articles' && !articlesLoaded.value) {
        fetchArticles(false, articleSearchQuery.value.trim())
    }
    if (value === 'events') {
        fetchEvents(false, searchQuery.value.trim())
    }
})

watch([podcastSearchQuery, activePodcastFilter], () => {
    if (viewMode.value !== 'podcasts') return
    if (podcastSearchTimer) window.clearTimeout(podcastSearchTimer)
    podcastSearchTimer = window.setTimeout(() => {
        const tag = activePodcastFilter.value === 'All' ? '' : activePodcastFilter.value
        fetchPodcasts(false, podcastSearchQuery.value.trim(), tag)
    }, 400)
})

watch(activePodcast, () => {
    clearPodcastTimer()
    if (viewMode.value !== 'podcasts') return
    nextTick(() => {
        bindPodcastAudioEvents()
        podcastProgressTimer = window.setInterval(() => {
            savePodcastProgress(false)
        }, 15000)
    })
})

onBeforeUnmount(() => {
    clearPodcastTimer()
    if (podcastAudioRef.value) {
        podcastAudioRef.value.removeEventListener('loadedmetadata', onPodcastLoadedMetadata)
        podcastAudioRef.value.removeEventListener('pause', onPodcastPause)
        podcastAudioRef.value.removeEventListener('ended', onPodcastEnded)
    }
})
</script>

<style scoped>
.hover-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.avatar-stack {
    display: flex;
    align-items: center;
}

.avatar-stack img {
    transition: transform 0.2s ease;
}

.avatar-stack img:hover {
    transform: scale(1.2);
    z-index: 20 !important;
}

.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
}

.booked-group {
    border: 1px solid #e6ebf8;
    border-radius: 12px;
    padding: 12px;
    background: #fff;
}

.booked-title {
    font-weight: 600;
}

.booked-item {
    border: 1px solid #edf1fb;
    border-radius: 10px;
    padding: 10px;
}

.podcast-section {
    background: linear-gradient(135deg, rgba(41, 53, 103, 0.08), rgba(176, 52, 54, 0.05));
    border: 1px solid #e9ecfb;
}

.podcast-chip {
    padding: 6px 12px;
    border-radius: 999px;
    background: #f1f3ff;
    font-size: 12px;
    color: #2c3767;
}

.podcast-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    gap: 20px;
}

.podcast-list {
    background: #ffffff;
    border-radius: 14px;
    border: 1px solid #e5e7f5;
    padding: 14px;
}

.podcast-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
}

.podcast-filter {
    border: 1px solid #dbe0ff;
    background: #fff;
    color: #2c3767;
    border-radius: 999px;
    padding: 5px 12px;
    font-size: 12px;
    transition: all 0.2s ease;
}

.podcast-filter-active {
    background: #2c3767;
    color: #fff;
    border-color: #2c3767;
}

.podcast-episode-list {
    display: grid;
    gap: 12px;
}

.podcast-episode {
    border: 1px solid #e8ecff;
    background: #fbfcff;
    border-radius: 14px;
    padding: 12px;
    display: grid;
    grid-template-columns: 52px 1fr 30px;
    gap: 12px;
    align-items: center;
    text-align: left;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.podcast-episode:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(31, 43, 90, 0.08);
}

.podcast-episode-active {
    border-color: #cfd6ff;
    background: #f0f3ff;
}

.podcast-episode-disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.podcast-cover {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: #f0f3ff;
}

.podcast-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.podcast-tags {
    display: flex;
    gap: 6px;
}

.podcast-tag {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 999px;
    background: #eef1ff;
    color: #2c3767;
}

.podcast-tag.muted {
    background: #f4f4f4;
    color: #8a92ad;
}

.podcast-icon {
    font-size: 20px;
    color: #2c3767;
}

.podcast-contributors {
    display: flex;
    align-items: center;
}

.podcast-hosts {
    border-top: 1px solid #eef1ff;
    padding-top: 10px;
}

.podcast-host {
    display: flex;
    gap: 8px;
    align-items: center;
    background: #f8f9ff;
    border-radius: 999px;
    padding: 4px 8px 4px 4px;
}

.podcast-host img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
}

.podcast-player {
    position: sticky;
    top: 110px;
    align-self: start;
    display: grid;
    gap: 10px;
}

.podcast-player-card {
    background: #ffffff;
    border-radius: 14px;
    border: 1px solid #e5e7f5;
    padding: 16px;
    box-shadow: 0 12px 24px rgba(31, 43, 90, 0.06);
}

.podcast-badge {
    background: #fff0f0;
    color: #b03436;
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 999px;
}

.podcast-meta {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
}

.podcast-meta-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8089aa;
}

.podcast-meta-value {
    font-weight: 700;
    color: #1f2b5a;
}

.podcast-empty {
    display: grid;
    place-items: center;
    border: 1px dashed #dbe0ff;
    border-radius: 12px;
    padding: 20px;
    color: #7c86a7;
    gap: 6px;
}

.article-section {
    background: linear-gradient(135deg, rgba(41, 53, 103, 0.06), rgba(176, 52, 54, 0.06));
    border: 1px solid #eceffd;
}

.article-chip {
    padding: 6px 12px;
    border-radius: 999px;
    background: #fff3f3;
    font-size: 12px;
    color: #b03436;
}

.article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
}

.article-card {
    background: #fff;
    border: 1px solid #eceffc;
    border-radius: 16px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 140px 1fr;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
    color: inherit;
}

.article-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(31, 43, 90, 0.08);
}

.article-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.article-body {
    padding: 14px;
    display: grid;
    gap: 6px;
}

.article-tag {
    font-size: 11px;
    color: #2c3767;
    background: #eef1ff;
    display: inline-flex;
    padding: 2px 8px;
    border-radius: 999px;
    width: fit-content;
}

.article-summary {
    line-height: 1.4;
}

.article-meta {
    display: flex;
    justify-content: space-between;
    color: #7b85a6;
    font-size: 12px;
}

@media (max-width: 992px) {
    .podcast-grid {
        grid-template-columns: 1fr;
    }

    .podcast-player {
        position: static;
    }
}

@media (max-width: 600px) {
    .podcast-episode {
        grid-template-columns: 48px 1fr;
    }

    .podcast-icon {
        display: none;
    }
}
</style>
