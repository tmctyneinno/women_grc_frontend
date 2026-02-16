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

// Regular login function (email/password)
async function login() {
  try {
    // Validate input
    if (!email.value || !password.value) {
      notify('error', 'Please enter both email and password')
      return
    }

    // Call login action from store
    const response = await authStore.loginWithCredentials({
      email: email.value,
      password: password.value
    })

    // If login successful, redirect based on user status
    if (response?.success) {
      notify('success', 'Login successful!')
      
      // Get user status from response
      const userStatus = response?.data?.user?.status
      
      // Redirect based on verification status
      if (userStatus === 'pending') {
        navigateTo({ path: '/account/dashboard/guest', replace: true })
      } else if (userStatus === 'verified') {
        navigateTo({ path: '/account/dashboard', replace: true })
      } else {
        // Fallback to dashboard if status is unknown
        navigateTo({ path: '/account/dashboard', replace: true })
      }
    }
  } catch (error: any) {
    console.error('Login failed:', error)
    const errorMessage = error?.response?.data?.message || 'Login failed. Please try again.'
    notify('error', errorMessage)
  }
}

// Google login: redirect to backend OAuth
function loginWithGoogle() {
  window.location.href = `${backendUrl}/auth/google/redirect`
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
