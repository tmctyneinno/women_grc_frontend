import api from '~/api'
import { defineStore } from 'pinia';




interface PersonInterface {
  id: number
  first_name: string
  last_name: string
  name: string
  email: string
  phone_number?: string
  job_title?: string
  company?: string
  profile_picture?: string
  linkedin_profile?: string
  timezone?: string
  status?: string
  is_verified?: boolean
  email_verified_at?: string | null
  isGuest?: boolean
}

export const useAuthStore = defineStore('authStore', () => {
  // --- Token management ---
  const token = useCookie('auth_token', {
    maxAge: 3 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  // --- User profile ---
  const person = ref<PersonInterface | null>(null)
  const isGuest = ref(false)

  // --- Computed properties ---
  const isLoggedIn = computed(() => !!token.value)
  const isAuthenticated = computed(() => isLoggedIn.value && !!person.value)
  const user = computed(() => person.value)

  // --- Fetch user profile ---
  const getProfile = async (): Promise<PersonInterface | undefined> => {
    if (!token.value) return

    try {
      const { data } = await api.profile()
      person.value = data.user
      return data.user
    } catch (error: any) {
      console.error('Failed to fetch profile:', error)
      if (error.response?.status === 401) {
        await logout()
      }
    }
  }

  // --- Login with credentials ---
  const loginWithCredentials = async (credentials: { email: string, password: string }) => {
    try {
      const response = await api.login(credentials)
      
      // Extract token from response
      const authToken = response.data?.data?.token
      if (!authToken) {
        throw new Error('No token received from server')
      }
      
      // Set token in cookie
      token.value = authToken
      
      // Set user data from response
      if (response.data?.data?.user) {
        person.value = response.data.data.user
      }
      
      return response.data
    } catch (error: any) {
      console.error('Login failed:', error)
      throw error
    }
  }

  // --- Login via token (for OAuth redirects) ---
  const loginViaToken = async (authToken: string, fetchProfile = true) => {
    token.value = authToken
    if (fetchProfile) {
      await getProfile()
    }
  }

  // --- Logout ---
  // const logout = async () => {
  //   try {
  //     await api.logout?.()
  //   } catch (err) {
  //     console.warn('Logout failed:', err)
  //   } finally {
  //     token.value = null
  //     person.value = null
  //     isGuest.value = false
  //   }
  // }



  const logout = async () => {
  try {
    await api.logout()
  } catch (err: any) {
    console.warn('Logout failed (continuing anyway):', err)
  } finally {
    token.value = null
    person.value = null
    isGuest.value = false

    // Force redirect after local cleanup
    navigateTo('/auth/login', { replace: true })
  }
}


  // --- Set guest mode ---
  const setGuest = (guest = true) => {
    isGuest.value = guest
  }

  return {
    // state
    person,
    isGuest,
    token: readonly(token),

    // computed
    isLoggedIn,
    isAuthenticated,
    user,

    // actions
    loginWithCredentials,
    loginViaToken,
    logout,
    getProfile,
    setGuest
  }
})
