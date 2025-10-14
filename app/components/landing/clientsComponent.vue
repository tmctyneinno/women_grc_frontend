<template>
    <div class="main-page">
        <div class="container">
            <div data-aos="fade-up" class="row g-3 justify-content-center">
                <div class="col-lg-8 col-md-12">
                    <div class="header">What Our Client Say</div>
                </div>

                <div class="col-12">


                    <Carousel v-bind="carouselConfig">
                        <Slide v-for="i in 6" :key="i">
                            <div class="card bg-secondary-subtle border-0" style="max-width: 300px;">
                                <div class="card-body">
                                    <div class="card-header fw-bold border-0 bg-transparent">
                                        Emeka Iwuji
                                    </div>
                                    <div class="card-body">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, odio,
                                        laudantium et
                                        pariatur dolorum tene
                                    </div>
                                </div>
                            </div>
                        </Slide>

                        <template #addons>
                            <!-- <Pagination /> -->
                            <Navigation />
                        </template>
                    </Carousel>




                </div>
            </div>


        </div>


    </div>
</template>


<script lang="ts" setup>

const screenWidth = useWindowSize()
const itemsPerScreenSize = computed(() => { return screenWidth.width.value > 988 ? 3 : 1; })


const carouselConfig = {
    itemsToShow: itemsPerScreenSize.value,
    wrapAround: true,
    autoplay: 5000
}



interface AccordionInterface {
    question: string,
    answer: string,

}

const clients = ref<AccordionInterface[]>([
    {
        question: 'How is privacy and data security handled?',
        answer: `We are committed to safeguarding your data with robust privacy and security measures. For details, refer to our Privacy Policy on the website.`,
    },

])


</script>




<style scoped>
.main-page {
    padding-block: 60px;
    min-height: 100vh;
}

.header {
    font-size: 36px;
    color: #333;
    text-align: center;
}

.accordion-button:not(.collapsed) {
    color: var(--theme-color) !important;
    background-color: var(--theme-bg-subtle) !important;
}
</style>