<template>
    <div class="dropdown cursor-pointer">
        <div class="dropdown-toggle d-flex justify-content-center align-items-center gap-2" type=" button"
            id="triggerId" data-bs-toggle="dropdown">
            <NuxtImg src="/images/advisory/elena.png" width="30" alt="" />
            <div class="xsmall">
                <div class="fw-semibold lh-1">Sarah Chen
                    <i class="bi bi-chevron-down"></i>
                </div>
                <div class="text-muted">Senior GRC Analyst</div>
            </div>
        </div>
        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="triggerId">
            <span @click="confirmDelete" class="dropdown-item cursor-pointer text-danger hover-tiltX">
                <i class="bi bi-power"></i> Logout
            </span>

        </div>
    </div>

</template>


<script setup lang="ts">


const { swalConfirm } = sweetAlerts

const authStore = useAuthStore()

function confirmDelete() {
    swalConfirm(`Are you sure you want to logout`, `You'll be signed out of your guest session. You can log back in anytime once your account is verified.`, 'Logout', 'warning')
        .then((confirm) => {
            if (confirm.value) {
                authStore.logout()
            }
        })
}



</script>

<style scoped>
.dropdown-item:active {
    background: transparent !important;
}

.dropdown-item:hover {
    background: transparent !important;
}
</style>