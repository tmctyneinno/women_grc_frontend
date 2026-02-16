<template>
    <div class="dropdown cursor-pointer">
        <div class="dropdown-toggle d-flex justify-content-center align-items-center gap-2" type=" button"
            id="triggerId" data-bs-toggle="dropdown">
            <NuxtImg src="/images/advisory/elena.png" width="30" alt="" />
            <div class="xsmall">
                <div class="fw-semibold lh-1">{{ userName }}
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
import { onMounted, ref } from 'vue'
import api from '~/api'

const { swalConfirm } = sweetAlerts
const authStore = useAuthStore()

const userName = ref<string>('User')
const userProfile = ref<any>(null)
const isLoading = ref<boolean>(false)

function confirmDelete() {
  swalConfirm(
    `Are you sure you want to logout`,
    `You'll be signed out of your guest session. You can log back in anytime once your account is verified.`,
    'Logout',
    'warning'
  ).then((confirm) => {
    if (confirm.value) {
      authStore.logout()
    }
  })
}

// Fetch user profile
const fetchUserProfile = async () => {
  try {
    isLoading.value = true

    const response = await api.profile()
    console.log('PROFILE RESPONSE 👉', response.data) // 👈 DEBUG THIS

    const userData =
      response.data?.user ||
      response.data?.data?.user

    if (userData) {
      userProfile.value = userData
      userName.value =
        `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'Guest'
    } else {
      userName.value = 'Guest'
    }

  } catch (error: any) {
    console.error('Failed to fetch user profile:', error)
    userName.value = 'Guest'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchUserProfile()
})
</script>


<style scoped>
.dropdown-item:active {
    background: transparent !important;
}

.dropdown-item:hover {
    background: transparent !important;
}
</style>