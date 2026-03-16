<template>
    <NuxtLayout name="account-layout">
        <div class="quiz-page">
            <div class="quiz-shell container py-4">
                <div class="quiz-topbar">
                    <div class="d-flex align-items-center gap-2">
                        <NuxtLink :to="`/account/learning-center/${courseId}`" class="quiz-link">
                            <i class="bi bi-arrow-left"></i> Back to Course
                        </NuxtLink>
                        <span class="quiz-divider">|</span>
                        <span class="quiz-kicker">Module Quiz</span>
                    </div>
                    <button class="btn btn-light btn-sm border" @click="loadModule(true)">
                        <i class="bi bi-arrow-clockwise me-1"></i> Refresh
                    </button>
                </div>

                <div v-if="isLoading" class="quiz-loading">
                    <div class="spinner-border text-theme" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="mt-3 text-muted">Loading quiz...</div>
                </div>

                <div v-else-if="error" class="quiz-error">
                    <div class="alert alert-warning">{{ error }}</div>
                </div>

                <div v-else-if="courseData && moduleData" class="quiz-grid">
                    <div class="quiz-hero">
                        <div class="quiz-hero-badge">
                            <span class="quiz-hero-dot"></span>
                            Quiz Session
                        </div>
                        <h2 class="quiz-title">{{ moduleData.title }}</h2>
                        <p class="quiz-subtitle">{{ moduleData.description || courseData.title }}</p>

                        <div class="quiz-meta">
                            <div class="quiz-meta-card">
                                <div class="quiz-meta-label">Questions</div>
                                <div class="quiz-meta-value">{{ quizList.length }}</div>
                            </div>
                            <div class="quiz-meta-card">
                                <div class="quiz-meta-label">Answered</div>
                                <div class="quiz-meta-value">{{ answeredCount }}</div>
                            </div>
                            <div class="quiz-meta-card">
                                <div class="quiz-meta-label">Progress</div>
                                <div class="quiz-meta-value">{{ progressPercent }}%</div>
                            </div>
                        </div>

                        <div class="quiz-progress">
                            <div class="quiz-progress-bar" :style="{ width: `${progressPercent}%` }"></div>
                        </div>

                        <div class="quiz-hero-pill">
                            <div class="quiz-hero-pill-label">Pass Mark</div>
                            <div class="quiz-hero-pill-value">{{ courseData.passing_threshold || 70 }}%</div>
                        </div>

                        <div v-if="!isEnrolled" class="quiz-locked">
                            <div class="quiz-locked-title">Unlock this quiz</div>
                            <div class="quiz-locked-text">
                                Enroll in the course to attempt the quiz and earn completion credit.
                            </div>
                            <button class="btn btn-theme" @click="enrollCourse">
                                <i class="bi bi-unlock me-1"></i> Enroll Now
                            </button>
                        </div>
                    </div>

                    <div class="quiz-panel">
                        <div class="quiz-panel-header">
                            <div>
                                <div class="quiz-panel-title">Assessment Room</div>
                                <div class="quiz-panel-subtitle">Answer each question carefully before submitting.</div>
                            </div>
                            <div class="quiz-panel-chip">
                                <span class="quiz-panel-chip-label">Answered</span>
                                <span class="quiz-panel-chip-value">{{ answeredCount }}/{{ quizList.length }}</span>
                            </div>
                        </div>

                        <div v-if="!quizList.length" class="quiz-empty">
                            <div class="quiz-empty-icon">
                                <i class="bi bi-patch-question"></i>
                            </div>
                            <div class="fw-semibold">No quiz configured</div>
                            <div class="text-muted">Check back later for assessment content.</div>
                            <div v-if="isEnrolled && Number(moduleData?.quizzes_count || 0) > 0" class="text-muted small mt-2">
                                This module has quizzes configured, but none were returned. Try Refresh.
                            </div>
                        </div>

                        <div v-else class="quiz-questions">
                            <div v-for="(quiz, quizIndex) in quizList" :key="quiz.id" class="quiz-card">
                                <div class="quiz-card-header">
                                    <span class="quiz-number">Q{{ quizIndex + 1 }}</span>
                                    <span class="quiz-type">{{ formatQuestionType(quiz.question_type) }}</span>
                                </div>
                                <div class="quiz-question">{{ getQuestionText(quiz) }}</div>

                                <div v-if="isChoiceQuestion(quiz)" class="quiz-options">
                                    <button
                                        v-for="(opt, optIndex) in getDisplayOptions(quiz)"
                                        :key="String(opt)"
                                        class="quiz-option"
                                        :class="quizAnswers[quiz.id] === String(opt) ? 'quiz-option-active' : ''"
                                        @click="setAnswer(quiz.id, String(opt))"
                                    >
                                        <span class="quiz-option-label">{{ getOptionLabel(optIndex) }}</span>
                                        <span>{{ opt }}</span>
                                    </button>
                                </div>

                                <textarea
                                    v-else
                                    class="form-control quiz-textarea"
                                    rows="3"
                                    :value="quizAnswers[quiz.id] || ''"
                                    placeholder="Type your answer..."
                                    @input="setAnswer(quiz.id, ($event.target as HTMLTextAreaElement).value)"
                                ></textarea>
                            </div>

                            <div class="quiz-action">
                                <button class="btn btn-theme btn-lg" :disabled="!isEnrolled || isSubmitting" @click="submitQuiz">
                                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                                    Submit Quiz
                                </button>
                                <div v-if="quizResult" class="quiz-result">
                                    <span class="fw-semibold">Score:</span> {{ quizResult.score }}% |
                                    <span :class="quizResult.passed ? 'text-success' : 'text-danger'">
                                        {{ quizResult.passed ? 'Passed' : 'Not passed' }}
                                    </span>
                                </div>
                                <div class="text-muted small">
                                    Module completion is automatic only after passing the quiz.
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

const route = useRoute()
const courseId = computed(() => String(route.params.course || ''))
const moduleId = computed(() => String(route.params.module || ''))

const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref('')
const courseData = ref<any>(null)
const moduleData = ref<any>(null)
const myCourses = ref<any[]>([])
const enrollment = ref<any>(null)
const quizAnswers = ref<Record<string, string>>({})
const quizResult = ref<any>(null)

const unwrapPayload = (res: any) => res?.data?.data
const getCollection = (payload: any) => Array.isArray(payload) ? payload : (payload?.data || [])
const getQuizCollection = (payload: any) => {
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload?.data)) return payload.data
    return []
}

const quizList = computed(() => getQuizCollection(moduleData.value?.quizzes))
const isEnrolled = computed(() => !!enrollment.value)
const answeredCount = computed(() => Object.values(quizAnswers.value).filter(Boolean).length)
const progressPercent = computed(() => {
    if (!quizList.value.length) return 0
    return Math.min(100, Math.round((answeredCount.value / quizList.value.length) * 100))
})

const loadModule = async (force = false) => {
    if (!courseId.value || !moduleId.value) return
    isLoading.value = true
    error.value = ''

    try {
        const [courseRes, myCourseRes] = await Promise.all([
            api.learningCourseDetails(courseId.value),
            api.learningMyCourses(),
        ])

        courseData.value = unwrapPayload(courseRes)
        myCourses.value = getCollection(unwrapPayload(myCourseRes))
        enrollment.value = myCourses.value.find((item: any) => Number(item.course_id) === Number(courseId.value)) || null

        const modules = courseData.value?.modules || []
        moduleData.value = modules.find((mod: any) => String(mod.id) === moduleId.value) || null
        quizAnswers.value = {}
        quizResult.value = force ? null : quizResult.value

        if (!moduleData.value) {
            error.value = 'Module not found.'
        }
    } catch (err: any) {
        error.value = err?.response?.data?.message || 'Unable to load quiz.'
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
        await loadModule(true)
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

const normalizeQuestionType = (value: any) => {
    return String(value || '').toLowerCase().replace(/[\s-]/g, '_')
}

const formatQuestionType = (value: any) => {
    const normalized = normalizeQuestionType(value)
    if (!normalized) return 'Question'
    return normalized.replace(/_/g, ' ')
}

const isChoiceQuestion = (quiz: any) => {
    const normalized = normalizeQuestionType(quiz?.question_type)
    return ['multiple_choice', 'true_false', 'boolean', 'mcq'].includes(normalized)
}

const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index] || String(index + 1)
}

const normalizeOptions = (quiz: any) => {
    const normalizedType = normalizeQuestionType(quiz?.question_type)
    if (normalizedType === 'true_false' || normalizedType === 'boolean') {
        return ['True', 'False']
    }

    const raw = quiz?.options
    if (Array.isArray(raw)) {
        return raw.map((opt: any) => String(opt)).filter(Boolean)
    }
    if (typeof raw === 'string') {
        const trimmed = raw.trim()
        if (!trimmed) return []
        try {
            const parsed = JSON.parse(trimmed)
            if (Array.isArray(parsed)) {
                return parsed.map((opt: any) => String(opt)).filter(Boolean)
            }
        } catch (err) {
            return trimmed.split(',').map((opt) => opt.trim()).filter(Boolean)
        }
    }
    if (raw && typeof raw === 'object') {
        const preferredKeys = ['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd', '0', '1', '2', '3']
        const collected: string[] = []
        preferredKeys.forEach((key) => {
            if (raw[key]) {
                collected.push(String(raw[key]))
            }
        })
        if (collected.length) return collected
        return Object.values(raw).map((opt) => String(opt)).filter(Boolean)
    }
    return []
}

const getDisplayOptions = (quiz: any) => {
    return normalizeOptions(quiz).slice(0, 4)
}

const getQuestionText = (quiz: any) => {
    return quiz?.question || quiz?.question_text || quiz?.title || 'Question'
}

const setAnswer = (quizId: string | number, answer: string) => {
    quizAnswers.value = {
        ...quizAnswers.value,
        [String(quizId)]: answer
    }
}

const submitQuiz = async () => {
    if (!moduleId.value) return
    try {
        isSubmitting.value = true
        const answers = quizAnswers.value || {}
        const res = await api.learningSubmitModuleQuiz(courseId.value, moduleId.value, { answers })
        quizResult.value = unwrapPayload(res)

        const passed = Boolean(quizResult.value?.passed)
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
    } finally {
        isSubmitting.value = false
    }
}

onMounted(loadModule)
</script>

<style scoped>
.quiz-page {
    --quiz-primary: #1f2b5a;
    --quiz-accent: #b03436;
    --quiz-ink: #111827;
    --quiz-muted: #5f6988;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", sans-serif;
    background:
        radial-gradient(circle at 12% 8%, rgba(31, 43, 90, 0.12), transparent 42%),
        radial-gradient(circle at 90% 15%, rgba(176, 52, 54, 0.12), transparent 38%),
        linear-gradient(135deg, #f7f8ff 0%, #ffffff 50%, #f1f3ff 100%);
    min-height: 100vh;
}

.quiz-shell {
    animation: quizFade 0.4s ease;
}

.quiz-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
}

.quiz-link {
    color: var(--quiz-primary);
    text-decoration: none;
    font-weight: 600;
}

.quiz-divider {
    color: #9aa4c3;
    font-size: 12px;
}

.quiz-kicker {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #7e88a8;
}

.quiz-grid {
    display: grid;
    grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
    gap: 24px;
}

.quiz-hero {
    background: linear-gradient(140deg, #1f2b5a 0%, #2d3f7c 55%, #1c2650 100%);
    color: #f7f7ff;
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 18px 40px rgba(31, 43, 90, 0.25);
    position: sticky;
    top: 110px;
    align-self: start;
}

.quiz-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ffe7e7;
}

.quiz-hero-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ffd1d1;
    box-shadow: 0 0 12px rgba(255, 209, 209, 0.8);
}

.quiz-title {
    font-family: "Georgia", "Times New Roman", serif;
    font-size: 28px;
    margin: 8px 0 6px;
}

.quiz-subtitle {
    color: #d7ddf5;
    margin-bottom: 16px;
}

.quiz-meta {
    display: grid;
    gap: 10px;
}

.quiz-meta-card {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 10px 12px;
}

.quiz-meta-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #cad2f3;
}

.quiz-meta-value {
    font-size: 20px;
    font-weight: 700;
}

.quiz-progress {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    height: 8px;
    margin: 14px 0;
    overflow: hidden;
}

.quiz-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #f8d9da, #ffd480);
    border-radius: 999px;
    transition: width 0.3s ease;
}

.quiz-hero-pill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.12);
    padding: 8px 12px;
    margin-bottom: 10px;
}

.quiz-hero-pill-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #cad2f3;
}

.quiz-hero-pill-value {
    font-weight: 700;
}

.quiz-locked {
    margin-top: 16px;
    background: rgba(255, 255, 255, 0.14);
    border-radius: 12px;
    padding: 12px;
}

.quiz-locked-title {
    font-weight: 700;
}

.quiz-locked-text {
    color: #d7ddf5;
    margin: 6px 0 12px;
    font-size: 14px;
}

.quiz-panel {
    background: #ffffff;
    border-radius: 18px;
    padding: 22px;
    box-shadow: 0 18px 40px rgba(31, 43, 90, 0.08);
}

.quiz-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
}

.quiz-panel-title {
    font-weight: 700;
    color: #1f2b5a;
}

.quiz-panel-subtitle {
    font-size: 13px;
    color: #7a83a3;
}

.quiz-panel-chip {
    background: #f2f5ff;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 12px;
    color: #1f2b5a;
    display: inline-flex;
    gap: 6px;
    align-items: center;
}

.quiz-panel-chip-label {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 10px;
    color: #7a83a3;
}

.quiz-panel-chip-value {
    font-weight: 700;
}

.quiz-card {
    border: 1px solid #e6e9f6;
    border-radius: 16px;
    padding: 18px;
    background: #fbfcff;
    margin-bottom: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.quiz-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(31, 43, 90, 0.12);
}

.quiz-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.quiz-number {
    background: #f0f3ff;
    color: #2d3f7c;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 700;
}

.quiz-type {
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 10px;
    color: #9aa4c3;
}

.quiz-question {
    font-weight: 600;
    color: var(--quiz-ink);
    margin-bottom: 12px;
}

.quiz-options {
    display: grid;
    gap: 10px;
}

.quiz-option {
    border: 1px solid #dbe3ff;
    border-radius: 12px;
    padding: 10px 12px;
    text-align: left;
    background: #fff;
    color: #2b3a6f;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.quiz-option:hover {
    transform: translateY(-1px);
    border-color: #a8baff;
}

.quiz-option-active {
    border-color: #1f2b5a;
    background: #eef2ff;
}

.quiz-option-label {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #e7edff;
    color: #1f2b5a;
    font-size: 12px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.quiz-textarea {
    border-radius: 12px;
    border: 1px solid #dbe3ff;
}

.quiz-action {
    margin-top: 16px;
    display: grid;
    gap: 10px;
}

.quiz-result {
    font-size: 14px;
}

.quiz-empty {
    text-align: center;
    padding: 40px 20px;
}

.quiz-empty-icon {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: #eef2ff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #2b3a6f;
    font-size: 24px;
    margin-bottom: 12px;
}

.quiz-loading,
.quiz-error {
    display: grid;
    justify-items: center;
    padding: 40px 0;
}

@keyframes quizFade {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 992px) {
    .quiz-grid {
        grid-template-columns: 1fr;
    }

    .quiz-hero {
        position: static;
    }

    .quiz-panel-header {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
