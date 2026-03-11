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
                                                @click="goToQuiz(module.id)">
                                            <i class="bi bi-arrow-down-circle me-1"></i> Go to Quiz
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
                                <div v-for="lesson in module.lessons" :key="lesson.id" class="lesson-row">
                                    <div>
                                        <div class="fw-medium">{{ lesson.title }}</div>
                                        <div class="small text-muted text-capitalize">{{ lesson.type }}</div>
                                    </div>
                                    <a v-if="lesson.file_url || lesson.file_path"
                                       :href="lesson.file_url || lesson.file_path"
                                       target="_blank"
                                       class="btn btn-sm btn-light border">
                                        Resource
                                    </a>
                                </div>
                            </div>

                            <div class="fw-semibold mb-2" style="color:#b03436">Module Quiz</div>
                            <div v-if="!(module.quizzes || []).length" class="small text-muted">No quiz configured.</div>
                            <div v-else>
                                <div v-for="(quiz, quizIndex) in module.quizzes" :key="quiz.id" class="quiz-card mb-2">
                                    <div class="fw-medium mb-2">Q{{ quizIndex + 1 }}. {{ quiz.question }}</div>

                                    <div v-if="quiz.question_type === 'multiple_choice' || quiz.question_type === 'true_false'" class="quiz-options-list">
                                        <button
                                            v-for="(opt, optIndex) in getDisplayOptions(quiz)"
                                            :key="String(opt)"
                                            class="quiz-option-btn"
                                            :class="quizAnswers[module.id]?.[quiz.id] === opt ? 'quiz-option-active' : ''"
                                            @click="setAnswer(module.id, quiz.id, String(opt))"
                                        >
                                            <span class="option-label">{{ getOptionLabel(optIndex) }}</span>
                                            <span>{{ opt }}</span>
                                        </button>
                                    </div>

                                    <input
                                        v-else
                                        :value="quizAnswers[module.id]?.[quiz.id] || ''"
                                        class="form-control form-control-sm"
                                        placeholder="Type your answer"
                                        @input="setAnswer(module.id, quiz.id, ($event.target as HTMLInputElement).value)"
                                    >
                                </div>

                                <button class="btn btn-theme btn-sm mt-2" @click="submitQuiz(module.id)">
                                    Submit Quiz
                                </button>

                                <div v-if="quizResultByModule[module.id]" class="small mt-2">
                                    <span class="fw-semibold">Score:</span> {{ quizResultByModule[module.id].score }}% ·
                                    <span :class="quizResultByModule[module.id].passed ? 'text-success' : 'text-danger'">
                                        {{ quizResultByModule[module.id].passed ? 'Passed' : 'Not passed' }}
                                    </span>
                                </div>
                                <div class="small text-muted mt-1">
                                    Module completion is automatic only after passing the quiz.
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
const quizAnswers = ref<Record<string, Record<string, string>>>({})
const quizResultByModule = ref<Record<string, any>>({})
const cartStore = useCartStore()

const unwrapPayload = (res: any) => res?.data?.data
const getCollection = (payload: any) => Array.isArray(payload) ? payload : (payload?.data || [])
const isEnrolled = computed(() => !!enrollment.value)
const isPaidCourse = computed(() => Boolean(courseData.value?.is_paid && Number(courseData.value?.price || 0) > 0))

const totalQuizzes = computed(() => {
    const modules = courseData.value?.modules || []
    return modules.reduce((sum: number, mod: any) => sum + Number(mod.quizzes_count ?? (mod.quizzes || []).length), 0)
})

const formatMoney = (value: any) => {
    const number = Number(value ?? 0)
    return Number.isFinite(number) ? number.toFixed(2) : '0.00'
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

const setAnswer = (moduleId: number, quizId: number, answer: string) => {
    const moduleKey = String(moduleId)
    const quizKey = String(quizId)
    if (!quizAnswers.value[moduleKey]) quizAnswers.value[moduleKey] = {}
    quizAnswers.value[moduleKey][quizKey] = answer
}

const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index] || String(index + 1)
}

const getDisplayOptions = (quiz: any) => {
    if (quiz?.question_type === 'true_false') {
        return ['True', 'False']
    }
    const options = Array.isArray(quiz?.options) ? quiz.options : []
    return options.slice(0, 4)
}

const goToQuiz = async (moduleId: number) => {
    await nextTick()
    const target = document.getElementById(`quiz-${moduleId}`)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const submitQuiz = async (moduleId: number) => {
    try {
        const moduleKey = String(moduleId)
        const answers = quizAnswers.value[moduleKey] || {}
        const res = await api.learningSubmitModuleQuiz(courseId.value, moduleId, { answers })
        quizResultByModule.value[moduleKey] = unwrapPayload(res)
        await loadCourse()

        const passed = Boolean(quizResultByModule.value[moduleKey]?.passed)
        await Swal.fire({
            icon: passed ? 'success' : 'warning',
            title: passed ? 'Quiz passed' : 'Quiz not passed',
            text: passed
                ? 'Module has been marked complete automatically.'
                : 'Retake the quiz to continue course completion.',
            confirmButtonColor: '#293567',
        })
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Quiz submission failed',
            text: error?.response?.data?.message || 'Please check your answers and retry.',
            confirmButtonColor: '#293567',
        })
    }
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

.quiz-card {
    border: 1px solid #e8ecfa;
    border-radius: 10px;
    padding: 10px;
    background: #fcfdff;
}

.quiz-options-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
}

.quiz-option-btn {
    border: 1px solid #dce4fb;
    border-radius: 10px;
    background: #fff;
    color: #2f3f75;
    padding: 8px 10px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 8px;
}

.quiz-option-active {
    border-color: #293567;
    background: #eef2ff;
}

.option-label {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #edf2ff;
    color: #2e427f;
    font-size: 12px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
