<template>
    <NuxtLayout name="account-layout">
        <div class="container py-4">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <div>
                    <h5 class="fw-bold mb-1">Events Dashboard</h5>
                    <p class="text-muted small mb-0">Manage and explore all registered events</p>
                </div>

                <div class="position-relative" style="max-width: 300px;">
                    <input v-model="searchQuery" type="text" placeholder="Search events..." class="form-control form-control-sm pe-5" />
                    <i class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                </div>
            </div>

            <div class="row g-3 mb-4">
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

            <div class="card border-0 mb-4">
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

            <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold mb-0">All Events</h6>
                        <span class="small text-muted">{{ filteredEvents.length }} total</span>
            </div>

            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-theme" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else-if="filteredEvents.length === 0" class="text-center py-5">
                <div class="mb-3">
                    <i class="bi bi-calendar-x fs-1 text-muted"></i>
                </div>
                <h6>No events found</h6>
                <p class="text-muted small">Try adjusting your search or check back later</p>
            </div>

            <div v-else class="row g-4">
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
                                            {{ event.available_slots }} of {{ event.capacity }} slots available
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
                                            :disabled="event.available_slots === 0"
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

            <div v-if="filteredEvents.length > 0" class="d-flex justify-content-center mt-4">
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

const filteredEvents = computed(() => {
    if (!searchQuery.value) return events.value

    const query = searchQuery.value.toLowerCase()
    return events.value.filter((event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query) ||
        event.speakers?.some((s: any) => s.name.toLowerCase().includes(query))
    )
})

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

watch(searchQuery, () => {
    currentPage.value = 1
})

watch(filteredEvents, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value
    }
})

const apiHost = (import.meta.env.VITE_API_URL || 'https://api.wgrcfp.org').replace(/\/$/, '')

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

const resolveImage = (path: string | null) => {
    if (!path) return '/images/event-placeholder.svg'
    if (path.startsWith('http://')) return path.replace('http://', 'https://')
    if (path.startsWith('https://')) return path
    if (path.startsWith('/storage/')) return `${apiHost}${path}`

    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const normalizedPath = cleanPath.startsWith('storage/') ? cleanPath.slice('storage/'.length) : cleanPath
    return `${apiHost}/storage/${normalizedPath}`
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

const fetchEvents = async (force = false) => {
    loading.value = true
    try {
        if (!force) {
            const cached = getCached<any[]>('account-events')
            if (cached) {
                events.value = cached
                return
            }
        }
        const response = await api.events()
        const payload = response?.data?.data?.data || []
        events.value = payload.map((event: any) => normalizeEvent(event))
        setCached('account-events', events.value, 180000)
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
        setCached('account-event-bookings', myBookings.value, 180000)
    } catch (error) {
        myBookings.value = []
    }
}

onMounted(() => {
    cartStore.fetchCart()
    fetchEvents()
    fetchMyBookings()
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
</style>
