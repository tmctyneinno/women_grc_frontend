<template>
    <NuxtLayout name="account-layout">
        <div class="container py-3 course-detail-page">
            <div class="mb-3">
                <NuxtLink to="/account/learning-center" class="small text-decoration-none text-theme">
                    <i class="bi bi-arrow-left"></i> Back to Learning Center
                </NuxtLink>
            </div>

            <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-theme" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <template v-else-if="courseData">
                <div class="course-header p-4 p-lg-5 mb-4">
                    <div class="d-lg-flex justify-content-between align-items-start gap-3">
                        <div>
                            <div class="small text-uppercase header-meta mb-1">{{ courseData.category || 'General' }}</div>
                            <h3 class="fw-bold mb-2">{{ courseData.title }}</h3>
                            <p class="mb-3">{{ courseData.description || 'No description provided.' }}</p>
                            <div class="small d-flex flex-wrap gap-2">
                                <span class="header-pill">{{ courseData.modules?.length || 0 }} modules</span>
                                <span class="header-pill">{{ totalQuizzes }} quizzes</span>
                                <span class="header-pill">{{ courseData.navigation_mode === 'locked' ? 'Locked progression' : 'Free navigation' }}</span>
                                <span class="header-pill">{{ courseData.has_certificate ? 'Certificate eligible' : 'No certificate' }}</span>
                            </div>
                        </div>

                        <div class="enroll-box mt-3 mt-lg-0">
                            <div class="fw-semibold mb-1">
                                {{ courseData.is_paid ? (courseData.currency + ' ' + formatMoney(courseData.price)) : 'Free Course' }}
                            </div>
                            <div class="small text-muted mb-3">
                                {{ isEnrolled ? 'You are enrolled in this course.' : 'Enroll to unlock lessons and quizzes.' }}
                            </div>

                            <button v-if="isEnrolled" class="btn btn-success btn-sm w-100" disabled>
                                <i class="bi bi-check-circle me-1"></i> Enrolled
                            </button>

                            <button v-else-if="isPaidCourse" class="btn btn-theme btn-sm w-100 mb-2" @click="addCourseToCart">
                                <i class="bi bi-cart-plus me-1"></i> Add to Cart
                            </button>

                            <button v-if="!isEnrolled && !isPaidCourse" class="btn btn-theme btn-sm w-100" @click="enrollCourse">
                                <i class="bi bi-journal-check me-1"></i> Enroll Now
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-4">
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Progress</div>
                            <div class="metric-value">{{ enrollment?.completion_percentage || 0 }}%</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Status</div>
                            <div class="metric-value text-capitalize">{{ enrollment?.status || 'not enrolled' }}</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Time Spent</div>
                            <div class="metric-value">{{ enrollment?.time_spent_minutes || 0 }}m</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="metric-card h-100">
                            <div class="metric-title">Pass Threshold</div>
                            <div class="metric-value">{{ courseData.passing_threshold || 70 }}%</div>
                        </div>
                    </div>
                </div>

                <div class="card border-0 mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="fw-semibold">Course Modules</div>
                            <span class="badge text-bg-light border">{{ totalQuizzes }} total quizzes</span>
                        </div>

                        <div class="row g-3">
                            <div v-for="module in courseData.modules" :key="module.id" class="col-12 col-md-6">
                                <div class="module-summary-card h-100">
                                    <div class="fw-semibold mb-1">{{ module.title }}</div>
                                    <div class="small text-muted mb-2">{{ module.description || 'Module details unlock after enrollment.' }}</div>
                                    <div class="d-flex flex-wrap gap-2 small">
                                        <span class="summary-pill">{{ Number(module.quizzes_count ?? (module.quizzes || []).length) }} quizzes</span>
                                        <span class="summary-pill">{{ courseData.has_certificate ? 'Certificate path' : 'No certificate' }}</span>
                                    </div>

                                    <div class="mt-3">
                                        <button v-if="isEnrolled"
                                                class="btn btn-outline-theme btn-sm"
                                                :disabled="!(module.quizzes || []).length"
                                                @click="goToQuiz(module.id)">
                                            <i class="bi bi-rocket-takeoff me-1"></i> Start Quiz
                                        </button>
                                        <button v-else class="btn btn-theme btn-sm" @click="isPaidCourse ? addCourseToCart() : enrollCourse()">
                                            <i class="bi bi-lock me-1"></i> {{ isPaidCourse ? 'Add to Cart to Unlock' : 'Enroll to Unlock' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="isEnrolled" class="card border-0">
                    <div class="card-body">
                        <div class="fw-semibold mb-3">Learning Workspace</div>

                        <div class="lesson-viewer card border-0 mb-4">
                            <div class="card-body">
                                <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                                    <div>
                                        <div class="fw-semibold">{{ selectedLesson?.title || 'Select a lesson to begin' }}</div>
                                        <div class="small text-muted">
                                            {{ selectedLesson?.moduleTitle || 'Choose a module lesson to view its content.' }}
                                        </div>
                                    </div>
                                    <span v-if="selectedLesson?.type" class="badge text-bg-light border text-capitalize">
                                        {{ selectedLesson?.type }}
                                    </span>
                                </div>

                                <div v-if="selectedLesson" class="viewer-body">
                                    <div v-if="lessonMediaUrl && isVideoUrl(lessonMediaUrl)" class="media-shell">
                                        <video class="w-100 rounded-3" controls :src="lessonMediaUrl"></video>
                                    </div>
                                    <div v-else-if="lessonMediaUrl && isAudioUrl(lessonMediaUrl)" class="media-shell">
                                        <audio class="w-100" controls :src="lessonMediaUrl"></audio>
                                    </div>
                                    <div v-else-if="lessonMediaUrl && isPdfUrl(lessonMediaUrl)" class="media-shell">
                                        <iframe class="w-100 rounded-3" :src="lessonMediaUrl" title="Lesson resource"></iframe>
                                    </div>
                                    <div v-else-if="lessonMediaUrl" class="media-shell">
                                        <a :href="lessonMediaUrl" target="_blank" class="btn btn-sm btn-light border">
                                            Open Resource
                                        </a>
                                    </div>

                                    <div v-if="selectedLesson?.content" class="lesson-content" v-html="selectedLesson.content"></div>
                                    <div v-else-if="!lessonMediaUrl" class="text-muted small">
                                        No lesson content is available yet.
                                    </div>
                                </div>
                                <div v-else class="text-muted small">Select a lesson to view text or video content.</div>
                            </div>
                        </div>

                        <div v-for="module in courseData.modules" :key="module.id" :id="`quiz-${module.id}`" class="module-card mb-3">
                            <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                                <div>
                                    <div class="fw-semibold">{{ module.title }}</div>
                                    <div class="small text-muted">{{ module.description || 'No module description yet.' }}</div>
                                </div>
                                <span class="badge text-bg-light border">{{ Number(module.quizzes_count ?? (module.quizzes || []).length) }} quiz items</span>
                            </div>

                            <div class="small fw-semibold mb-2">Lessons</div>
                            <div v-if="!(module.lessons || []).length" class="small text-muted mb-3">No lessons in this module yet.</div>
                            <div v-else class="d-grid gap-2 mb-3">
                                <div v-for="lesson in module.lessons" :key="lesson.id" class="lesson-row"
                                     :class="{ 'lesson-row-active': selectedLesson?.id === lesson.id }">
                                    <div>
                                        <div class="fw-medium">{{ lesson.title }}</div>
                                        <div class="small text-muted text-capitalize">{{ lesson.type }}</div>
                                    </div>
                                    <button class="btn btn-sm btn-outline-theme"
                                            type="button"
                                            @click="selectLesson(module, lesson)">
                                        View
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2 mt-2">
                                <button v-if="isEnrolled"
                                        class="btn btn-theme btn-sm"
                                        :disabled="!(module.quizzes || []).length"
                                        @click="goToQuiz(module.id)">
                                    <i class="bi bi-rocket-takeoff me-1"></i> Start Quiz
                                </button>
                                <button v-else class="btn btn-theme btn-sm" @click="isPaidCourse ? addCourseToCart() : enrollCourse()">
                                    <i class="bi bi-lock me-1"></i> {{ isPaidCourse ? 'Add to Cart to Unlock' : 'Enroll to Unlock' }}
                                </button>
                                <span v-if="!(module.quizzes || []).length" class="small text-muted align-self-center">
                                    No quiz configured.
                                </span>
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
import { useCartStore } from '~/stores/cart-store'

definePageMeta({
    middleware: 'account-route-middleware',
})

const route = useRoute()
const courseId = computed(() => String(route.params.course || ''))

const isLoading = ref(false)
const courseData = ref<any>(null)
const myCourses = ref<any[]>([])
const enrollment = ref<any>(null)
const cartStore = useCartStore()

const unwrapPayload = (res: any) => res?.data?.data
const getCollection = (payload: any) => Array.isArray(payload) ? payload : (payload?.data || [])
const isEnrolled = computed(() => !!enrollment.value)
const isPaidCourse = computed(() => Boolean(courseData.value?.is_paid && Number(courseData.value?.price || 0) > 0))

const totalQuizzes = computed(() => {
    const modules = courseData.value?.modules || []
    return modules.reduce((sum: number, mod: any) => sum + Number(mod.quizzes_count ?? (mod.quizzes || []).length), 0)
})

const selectedLesson = ref<any>(null)
const lessonMediaUrl = computed(() => selectedLesson.value?.file_url || selectedLesson.value?.file_path || '')

const isVideoUrl = (value: string) => /(\.mp4|\.webm|\.ogg|\.mov|\.m4v)$/i.test(value || '')
const isAudioUrl = (value: string) => /(\.mp3|\.wav|\.ogg|\.m4a)$/i.test(value || '')
const isPdfUrl = (value: string) => /(\.pdf)$/i.test(value || '')

const formatMoney = (value: any) => {
    const number = Number(value ?? 0)
    return Number.isFinite(number) ? number.toFixed(2) : '0.00'
}

const selectLesson = (module: any, lesson: any) => {
    selectedLesson.value = {
        ...lesson,
        moduleTitle: module?.title || 'Module',
    }
}

const loadCourse = async () => {
    if (!courseId.value) return

    isLoading.value = true
    try {
        const [courseRes, myCourseRes] = await Promise.all([
            api.learningCourseDetails(courseId.value),
            api.learningMyCourses(),
        ])

        courseData.value = unwrapPayload(courseRes)
        myCourses.value = getCollection(unwrapPayload(myCourseRes))
        enrollment.value = myCourses.value.find((item: any) => Number(item.course_id) === Number(courseId.value)) || null

        const modules = courseData.value?.modules || []
        const firstLesson = modules.flatMap((module: any) => module.lessons || [])[0]
        if (firstLesson) {
            const module = modules.find((m: any) => (m.lessons || []).some((lesson: any) => lesson.id === firstLesson.id))
            selectLesson(module, firstLesson)
        } else {
            selectedLesson.value = null
        }
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Unable to load course',
            text: error?.response?.data?.message || 'Please try again later.',
            confirmButtonColor: '#293567',
        })
    } finally {
        isLoading.value = false
    }
}

const enrollCourse = async () => {
    try {
        const res = await api.learningEnroll(courseId.value)
        enrollment.value = unwrapPayload(res)
        await Swal.fire({
            icon: 'success',
            title: 'Enrollment successful',
            text: 'Modules and quizzes are now unlocked for you.',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Unable to enroll now.'
        await Swal.fire({
            icon: 'warning',
            title: 'Enrollment blocked',
            text: message,
            confirmButtonColor: '#293567',
        })
    }
}

const addCourseToCart = async () => {
    if (!courseData.value) return

    try {
        await cartStore.addToCart({
            id: Number(courseData.value.id),
            source: 'course',
            category: courseData.value.category || 'Course',
            title: courseData.value.title || 'Course',
            price: Number(courseData.value.price || 0),
            image: '/images/WGRC-logo.png',
            level: 'Course',
        })
        await Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            text: `${courseData.value.title} has been added to your cart.`,
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        const status = Number(error?.response?.status || 0)
        const message = error?.response?.data?.message || 'Unable to add this course to cart.'
        await Swal.fire({
            icon: status === 409 ? 'info' : 'warning',
            title: status === 409 ? 'Already in cart' : 'Add to cart failed',
            text: message,
            confirmButtonColor: '#293567',
        })
    }
}

const goToQuiz = async (moduleId: number) => {
    await navigateTo(`/account/learning-center/${courseId.value}/quiz/${moduleId}`)
}

onMounted(loadCourse)
</script>

<style scoped>
.course-detail-page {
    --detail-primary: #293567;
}

.course-header {
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

.enroll-box {
    width: min(260px, 100%);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.95);
    color: #25315f;
    padding: 12px;
}

.metric-card {
    background: #fff;
    border: 1px solid #e5eaf8;
    border-radius: 12px;
    padding: 12px;
}

.metric-title {
    color: #6e789a;
    font-size: 12px;
    text-transform: uppercase;
}

.metric-value {
    font-weight: 700;
    font-size: 22px;
    color: var(--detail-primary);
}

.module-summary-card {
    border: 1px solid #e6ebf9;
    border-radius: 12px;
    background: #fff;
    padding: 12px;
}

.summary-pill {
    border-radius: 999px;
    border: 1px solid #e4eaf9;
    background: #f8faff;
    color: #576188;
    padding: 2px 10px;
}

.module-card {
    border: 1px solid #e4e9f8;
    border-radius: 12px;
    padding: 12px;
    background: #fff;
}

.lesson-row {
    border: 1px solid #e8ecfa;
    border-radius: 10px;
    padding: 9px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.lesson-row-active {
    border-color: #c9d5ff;
    background: #f6f8ff;
}

.lesson-viewer {
    background: linear-gradient(180deg, #ffffff 0%, #f7f9ff 100%);
    border-radius: 16px;
    border: 1px solid #e4e9f8;
}

.viewer-body {
    display: grid;
    gap: 16px;
}

.media-shell iframe {
    min-height: 420px;
    border: none;
}

.lesson-content {
    background: #ffffff;
    border: 1px solid #e8ecfa;
    border-radius: 12px;
    padding: 16px;
}


.btn-outline-theme {
    border: 1px solid #c8d6ff;
    color: #30458a;
}

.btn-outline-theme:hover {
    background: #edf2ff;
    color: #253b73;
}
</style>

