<template>
    <div class="card border-0 h-100">
        <div class="card-body">
            <div class="fw-semibold">Learning Center</div>
            <div class="mb-3">
                Advance your GRC expertise with industry-leading courses and certifications.
            </div>


            <div class="row g-3">
                <div v-for="(info, index) in infoPanels" :key="index" class="col-lg-3">
                    <div :style="{ backgroundColor: info.bgColor, color: info.color }" class="card border-0 h-100 py-3">
                        <div class="card-body text-center">
                            <div class="text-center fw-semibold fs-5">
                                {{ info.number }}
                            </div>
                            <span> {{ info.title }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">

const infoPanels = ref<{ number: string, title: string, bgColor: string, color: string, }[]>([
    { bgColor: '#F5F7FD', color: '#223893', number: '2', title: 'Courses Completed', },
    { bgColor: '#FDF9F5', color: '#F8A14A', number: '345', title: 'Hours Learned', },
    { bgColor: '#E8FFFE', color: '#223893', number: '2', title: 'Certificates Earned', },
    { bgColor: '#F5F7FD', color: '#223893', number: 'Top 12%', title: 'Community Ranking', },
])




</script>