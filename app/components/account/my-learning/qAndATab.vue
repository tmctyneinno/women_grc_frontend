<template>
    <div class="d-flex justify-content-between align-items-center">
        <div class="fw-semibold mb-3">
            Comments
        </div>

    </div>


    <div class="d-flex gap-0">
        <div class="col-0 me-2">
            <NuxtImg src="/images/advisory/sisieta.png" />
        </div>
        <div class="col">
            <textarea class="form-control" placeholder="Write a comment..."></textarea>
        </div>
    </div>




    <!-- section -->
    <section class="mt-5">
        <div v-for="i in 5" class="d-flex gap-0 mb-4">
            <div class="col text-center">
                <NuxtImg src="/images/advisory/chinelo.png" />
            </div>
            <div class="col-10 col-lg-11 small">
                <span class="fw-semibold me-2">
                    Zara N. Quill
                </span>
                <span>
                    This is a fantastic article!
                </span>
                <div class="d-flex gap-2">
                    <span class="bi bi-hand-thumbs-up"></span>
                    <span>120</span>
                    <span class="bi bi-hand-thumbs-down"></span>
                    <span>5</span>
                    <span class="bi bi-chat-left"></span>
                </div>

                <ul class="list-group list-group-flush">
                    <li v-for="i in 2" class="list-group-item ps-0 border-0 py-2">
                        <div class="d-flex gap-0 align-items-cente">
                            <div class=" me-2">
                                <NuxtImg width="24" src="/images/advisory/adenike.png" />
                            </div>
                            <div class="col small">
                                <span class="fw-semibold me-2">
                                    Zara N. Quill
                                </span>
                                <span>
                                    This is a fantastic article!
                                </span>
                                <div class="d-flex gap-2">
                                    <span class="bi bi-hand-thumbs-up"></span>
                                    <span>120</span>
                                    <span class="bi bi-hand-thumbs-down"></span>
                                    <span>5</span>
                                </div>

                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </section>

</template>


<script setup lang="ts">

const myLearningStore = useMyLearningStore()

</script>


<style scoped>
.large-rating {
    font-size: 64px;
    line-height: 1;
    font-weight: 500;
}
</style>