<template>
    <div class="card border-0">
        <div class="card-body">
            <div class="col-12 d-lg-flex gap-2 justify-content-lg-between">
                <div class="fw-semibold">
                    Course Catalog
                </div>

                <div class="d-lg-flex gap-3 xsmall text-theme">
                    <div>
                        Course tags:
                        <span class="dropdown">
                            <span class=" dropdown-toggle fw-semibold" type="button" id="courseTags"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                All <i class="bi bi-chevron-down"></i>
                            </span>
                            <div class="dropdown-menu dropdown-menu-start" aria-labelledby="courseTags">
                                <span v-for="option in selectOptions.courseTags" class="dropdown-item cursor-pointer">
                                    {{ option.label }}
                                </span>
                            </div>
                        </span>
                    </div>

                    <div>
                        Course Delivery:
                        <span class="dropdown">
                            <span class=" dropdown-toggle fw-semibold" type="button" id="courseDelivery"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                All <i class="bi bi-chevron-down"></i>
                            </span>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="courseDelivery">
                                <span v-for="option in selectOptions.courseDelivery"
                                    class="dropdown-item cursor-pointer">
                                    {{ option.label }}
                                </span>
                            </div>
                        </span>
                    </div>

                    <div>
                        Course Categories:
                        <span class="dropdown">
                            <span class=" dropdown-toggle fw-semibold" type="button" id="courseCategories"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                All <i class="bi bi-chevron-down"></i>
                            </span>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="courseCategories">
                                <span v-for="option in selectOptions.courseCategories"
                                    class="dropdown-item cursor-pointer">
                                    {{ option.label }}
                                </span>
                            </div>
                        </span>
                    </div>


                    <div>
                        Levels:
                        <span class="dropdown">
                            <span class=" dropdown-toggle fw-semibold" type="button" id="levels"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                All <i class="bi bi-chevron-down"></i>
                            </span>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="levels">
                                <span v-for="option in selectOptions.levels" class="dropdown-item cursor-pointer">
                                    {{ option.label }}
                                </span>
                            </div>
                        </span>
                    </div>

                </div>
            </div>


            <div class="row g-3 mt-2">
                <div v-for="(card, index) in cards" :key="index" class="col-lg-3 col-md-4">
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
                            <div class="mb-2 small">
                                <RatingStar class="me-1" v-for="i in 5" />
                                <span class="text-muted">
                                    4.8 (245)
                                </span>
                                <span class="float-end">
                                    24 hours
                                </span>
                            </div>

                            <CustomProgress class="mb-2" :height="5" :width="25" color-class="bg-theme" />

                            <div class="row justify-content-center align-items-center">
                                <div class="col-8">
                                    <button class="btn btn-theme btn-sm w-100">Enrol now</button>
                                </div>
                                <div class="col-4 fw-semibold">
                                    {{ card.price }}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const cards = ref<{ level: string, type: string, title: string, info: string, price: string }[]>([
    { level: 'Beginner', type: 'Reading Materials', title: 'ESG Governance Excellence', info: 'Master advanced environmental social, and governance frameworks for modern enterprises.', price: '$150.99' },
    { level: 'Intermediate', type: 'Interactive Workshop', title: 'AI-Powered Risk Analytics', info: 'Learn to implement artificial intelligence tools for enhanced risk assessment and monitoring', price: '$150.99' },
    { level: 'Advanced', type: 'Video Series', title: 'GRC Leadership Fundamentals', info: 'Build essential leadership skills for effective governance, risk, and compliance management', price: '$150.99' },
    { level: 'Advanced', type: 'Video Series', title: 'GRC Leadership Fundamentals', info: 'Build essential leadership skills for effective governance, risk, and compliance management', price: '$150.99' },
])



const selectOptions = {
    courseTags: [
        { id: 1, label: 'All', value: 'all' },
        { id: 2, label: 'Free', value: 'free' },
        { id: 3, label: 'Paid', value: 'paid' },
        { id: 4, label: 'Third Party Courses', value: 'third_party' },
    ],
    courseDelivery: [
        { id: 1, label: 'All', value: 'all' },
        { id: 2, label: 'Video Series', value: 'video_series' },
        { id: 3, label: 'Reading Materials', value: 'reading_materials' },
        { id: 4, label: 'Interactive Workshops', value: 'interactive_workshops' },
    ],

    courseCategories: [
        { id: 1, label: 'All', value: 'all' },
        { id: 1, label: 'ESG Governance', value: 'all' },
        { id: 1, label: 'Risk Management', value: 'all' },
        { id: 1, label: 'Compliance Frameworks', value: 'all' },
        { id: 1, label: 'Risk Management Strategies', value: 'all' },
        { id: 1, label: 'Regulatory Requirements', value: 'all' },
        { id: 1, label: 'Data Protection Policies', value: 'all' },
        { id: 1, label: 'Incident Response Plans', value: 'all' },
        { id: 1, label: 'Audit Procedures', value: 'all' },
        { id: 1, label: 'Leadership Development', value: 'all' },
    ],

    levels: [
        { id: 1, label: 'All', value: 'all' },
        { id: 2, label: 'Beginner', value: 'beginner' },
        { id: 3, label: 'Intermediate', value: 'intermediate' },
        { id: 4, label: 'Advanced', value: 'advanced' },
    ],

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

.dropdown-menu {
    font-size: small;
}
</style>
