<template>
  <nuxt-layout name="login-and-register">
    <div class="col-lg-9 col-12">
      <div class="card border-0 animate__animated animate__slideInDown">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-12">
              <div class="text-center">
                <NuxtImg src="/images/WGRC-logo.png" width="40" alt="WGRC Logo" />
              </div>
              <div class="text-center fw-600 fw-bold fs-4">Welcome back!</div>
              <div class="text-center text-muted small">
                Please provide your details to log into your account.
              </div>

              <!-- Google login -->
              <div @click="loginWithGoogle" class="card google-card rounded-0 p-2 my-3">
                <div class="text-center theme-color">
                  <NuxtImg src="/images/auth/google-icon.png" width="20" /> &nbsp;continue with Google
                </div>
              </div>

              <div class="text-between-lines">or with</div>
            </div>

            <!-- Email -->
            <div class="col-12">
              <div class="form-label fw-bold">
                Email
                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
              </div>
              <CustomInputText v-model="email" type="email" placeholder="enter your email" />
            </div>

            <!-- Password -->
            <div class="col-12">
              <div class="form-label fw-bold">
                Password
                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
              </div>
              <CustomInputPassword v-model="password" placeholder="enter password" />
            </div>

            <!-- Login Button -->
            <div class="col-12 mt-4">
              <button @click="login" class="btn btn-theme w-100 hover-tiltX">
                <span class="float-center">Login</span>
                <i class="bi bi-arrow-right float-end"></i>
              </button>
            </div>

            <!-- Register Link -->
            <div class="col-12 text-center">
              Don't have an account?
              <nuxt-link class="text-theme" to="/auth/register">Register</nuxt-link>
            </div>
          </div>

          <div class="mt-3">
            <nuxt-link to="/" class="text-theme text-decoration-none">Back to Home</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-route-middleware'
})

// Pinia auth store
const authStore = useAuthStore()

// Nuxt runtime config
const config = useRuntimeConfig()
const backendUrl = config.public.apiUrl

//alertToast
const { alertToast }: any = sweetAlerts


// Reactive form state
import { ref } from 'vue'
const email = ref('')
const password = ref('')

// Toast/notification event
function notify(type: string, message: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('notification', {
      detail: { type, message }
    }))
  }
}

/// Regular login function (email/password)
async function login() {
  try {
    if (!email.value || !password.value) {
      alertToast('Please enter both email and password', 'error')
      return
    }

    const response = await authStore.loginWithCredentials({
      email: email.value,
      password: password.value
    })

    // 🔴 Backend returned success = false
    if (!response?.success) {
      alertToast(response?.message || 'Login failed', 'error')
      return
    }

    // 🟢 Success
    notify('success', response.message || 'Login successful!')
    alertToast(response.message || 'Login successful!', 'success')

    const userStatus = response?.data?.user?.status

    if (userStatus === 'pending') {
      navigateTo({ path: '/account/dashboard/guest', replace: true })
    } else {
      navigateTo({ path: '/account/dashboard', replace: true })
    }

  } catch (error: any) {
    console.error('Login failed:', error)

    // ✅ Works whether store throws backend payload OR Axios error
    const backendMessage =
      error?.message ||
      error?.response?.data?.message ||
      error?.errors?.email?.[0] ||
      error?.response?.data?.errors?.email?.[0] ||
      error?.errors?.password?.[0] ||
      error?.response?.data?.errors?.password?.[0] ||
      'Login failed. Please try again.'

    notify('error', backendMessage)
    alertToast(backendMessage, 'error')
  }
}


// Google login: redirect to backend OAuth
function loginWithGoogle() {
  window.location.href = `${backendUrl}/api/v1/auth/google/redirect`
}
</script>

<style scoped>
.google-card {
  cursor: pointer;
  background-color: #eeeeee49;
  transition: background-color 0.2s;
}
.google-card:hover {
  background-color: #eeeeee71;
}
</style>
