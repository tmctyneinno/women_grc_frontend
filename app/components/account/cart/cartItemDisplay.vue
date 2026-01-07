<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="row g-2 g-lg-0 justify-content-lg-center align-items-lg-center">
                <div class="col-lg-3 col-md-4">
                    <div class="image-box" :style="{ background: `url(${item.image}) center/cover no-repeat` }">
                    </div>
                </div>

                <div class="col-lg-9">
                    <div class="card border-0 bg-transparent p-0">
                        <div class="card-header bg-transparent border-0 p-0">
                            <div @click="emit('remove', item.id)"
                                class="float-end small cursor-pointer hover-tiltY text-danger">
                                Remove
                            </div>
                        </div>
                        <div class="card-body">
                            <span class="badge rounded-pill tag tag-level me-2">{{ item.level }}</span>
                            <span class="badge rounded-pill tag tag-type">{{ item.category }}</span>

                            <div class="fw-semibold mt-1">
                                {{ item.title }}
                            </div>
                            <div class="text-muted mb-2">
                                {{ item.text }}
                            </div>
                            <RatingStar v-for="i in item.stars" /> {{ item.rating }} ({{ item.total_rating }})
                            <div class="float-lg-end">
                                {{ item.duration }} | {{ item.no_of_lectures }} Lectures
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{ item: cartItemInterface }>()

const emit = defineEmits(['remove'])
</script>

<style scoped>
.image-box {
    width: 100%;
    height: 170px;
    background-position: center top !important;
    overflow: hidden;
}


.tag {
    color: #000;
    font-weight: normal;
}

.tag-level {
    background-color: #FFF8E5 !important;
}

.tag-type {
    background-color: #F1F5FF !important;
}
</style>