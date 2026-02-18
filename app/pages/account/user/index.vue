<template>
    <NuxtLayout name="account-layout">
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <!-- Success/Error Alert -->
                    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                        <strong>Success!</strong> {{ successMessage }}
                        <button type="button" class="btn-close" @click="successMessage = ''"></button>
                    </div>
                    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                        <strong>Error!</strong> {{ errorMessage }}
                        <button type="button" class="btn-close" @click="errorMessage = ''"></button>
                    </div>
                    <!-- Header -->
                    <div class="mb-4">
                        <h1 class="h3 font-weight-bold text-dark">Update Profile</h1>
                        <p class="text-muted">Manage your personal information</p>
                    </div>

                    <!-- Profile Form -->
                    <form @submit.prevent="handleSubmit" class="bg-white rounded-3 shadow-sm p-4">
                        <!-- Profile Picture Section -->
                        <div class="mb-4 pb-4 border-bottom">
                            <div class="row align-items-center">
                                <div class="col-md-4 text-center mb-3 mb-md-0">
                                    <div class="profile-picture-wrapper mb-3">
                                        <img 
                                            :src=" (user?.profile_picture || '/images/advisory/elena.png')" 
                                            :alt="user?.first_name"
                                            class="rounded-circle"
                                            style="width: 120px; height: 120px; object-fit: cover; border: 3px solid #f0f0f0;"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <label for="profile_picture" class="form-label fw-semibold">Profile Picture</label>
                                    <input 
                                        type="file" 
                                        id="profile_picture"
                                        class="form-control"
                                        accept="image/jpeg,image/png,image/webp,image/jpg"
                                        @change="handleProfilePictureChange"
                                        :disabled="isLoading"
                                    />
                                    <small class="text-muted d-block mt-2">
                                        Accepted formats: JPG, PNG, WebP (Max 2MB)
                                    </small>
                                </div>
                            </div>
                        </div>

                        <!-- Personal Information -->
                        <div class="mb-4">
                            <h5 class="fw-semibold mb-3 text-secondary">Personal Information</h5>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <!--<label for="first_name" class="form-label fw-semibold">First Name</label>
                                    <input 
                                        type="text" 
                                        id="first_name" 
                                        class="form-control"
                                        :value="user?.first_name"
                                        disabled
                                    />
                                    <small class="text-muted">Cannot be changed</small>-->
                                    <h3>Adedolapo Adeshina</h3>
                                    <p>dorrlarrpo1@gmail.com</p>
                                </div>
                                <!--<div class="col-md-6 mb-3">
                                    <label for="last_name" class="form-label fw-semibold">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="last_name" 
                                        class="form-control"
                                        :value="user?.last_name"
                                        disabled
                                    />
                                    <small class="text-muted">Cannot be changed</small>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="email" class="form-label fw-semibold">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        class="form-control"
                                        :value="user?.email"
                                        disabled
                                    />
                                    <small class="text-muted">Cannot be changed</small>
                                </div>-->
                                <div class="col-md-6 mb-3">
                                    <label for="phone_number" class="form-label fw-semibold">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        id="phone_number" 
                                        class="form-control"
                                        v-model="formData.phone_number"
                                        placeholder="e.g., +1 (555) 123-4567"
                                        :disabled="isLoading"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Professional Information -->
                        <div class="mb-4">
                            <h5 class="fw-semibold mb-3 text-secondary">Professional Information</h5>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="job_title" class="form-label fw-semibold">Job Title</label>
                                    <input 
                                        type="text" 
                                        id="job_title" 
                                        class="form-control"
                                        v-model="formData.job_title"
                                        placeholder="e.g., Senior Developer"
                                        :disabled="isLoading"
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="company" class="form-label fw-semibold">Company</label>
                                    <input 
                                        type="text" 
                                        id="company" 
                                        class="form-control"
                                        v-model="formData.company"
                                        placeholder="e.g., Tech Company Inc."
                                        :disabled="isLoading"
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="linkedin_profile" class="form-label fw-semibold">LinkedIn Profile</label>
                                    <input 
                                        type="url" 
                                        id="linkedin_profile" 
                                        class="form-control"
                                        v-model="formData.linkedin_profile"
                                        placeholder="https://www.linkedin.com/in/your-profile/"
                                        :disabled="isLoading"
                                    />
                                    <small class="text-muted">Must be a valid LinkedIn URL</small>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="timezone" class="form-label fw-semibold">Timezone</label>
                                    <select 
                                        id="timezone" 
                                        class="form-select"
                                        v-model="formData.timezone"
                                        :disabled="isLoading"
                                    >
                                        <option value="">Select a timezone</option>
                                        <optgroup label="Africa">
                                            <option value="Africa/Lagos">Lagos (GMT+1)</option>
                                            <option value="Africa/Johannesburg">Johannesburg (SAST)</option>
                                            <option value="Africa/Cairo">Cairo (EET)</option>
                                        </optgroup>
                                        <optgroup label="Europe">
                                            <option value="Europe/London">London (GMT/BST)</option>
                                            <option value="Europe/Paris">Paris (CET/CEST)</option>
                                            <option value="Europe/Berlin">Berlin (CET/CEST)</option>
                                        </optgroup>
                                        <optgroup label="America">
                                            <option value="America/New_York">New York (EST/EDT)</option>
                                            <option value="America/Los_Angeles">Los Angeles (PST/PDT)</option>
                                            <option value="America/Chicago">Chicago (CST/CDT)</option>
                                        </optgroup>
                                        <optgroup label="Asia">
                                            <option value="Asia/Dubai">Dubai (GST)</option>
                                            <option value="Asia/Singapore">Singapore (SGT)</option>
                                            <option value="Asia/Tokyo">Tokyo (JST)</option>
                                        </optgroup>
                                        <optgroup label="Oceania">
                                            <option value="Australia/Sydney">Sydney (AEDT/AEST)</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="d-flex gap-2 justify-content-end pt-3 border-top">
                            <button 
                                type="button" 
                                class="btn btn-outline-secondary"
                                @click="resetForm"
                                :disabled="isLoading"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                class="btn btn-theme"
                                :disabled="isLoading"
                            >
                                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                                {{ isLoading ? 'Saving...' : 'Save Changes' }}
                            </button>
                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import api from '~/api'
import Swal from 'sweetalert2'

definePageMeta({
  middleware: 'account-route-middleware'
})

const authStore = useAuthStore()

const user = ref<any>(null)
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const profilePicturePreview = ref<string | null>(null)


const formData = reactive({
  phone_number: '',
  job_title: '',
  company: '',
  timezone: '',
  linkedin_profile: '',
  profile_picture: null as File | null
})

// ✅ FETCH PROFILE FROM BACKEND
const fetchProfile = async () => {
  try {
    isLoading.value = true
    const response = await api.profile()
    const userData = response.data?.data?.user

    if (userData) {
      user.value = userData

      // ✅ Populate form fields from backend
      formData.phone_number = userData.phone_number || ''
      formData.job_title = userData.job_title || ''
      formData.company = userData.company || ''
      formData.timezone = userData.timezone || ''
      formData.linkedin_profile = userData.linkedin_profile || ''

      if (userData.status=="verified"){
            authStore.setGuest(false)
      }
    }
  } catch (err: any) {
    errorMessage.value = err?.response?.data?.message || 'Failed to load profile'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
    authStore.setGuest(true)
    fetchProfile()
})

// ✅ Profile Picture
const handleProfilePictureChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    errorMessage.value = 'File must be under 2MB'
    return
  }

  formData.profile_picture = file

  const reader = new FileReader()
  reader.onload = e => profilePicturePreview.value = e.target?.result as string
  reader.readAsDataURL(file)
}

// ✅ SUBMIT FORM
const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const submitData = new FormData()
    submitData.append('phone_number', formData.phone_number)
    submitData.append('job_title', formData.job_title)
    submitData.append('company', formData.company)
    submitData.append('timezone', formData.timezone)
    submitData.append('linkedin_profile', formData.linkedin_profile)

    if (formData.profile_picture) {
      submitData.append('profile_picture', formData.profile_picture)
    }

    const response = await api.updateProfile(submitData)

    if (response.data?.success) {
      user.value = response.data.data.user

      // ✅ Refresh form with backend response
      const updatedUser = response.data.data.user
      formData.phone_number = updatedUser.phone_number || ''
      formData.job_title = updatedUser.job_title || ''
      formData.company = updatedUser.company || ''
      formData.timezone = updatedUser.timezone || ''
      formData.linkedin_profile = updatedUser.linkedin_profile || ''

      successMessage.value = response.data.message || 'Profile updated successfully!'

      await Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        timer: 1500,
        showConfirmButton: false
      })
    }

  } catch (err: any) {
    errorMessage.value = err?.response?.data?.message || 'Update failed'
  } finally {
    isLoading.value = false
  }
}

// ✅ RESET FORM
const resetForm = () => {
  if (!user.value) return

  formData.phone_number = user.value.phone_number || ''
  formData.job_title = user.value.job_title || ''
  formData.company = user.value.company || ''
  formData.timezone = user.value.timezone || ''
  formData.linkedin_profile = user.value.linkedin_profile || ''
  formData.profile_picture = null
  profilePicturePreview.value = null
}
</script>


<style scoped>
.profile-picture-wrapper {
    position: relative;
}

.form-control:disabled,
.form-select:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
}

.rounded-3 {
    border-radius: 1rem;
}

.shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
    background-color: #0056b3;
    border-color: #0056b3;
    box-shadow: 0 0.5rem 1rem rgba(0, 123, 255, 0.3);
}

.btn-primary:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.form-label {
    color: #333;
    margin-bottom: 0.5rem;
}

.form-control:focus,
.form-select:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.text-secondary {
    color: #6c757d;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .container-fluid {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .p-4 {
        padding: 1.5rem!important;
    }

    .col-md-6 {
        margin-bottom: 1rem;
    }

    .profile-picture-wrapper img {
        width: 100px !important;
        height: 100px !important;
    }
}

/* Loading state */
.spinner-border-sm {
    width: 1rem;
    height: 1rem;
    border-width: 0.2em;
}
</style>