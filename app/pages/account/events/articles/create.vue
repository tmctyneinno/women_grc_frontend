<template>
    <NuxtLayout name="account-layout">
        <div class="submit-hero">
            <div class="container py-5">
                <NuxtLink class="btn btn-sm btn-ghost" to="/account/events?tab=articles">
                    <i class="bi bi-arrow-left"></i> Back to Articles
                </NuxtLink>
                <div class="mt-4">
                    <div class="text-uppercase small text-white-50">Community Stories</div>
                    <h1 class="display-6 fw-bold text-white mb-2">Submit an Article</h1>
                    <p class="text-white-50 mb-0">
                        Share your insights with the community. Every submission is reviewed before it goes live.
                    </p>
                </div>
            </div>
        </div>

        <div class="container submit-body">
            <div class="row g-4">
                <div class="col-lg-7">
                    <div class="card border-0 shadow-sm form-card">
                        <div class="card-body">
                            <div v-if="successMessage" class="alert alert-success">
                                {{ successMessage }}
                            </div>
                            <div v-if="errorMessage" class="alert alert-danger">
                                {{ errorMessage }}
                            </div>

                            <form @submit.prevent="handleSubmit">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Title *</label>
                                    <input
                                        v-model="form.title"
                                        type="text"
                                        class="form-control"
                                        placeholder="Write a compelling title"
                                    />
                                    <div v-if="errors.title" class="small text-danger mt-1">{{ errors.title }}</div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Tag</label>
                                    <input
                                        v-model="form.tag"
                                        type="text"
                                        class="form-control"
                                        placeholder="e.g. Event Recap, Leadership, ESG"
                                    />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Summary</label>
                                    <textarea
                                        v-model="form.summary"
                                        class="form-control"
                                        rows="3"
                                        maxlength="500"
                                        placeholder="Short overview that will appear in the article card"
                                    ></textarea>
                                    <div class="d-flex justify-content-between small text-muted mt-1">
                                        <span>Optional but recommended</span>
                                        <span>{{ summaryCount }}/500</span>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Cover Image (optional)</label>
                                    <input
                                        type="file"
                                        class="form-control"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        @change="onCoverChange"
                                    />
                                    <div class="form-text">Recommended size: 1200 × 675 px (16:9).</div>
                                    <div v-if="coverPreview" class="cover-preview mt-3">
                                        <img :src="coverPreview" alt="Cover preview" />
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Article Content *</label>
                                    <textarea
                                        v-model="form.content"
                                        class="form-control content-input"
                                        rows="9"
                                        placeholder="Write your full article here..."
                                    ></textarea>
                                    <div v-if="errors.content" class="small text-danger mt-1">{{ errors.content }}</div>
                                </div>

                                <div class="d-flex flex-wrap gap-2 align-items-center">
                                    <button type="submit" class="btn btn-theme" :disabled="submitting">
                                        <span v-if="submitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Submit for Review
                                    </button>
                                    <span class="small text-muted">We will notify you once it is approved.</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-lg-5">
                    <div class="guidelines-card">
                        <h6 class="fw-bold mb-3">Submission Tips</h6>
                        <ul class="guidelines-list">
                            <li>Keep the headline clear and specific.</li>
                            <li>Use short paragraphs for readability.</li>
                            <li>Summaries help readers decide what to open.</li>
                            <li>Articles are reviewed for quality and relevance.</li>
                        </ul>
                        <div class="info-box mt-4">
                            <i class="bi bi-shield-check"></i>
                            <div>
                                <div class="fw-semibold">Pending Review</div>
                                <div class="small text-muted">
                                    Your article will remain pending until an admin approves it.
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
import api from '~/api'
import { useAccountCache } from '~/composables/useAccountCache'

definePageMeta({
    middleware: 'account-route-middleware',
})

const { clearCached } = useAccountCache()

const form = reactive({
    title: '',
    tag: '',
    summary: '',
    content: '',
})
const coverFile = ref<File | null>(null)
const coverPreview = ref<string>('')

const errors = reactive<{ title?: string; content?: string }>({})
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const summaryCount = computed(() => form.summary.length)

const validate = () => {
    errors.title = ''
    errors.content = ''

    if (!form.title.trim()) {
        errors.title = 'Title is required.'
    }
    if (!form.content.trim()) {
        errors.content = 'Content is required.'
    }

    return !errors.title && !errors.content
}

const resetForm = () => {
    form.title = ''
    form.tag = ''
    form.summary = ''
    form.content = ''
    coverFile.value = null
    if (coverPreview.value) {
        URL.revokeObjectURL(coverPreview.value)
        coverPreview.value = ''
    }
}

const onCoverChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0] || null
    coverFile.value = file
    if (coverPreview.value) {
        URL.revokeObjectURL(coverPreview.value)
    }
    coverPreview.value = file ? URL.createObjectURL(file) : ''
}

onBeforeUnmount(() => {
    if (coverPreview.value) {
        URL.revokeObjectURL(coverPreview.value)
    }
})

const handleSubmit = async () => {
    errorMessage.value = ''
    successMessage.value = ''

    if (!validate()) return

    submitting.value = true
    try {
        const payload = new FormData()
        payload.append('title', form.title.trim())
        payload.append('content', form.content.trim())
        if (form.tag.trim()) payload.append('tag', form.tag.trim())
        if (form.summary.trim()) payload.append('summary', form.summary.trim())
        if (coverFile.value) payload.append('cover_image', coverFile.value)

        await api.createArticle(payload)
        successMessage.value = 'Thanks! Your article has been submitted and is pending approval.'
        clearCached('account-articles:all')
        resetForm()
    } catch (error: any) {
        errorMessage.value = error?.response?.data?.message || 'Unable to submit article. Please try again.'
    } finally {
        submitting.value = false
    }
}
</script>

<style scoped>
.submit-hero {
    background: linear-gradient(135deg, #1b2555 0%, #2c3f86 55%, #45294b 100%);
    color: #fff;
}

.btn-ghost {
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #fff;
    background: transparent;
}

.btn-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
}

.submit-body {
    margin-top: -40px;
    padding-bottom: 48px;
}

.form-card {
    border-radius: 18px;
}

.content-input {
    min-height: 220px;
}

.cover-preview {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e2e6f7;
    box-shadow: 0 10px 20px rgba(33, 44, 86, 0.1);
}

.cover-preview img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
}

.guidelines-card {
    background: #fff;
    border-radius: 18px;
    border: 1px solid #eef1ff;
    padding: 22px;
    box-shadow: 0 12px 28px rgba(26, 35, 74, 0.08);
}

.guidelines-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
}

.guidelines-list li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    color: #2a3563;
}

.guidelines-list li::before {
    content: '•';
    color: #b03436;
    font-weight: 700;
}

.info-box {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    background: #f7f3ff;
    border-radius: 12px;
    padding: 14px;
    align-items: center;
}

.info-box i {
    font-size: 24px;
    color: #6b4b8c;
}

@media (max-width: 992px) {
    .submit-body {
        margin-top: 0;
    }
}
</style>
