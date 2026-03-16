<template>
    <NuxtLayout name="account-layout">
        <div class="container py-3 learning-page">
            <div class="learning-hero p-4 p-md-5 mb-4">
                <div class="d-lg-flex justify-content-between align-items-end gap-3">
                    <div>
                        <div class="small text-uppercase fw-semibold hero-kicker mb-1">Learning Center</div>
                        <h3 class="fw-bold mb-2">Build mastery in GRC and Financial Crime Prevention</h3>
                        <p class="mb-0">
                            Explore structured courses, track your progress, unlock certificates, and climb the leaderboard.
                        </p>
                    </div>
                    <div class="mt-3 mt-lg-0 d-flex flex-wrap gap-2">
                        <NuxtLink to="/account/learning-center" class="btn btn-theme btn-sm">
                            Course Catalog
                        </NuxtLink>
                        <button class="btn btn-light btn-sm border" @click="loadDashboardData(true)">
                            <i class="bi bi-arrow-clockwise me-1"></i> Refresh
                        </button>
                    </div>
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-6 col-md-3">
                    <div class="metric-card h-100">
                            <div class="metric-title">My Catalog</div>
                            <div class="metric-value">{{ myCatalogCourses.length }}</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card h-100">
                        <div class="metric-title">My Enrollments</div>
                        <div class="metric-value">{{ myCourses.length }}</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card h-100">
                        <div class="metric-title">Achievements</div>
                        <div class="metric-value">{{ achievements.length }}</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card h-100">
                        <div class="metric-title">Leaderboard Rank</div>
                        <div class="metric-value">{{ myLeaderboardRankText }}</div>
                    </div>
                </div>
            </div>

            <div class="card border-0 mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                        <div class="fw-semibold">
                            {{ activeCatalogTab === 'my' ? 'Course Catalog (Enrolled Courses)' : 'Discover Courses' }}
                        </div>
                        <div class="search-wrap">
                            <i class="bi bi-search text-muted"></i>
                            <input v-model="searchText" class="form-control form-control-sm" placeholder="Search by title, category, or tag">
                        </div>
                    </div>

                    <div class="catalog-tabs mt-3 mb-2">
                        <button
                            class="catalog-tab-btn"
                            :class="{ 'catalog-tab-active': activeCatalogTab === 'my' }"
                            @click="activeCatalogTab = 'my'"
                        >
                            My Courses
                        </button>
                        <button
                            class="catalog-tab-btn"
                            :class="{ 'catalog-tab-active': activeCatalogTab === 'discover' }"
                            @click="activeCatalogTab = 'discover'"
                        >
                            Discover Courses
                        </button>
                    </div>

                    <div v-if="isLoadingCourses" class="text-center py-5">
                        <div class="spinner-border text-theme" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <div v-else class="row g-3 mt-1">
                            <div v-for="course in filteredCourses" :key="course.id" class="col-md-6 col-xl-4">
                                <div class="course-card h-100">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <span class="badge bg-theme-subtle text-theme fw-semibold">
                                        {{ course.category || 'General' }}
                                    </span>
                                    <span class="badge" :class="course.is_paid ? 'text-bg-warning' : 'text-bg-success'">
                                        {{ course.is_paid ? (course.currency + ' ' + formatMoney(course.price)) : 'Free' }}
                                    </span>
                                </div>

                                <h6 class="fw-semibold mb-1">{{ course.title }}</h6>
                                <p class="small text-muted mb-3 line-clamp-3">{{ course.description || 'No description provided yet.' }}</p>

                                    <div class="small d-flex flex-wrap gap-2 mb-3">
                                        <span class="tiny-pill">{{ course.modules_count || 0 }} modules</span>
                                        <span class="tiny-pill">{{ course.enrollments_count || 0 }} enrolled</span>
                                        <span v-if="course.enrollment_status" class="tiny-pill">{{ course.enrollment_status }}</span>
                                        <span v-else class="tiny-pill">{{ isCourseEnrolled(course.id) ? 'enrolled' : 'not enrolled' }}</span>
                                        <span class="tiny-pill">{{ course.navigation_mode === 'locked' ? 'Locked path' : 'Free navigation' }}</span>
                                    </div>

                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <div class="d-flex gap-2">
                                        <NuxtLink :to="`/account/learning-center/${course.id}`" class="btn btn-theme btn-sm">
                                            {{ isCourseEnrolled(course.id) ? 'Resume Course' : 'View Course' }}
                                        </NuxtLink>
                                        <button
                                            v-if="activeCatalogTab === 'discover' && !isCourseEnrolled(course.id)"
                                            class="btn btn-outline-theme btn-sm"
                                            @click="quickEnroll(course)"
                                        >
                                            {{ course.is_paid ? 'Add to Cart' : 'Quick Enroll' }}
                                        </button>
                                    </div>
                                    <div class="small text-muted">{{ course.has_certificate ? 'Certificate eligible' : 'No certificate' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="!isLoadingCourses && filteredCourses.length === 0" class="text-center py-5 text-muted">
                        {{ activeCatalogTab === 'my' ? 'You have not enrolled in any courses yet.' : 'No discoverable courses found for this filter.' }}
                    </div>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-lg-7">
                    <div class="card border-0 h-100">
                        <div class="card-body">
                            <div class="fw-semibold mb-3">My Courses</div>
                            <div v-if="myCourses.length === 0" class="small text-muted">You have not enrolled in any course yet.</div>
                            <div v-else class="d-grid gap-2">
                                <div v-for="item in myCourses" :key="item.id" class="my-course-item">
                                    <div>
                                        <div class="fw-medium">{{ item.course?.title }}</div>
                                        <div class="small text-muted">
                                            {{ item.completion_percentage }}% complete ·
                                            {{ item.status }}
                                        </div>
                                    </div>
                                    <NuxtLink :to="`/account/learning-center/${item.course_id}`" class="btn btn-outline-theme btn-sm">
                                        Resume
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-5">
                    <div class="card border-0 h-100">
                        <div class="card-body">
                            <div class="fw-semibold mb-3">Top Learners</div>
                            <div v-if="leaderboard.length === 0" class="small text-muted">Leaderboard will appear once points are earned.</div>
                            <div v-else class="d-grid gap-2">
                                <div v-for="(row, idx) in leaderboard.slice(0, 5)" :key="row.user_id" class="leader-row">
                                    <div>
                                        <span class="rank">{{ idx + 1 }}</span>
                                        <span class="fw-medium">{{ row.first_name }} {{ row.last_name }}</span>
                                    </div>
                                    <div class="fw-semibold">{{ row.total_points }} pts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card border-0 mt-3">
                <div class="card-body">
                    <div class="fw-semibold mb-3">Certificates & Achievements</div>
                    <div v-if="certificateError" class="alert alert-warning mb-3">
                        {{ certificateError }}
                    </div>
                    <div v-if="!certificateError && achievements.length === 0" class="small text-muted">
                        No certificates yet. Complete a certificate-enabled course to see it here.
                    </div>
                    <div v-else class="row g-2">
                        <div v-for="cert in achievements" :key="cert.id" class="col-md-6 col-xl-4">
                            <div class="cert-card">
                                <div class="fw-medium mb-1">{{ cert.course?.title }}</div>
                                <div class="small text-muted mb-2">Issued: {{ formatDateTime(cert.issued_at) }}</div>
                                <div class="small text-truncate">Code: {{ cert.certificate_code }}</div>
                                <div class="d-flex gap-2 mt-2">
                                    <button class="btn btn-outline-theme btn-sm" @click="verifyCertificate(cert.verification_code)">
                                        Verify
                                    </button>
                                    <button class="btn btn-light border btn-sm" @click="previewCertificate(cert)">
                                        Preview
                                    </button>
                                    <button class="btn btn-theme btn-sm" @click="downloadCertificate(cert)">
                                        Download PDF
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
import { useCartStore } from '~/stores/cart-store'
import { useAccountCache } from '~/composables/useAccountCache'

definePageMeta({
    middleware: 'account-route-middleware',
})

type CourseRow = {
    id: number
    title: string
    description?: string
    category?: string
    tags?: string[]
    has_certificate?: boolean
    modules_count?: number
    enrollments_count?: number
    navigation_mode?: string
    is_paid?: boolean
    price?: number
    currency?: string
    enrollment_status?: string
    completion_percentage?: number
    enrollment_id?: number
}

const courses = ref<CourseRow[]>([])
const myCatalogCourses = ref<CourseRow[]>([])
const discoverCourses = ref<CourseRow[]>([])
const myCourses = ref<any[]>([])
const leaderboard = ref<any[]>([])
const achievements = ref<any[]>([])
const certificateError = ref('')
const isLoadingCourses = ref(false)
const searchText = ref('')
const activeCatalogTab = ref<'my' | 'discover'>('my')
const cartStore = useCartStore()
const { getCached, setCached, clearCached } = useAccountCache()
let courseSearchTimer: number | null = null

const unwrapPayload = (res: any) => res?.data?.data
const getCollection = (payload: any) => Array.isArray(payload) ? payload : (payload?.data || [])

const filteredCourses = computed(() => {
    return activeCatalogTab.value === 'my' ? myCatalogCourses.value : discoverCourses.value
})

const enrolledCourseIds = computed(() => {
    return new Set(
        myCourses.value
            .map((item: any) => Number(item.course_id))
            .filter((id: number) => Number.isFinite(id) && id > 0)
    )
})

const myLeaderboardRankText = computed(() => {
    if (!leaderboard.value.length) return 'N/A'

    const authStore = useAuthStore()
    const myId = authStore.userData?.id
    if (!myId) return 'N/A'

    const index = leaderboard.value.findIndex((row: any) => Number(row.user_id) === Number(myId))
    return index >= 0 ? `#${index + 1}` : 'N/A'
})

const formatMoney = (value: any) => {
    const number = Number(value ?? 0)
    return Number.isFinite(number) ? number.toFixed(2) : '0.00'
}

const formatDateTime = (value: string | null | undefined) => {
    if (!value) return '-'
    return new Date(value).toLocaleString()
}

const loadMyCourses = async (force = false, query = '') => {
    isLoadingCourses.value = true
    try {
        const cacheKey = `account-learning-my:${query || 'all'}`
        if (!force) {
            const cached = getCached<{
                myCourses: any[]
                myCatalogCourses: CourseRow[]
                courses: CourseRow[]
            }>(cacheKey)
            if (cached) {
                myCourses.value = cached.myCourses
                myCatalogCourses.value = cached.myCatalogCourses
                courses.value = cached.courses
                return
            }
        }
        const res = await api.learningMyCourses(query ? { q: query } : {})
        const payload = unwrapPayload(res)
        myCourses.value = getCollection(payload)
        myCatalogCourses.value = myCourses.value
            .map((item: any) => ({
                ...(item.course || {}),
                enrollment_status: item.status,
                completion_percentage: item.completion_percentage,
                enrollment_id: item.id,
            }))
            .filter((course: any) => Number(course.id) > 0)
        courses.value = myCatalogCourses.value
        setCached(cacheKey, {
            myCourses: myCourses.value,
            myCatalogCourses: myCatalogCourses.value,
            courses: courses.value
        }, 180000)
    } catch (error) {
        myCourses.value = []
        myCatalogCourses.value = []
        courses.value = []
        console.error('learningMyCourses failed:', error)
        const message = (error as any)?.response?.data?.message || 'Unable to load your enrolled/completed courses.'
        await Swal.fire({
            icon: 'warning',
            title: 'Courses unavailable',
            text: message,
            confirmButtonColor: '#293567',
        })
    } finally {
        isLoadingCourses.value = false
    }
}

const loadDiscoverCourses = async (force = false, query = '') => {
    try {
        const cacheKey = `account-learning-discover:${query || 'all'}`
        if (!force) {
            const cached = getCached<CourseRow[]>(cacheKey)
            if (cached) {
                discoverCourses.value = cached
                return
            }
        }
        const res = await api.learningCourses(query ? { q: query } : {})
        const payload = unwrapPayload(res)
        discoverCourses.value = getCollection(payload)
        setCached(cacheKey, discoverCourses.value, 300000)
    } catch (error) {
        discoverCourses.value = []
    }
}

const loadLeaderboard = async (force = false) => {
    try {
        if (!force) {
            const cached = getCached<any[]>('account-learning-leaderboard')
            if (cached) {
                leaderboard.value = cached
                return
            }
        }
        const res = await api.learningLeaderboard()
        const payload = unwrapPayload(res)
        leaderboard.value = getCollection(payload)
        setCached('account-learning-leaderboard', leaderboard.value, 300000)
    } catch (error) {
        leaderboard.value = []
    }
}

const loadAchievements = async (force = false) => {
    try {
        certificateError.value = ''
        if (!force) {
            const cached = getCached<any[]>('account-learning-achievements')
            if (cached) {
                achievements.value = cached
                return
            }
        }
        const res = await api.learningAchievements()
        achievements.value = getCollection(unwrapPayload(res))
        setCached('account-learning-achievements', achievements.value, 300000)
    } catch (error) {
        achievements.value = []
        console.error('learningAchievements failed:', error)
        const message = (error as any)?.response?.data?.message || 'Unable to load certificates right now.'
        certificateError.value = message
    }
}

const verifyCertificate = async (code: string) => {
    if (!code) return

    try {
        const res = await api.learningVerifyCertificate(code)
        const data = unwrapPayload(res)
        await Swal.fire({
            icon: 'success',
            title: 'Certificate Verified',
            html: `
                <div class="text-start">
                    <div><strong>Learner:</strong> ${data?.user?.first_name || ''} ${data?.user?.last_name || ''}</div>
                    <div><strong>Course:</strong> ${data?.course?.title || ''}</div>
                    <div><strong>Certificate:</strong> ${data?.certificate_code || ''}</div>
                </div>
            `,
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Verification Failed',
            text: error?.response?.data?.message || 'Unable to verify this certificate.',
            confirmButtonColor: '#293567',
        })
    }
}

const fetchCertificateBlob = async (cert: any) => {
    const response = await api.learningDownloadCertificate(cert.id)
    const contentType = response.headers['content-type'] || 'application/octet-stream'
    const blob = new Blob([response.data], { type: contentType })
    return { response, blob }
}

const previewCertificate = async (cert: any) => {
    try {
        const { blob } = await fetchCertificateBlob(cert)
        const url = window.URL.createObjectURL(blob)
        const opened = window.open(url, '_blank')

        if (!opened) {
            await Swal.fire({
                icon: 'info',
                title: 'Popup blocked',
                text: 'Allow popups to preview certificate in a new tab.',
                confirmButtonColor: '#293567',
            })
        }

        setTimeout(() => window.URL.revokeObjectURL(url), 120000)
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Preview failed',
            text: error?.response?.data?.message || 'Unable to preview certificate right now.',
            confirmButtonColor: '#293567',
        })
    }
}

const downloadCertificate = async (cert: any) => {
    try {
        const { response, blob } = await fetchCertificateBlob(cert)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        const disposition = response.headers['content-disposition'] || ''
        const match = disposition.match(/filename="?([^"]+)"?/)
        const isPdf = String(response.headers['content-type'] || '').includes('pdf')
        const fallbackExt = isPdf ? 'pdf' : 'html'
        const filename = match?.[1] || `certificate-${cert.certificate_code || cert.id}.${fallbackExt}`
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => window.URL.revokeObjectURL(url), 120000)
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Download failed',
            text: error?.response?.data?.message || 'Unable to download certificate right now.',
            confirmButtonColor: '#293567',
        })
    }
}

const loadDashboardData = async (force = false) => {
    const query = searchText.value.trim()
    await Promise.all([
        loadMyCourses(force, query),
        loadDiscoverCourses(force, query),
        loadLeaderboard(force),
        loadAchievements(force),
    ])
}

const isCourseEnrolled = (courseId: number) => enrolledCourseIds.value.has(Number(courseId))

const quickEnroll = async (course: CourseRow) => {
    if (course.is_paid && Number(course.price || 0) > 0) {
        try {
            await cartStore.addToCart({
                id: course.id,
                source: 'course',
                category: course.category || 'Course',
                title: course.title,
                price: Number(course.price || 0),
                image: '/images/WGRC-logo.png',
                level: 'Course',
            })
            await Swal.fire({
                icon: 'success',
                title: 'Added to cart',
                text: `${course.title} has been added to your cart.`,
                confirmButtonColor: '#293567',
            })
            return
        } catch (error: any) {
            const status = Number(error?.response?.status || 0)
            const message = error?.response?.data?.message || 'Unable to add this course to cart.'
            await Swal.fire({
                icon: status === 409 ? 'info' : 'warning',
                title: status === 409 ? 'Already in cart' : 'Add to cart failed',
                text: message,
                confirmButtonColor: '#293567',
            })
            return
        }
    }

    try {
        await api.learningEnroll(course.id)
        const query = searchText.value.trim()
        clearCached(`account-learning-my:${query || 'all'}`)
        clearCached('account-learning-my:all')
        await loadMyCourses(true, query)
        await Swal.fire({
            icon: 'success',
            title: 'Enrolled successfully',
            text: `You are now enrolled in ${course.title}.`,
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Unable to enroll in this course right now.'
        const status = Number(error?.response?.status || 0)

        if (status === 402 || status === 403) {
            await Swal.fire({
                icon: 'info',
                title: 'Enrollment needs extra step',
                text: `${message} You will be redirected to course details.`,
                confirmButtonColor: '#293567',
            })
            await navigateTo(`/account/learning-center/${course.id}`)
            return
        }

        await Swal.fire({
            icon: 'warning',
            title: 'Enrollment failed',
            text: message,
            confirmButtonColor: '#293567',
        })
    }
}

onMounted(loadDashboardData)

watch(searchText, () => {
    if (courseSearchTimer) window.clearTimeout(courseSearchTimer)
    courseSearchTimer = window.setTimeout(() => {
        const query = searchText.value.trim()
        if (activeCatalogTab.value === 'my') {
            loadMyCourses(false, query)
        } else {
            loadDiscoverCourses(false, query)
        }
    }, 400)
})

watch(activeCatalogTab, (value) => {
    const query = searchText.value.trim()
    if (value === 'my') {
        loadMyCourses(false, query)
    } else {
        loadDiscoverCourses(false, query)
    }
})
</script>

<style scoped>
.learning-page {
    --learning-primary: #293567;
    --learning-accent: #b03436;
}

.learning-hero {
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
    color: var(--learning-primary);
    margin-top: 8px;
}

.search-wrap {
    position: relative;
    width: 260px;
}

.search-wrap i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
}

.search-wrap input {
    padding-left: 30px;
}

.course-card {
    display: flex;
    flex-direction: column;
    border-radius: 14px;
    border: 1px solid #e5eaf8;
    background: #ffffff;
    padding: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.course-card:hover {
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

.my-course-item,
.leader-row {
    border: 1px solid #e6ebf8;
    border-radius: 12px;
    padding: 10px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.rank {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    background: #edf2ff;
    color: #334789;
    font-weight: 700;
    font-size: 12px;
}

.cert-card {
    border: 1px solid #e2e9fb;
    border-radius: 12px;
    background: #fff;
    padding: 12px;
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

.catalog-tabs {
    display: inline-flex;
    gap: 6px;
    background: #f3f6ff;
    border: 1px solid #dfe7ff;
    border-radius: 999px;
    padding: 4px;
}

.catalog-tab-btn {
    border: none;
    background: transparent;
    color: #41558f;
    font-size: 13px;
    font-weight: 600;
    border-radius: 999px;
    padding: 6px 12px;
}

.catalog-tab-active {
    background: #293567;
    color: #fff;
}

@media (max-width: 576px) {
    .search-wrap {
        width: 100%;
    }
}
</style>
