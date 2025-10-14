<template>
    <div class="main-page  bg-light">
        <div class="container">
            <div data-aos="fade-up" class="row g-3 justify-content-center">
                <div class="col-lg-8 col-md-12">
                    <div class="text-cente d-flex justify-content-center">
                        <div style="min-width: 300px;" class="text-after-line text-muted2 ms-lg-5 ">
                            Events & Summits
                        </div>
                    </div>
                    <div class="header">Our Upcoming Events</div>
                </div>

                <div class="col-12">
                    <ul class="list-group list-group-flush">
                        <li v-for="({ number, title, times, date }, index) in events" :key="index"
                            class="list-group-item bg-transparent border-">

                            <div class="row g-3">
                                <div class="col-2 event-number d-none d-lg-block">{{ number }}</div>
                                <div class="col d-flex justify-content-start align-items-center">
                                    <div>
                                        <div class="event-title">
                                            {{ title }}
                                        </div>
                                        <div class="text-muted">
                                            <span class="text-muted me-2" v-for="time in times" :key="time">
                                                {{ time }},
                                            </span>
                                            <span>{{ useDateFormat(new Date(date), 'DD MMMM YYYY') }}</span>
                                        </div>
                                        <div class="hover-tiltX mt-2">
                                            <nuxt-link class="text-muted small text-decoration-none" to="/">
                                                Register now <i class="bi bi-arrow-right"></i>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

interface EventInterface {
    number: string,
    title: string,
    times: string[],
    date: Date
}

const events = ref<EventInterface[]>([
    {
        number: '01',
        title: 'The Role of Women in Governance, Risk Management, and Compliance Practices',
        times: ['9am-1pm', '4pm-9pm'],
        date: new Date('2025-11-07')
    },
    {
        number: '02',
        title: 'The Role of Women in Leadership: Navigating Governance, and Risk',
        times: ['9am-1pm', '4pm-9pm'],
        date: new Date('2025-11-07')
    }
])


</script>

<style scoped>
.main-page {
    padding-block: 60px;
    min-height: 50vh;
}

.header {
    font-size: 36px;
    color: #333;
    text-align: center;
}

.event-number {
    font-size: 100px;
    font-weight: 700;
}

.event-title {
    font-size: 30px;
    font-weight: 700;
}

@media (max-width: 767px) {
    .event-title {
        font-size: 20px;
    }

    .header {
        font-size: 20px;
    }
}
</style>