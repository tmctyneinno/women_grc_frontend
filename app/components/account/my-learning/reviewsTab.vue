<template>
    <div class="d-flex justify-content-between align-items-center">
        <div class="fw-semibold mb-3">
            Learners Feedback
        </div>

        <div>
            <button @click="myLearningStore.toggleNewReviewModal" class="btn btn-theme btn-sm">Give Rating</button>
        </div>

    </div>

    <!-- large rating section -->
    <div class="row g-3  align-items-center">
        <div class="col-8 col-lg-2 text-lg-cente ps-lg-4">
            <div class="large-rating"> 4.8</div>

            <RatingStar v-for="i in 5" class="mx-1" />
            <div>Course Rating</div>
        </div>
        <div class="col-lg-8">
            <ul class="list-group list-group-flush">
                <li v-for="progress in progresses" class="list-group-item border-0 p-0">
                    <div class="row g-2 align-items-center">
                        <div class="col-4">
                            <CustomProgress :height="7" :width="progress.width" color-class="bg-theme"
                                :rounded="false" />
                        </div>
                        <div class="col">
                            <RatingStar class="me-2 xsmall" v-for="value in 5" /> {{ progress.width }}%
                        </div>
                    </div>

                </li>
            </ul>
        </div>
    </div>


    <!-- reviews section -->
    <section class="mt-5">
        <div v-for="i in 5" class="d-flex gap-0 mb-4">
            <div class="col text-center">
                <NuxtImg src="/images/advisory/chinelo.png" />
            </div>
            <div class="col-10 col-lg-11 small">
                <div class="fw-semibold">
                    John Doe
                </div>
                <div class="xsmall text-muted">
                    2 days ago
                    <RatingStar class="me-1" v-for="value in 2" />
                </div>
                <div>
                    This course is beneficial and informative. I have learned much about UI/UX design from scratch
                    to final. Especially thanks to Daniel Schifano for his UI/UX design effort. I also thank Andrei
                    Neagoie for the Web Development course. I wish the success of this course in the future.
                </div>
                <div class="d-flex gap-2">
                    <span class="bi bi-hand-thumbs-up"></span>
                    <span>120</span>
                    <span class="bi bi-hand-thumbs-down"></span>
                    <span>5</span>
                </div>
            </div>
        </div>
    </section>



    <!-- modal -->
    <AccountMyLearningNewReviewModal />

</template>


<script setup lang="ts">

const myLearningStore = useMyLearningStore()



const progresses = [
    { width: 60 },
    { width: 29 },
    { width: 8 },
    { width: 2 },
    { width: 1 },
]

</script>


<style scoped>
.large-rating {
    font-size: 64px;
    line-height: 1;
    font-weight: 500;
}
</style>