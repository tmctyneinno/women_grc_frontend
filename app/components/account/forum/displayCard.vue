<template>

    <div class="card forum-card">
        <div class="card-body">
            <div class="d-flex justify-content-center align-items-center gap-0">
                <div class="col-2 ">
                    <div class="icon-circle">
                        <i class="bi bi-chat-square-text "></i>
                    </div>
                </div>
                <div class="col">
                    <div class="fw-medium">{{ forum.title }}</div>
                    <div class="small">{{ digitDisplay(forum.discussions, false) }} discussions
                        <!-- <span style="background-color: #C8A55F;" class="badge rounded-pill ms-2">
                            {{ forum.audience }}
                        </span> -->
                    </div>
                </div>
            </div>
            <div class="text-muted small mt-3">
                {{ forum.info }}
            </div>
        </div>
        <div class="card-footer border-0 bg-transparent pt-0">
            <button class="btn btn-link fw-medium text-theme hover-tiltX p-0 border-0">
                {{ action }} <i class="bi bi-arrow-right "></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps({
    forum: { type: Object as PropType<ForumInterface>, required: true },
    action: { type: String, default: 'Join Forum' }
})

const { digitDisplay } = useFxn

</script>


<style scoped>
.icon-circle {
    height: 35px;
    width: 35px;
    border-radius: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3E6BA6;
    color: #fff;
}


.forum-card {
    background-color: #F5F7FD;
    border: none;
}
</style>
