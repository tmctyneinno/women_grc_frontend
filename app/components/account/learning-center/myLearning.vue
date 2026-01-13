<template>
    <div class="card border-0">
        <div class="card-body">
            <div>
                <span class="fw-semibold">My Learning
                </span>
                <nuxt-link v-if="!isAll" class="float-end text-theme text-decoration-none hover-tiltX"
                    to="/account/my-learning">
                    View All
                </nuxt-link>
            </div>

            <div class="row g-3 mt-2">
                <div v-for="(card, index) in cards" :key="index" class="col-lg-3 col-md-6">
                    <div class="card small h-100">
                        <NuxtImg class="card-img-top" src="/images/account/learning/image.png" alt="img" />
                        <div class="card-body pb-0">
                            <span :class="card.level + '-class'" class="badge rounded-pill  fw-normal mb-2">
                                {{ card.level }}
                            </span>

                            <span class="mx-2 badge rounded-pill bg-secondary-subtle text-muted fw-normal mb-2">
                                {{ card.type }}
                            </span>

                            <div class="fw-semibold mb-2">
                                {{ card.title }}
                            </div>
                            <div class="mb-2">
                                {{ card.info }}
                            </div>


                        </div>
                        <div class="card-footer border-0 bg-transparent">
                            <CustomProgress class="mb-2" :height="5" :width="25" color-class="bg-theme" />

                            <button @click="goToCourseContent" class="btn btn-theme w-100 btn-sm">Continue
                                Learning</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps({
    isAll: {
        type: Boolean,
        default: false
    }
})


const cards = ref<{ level: string, type: string, title: string, info: string }[]>([
    { level: 'Beginner', type: 'Reading Materials', title: 'ESG Governance Excellence', info: 'Master advanced environmental social, and governance frameworks for modern enterprises.' },
    { level: 'Intermediate', type: 'Interactive Workshop', title: 'AI-Powered Risk Analytics', info: 'Learn to implement artificial intelligence tools for enhanced risk assessment and monitoring' },
    { level: 'Advanced', type: 'Video Series', title: 'GRC Leadership Fundamentals', info: 'Build essential leadership skills for effective governance, risk, and compliance management' },
    { level: 'Advanced', type: 'Video Series', title: 'GRC Leadership Fundamentals', info: 'Build essential leadership skills for effective governance, risk, and compliance management' },
])



function goToCourseContent() {
    const id = new Date().getTime()
    navigateTo(`/account/my-learning/details?id=${id}`)
}

</script>

<style scoped>
.Beginner-class {
    background-color: #F1F5FF;
    color: #293567;
}

.Intermediate-class {
    background-color: #FFF8E5;
    color: #A68947;
}

.Advanced-class {
    background-color: #EAF9F5;
    color: #2C5F3F;
}
</style>