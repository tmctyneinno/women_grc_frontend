<template>
    <nuxt-layout name="login-and-register">
        <div class="col-lg-9 col-12 py-5 py-lg-0">
            <div class="card border-0 shadow-sm animate__animated animate__slideInDown">
                <div class="card-body py-5 px-4 px-md-5">
                    <form @submit.prevent="validateAndSignUp" class="row g-3">
                        <!-- Header Section -->
                        <div class="col-12 mb-4 mx-auto">
                            <div class="d-flex justify-content-center mb-4">
                                <div class="text-center mb-3">
                                    <NuxtImg 
                                        src="/images/WGRC-logo.png" 
                                        height="60"
                                        alt="Company Logo"
                                        class="img-fluid"
                                    />
                                </div>
                            </div>
                            <h1 class="h3 text-center fw-bold text-dark mb-2">
                                Create Your Accountc
                            </h1>
                            <p class="text-center text-muted mb-4">
                                Join our community and unlock exclusive features.
                            </p>
                        </div>

                        <!-- Google Sign Up Option -->
                        <!-- <div class="col-12 mb-3">
                            <button 
                                type="button"
                                :disabled="!isReady || isSubmitting"
                                @click="handleGoogleSignUp"
                                class="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center"
                            >
                                <NuxtImg 
                                    src="/images/auth/google-icon.png" 
                                    width="18" 
                                    height="18"
                                    alt="Google"
                                    class="me-2"
                                />
                                <span>Sign up with Google</span>
                            </button>
                        </div>

                        <div class="col-12 position-relative my-3">
                            <hr class="my-0">
                            <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                                Or register with email
                            </span>
                        </div> -->
                        <br/>
                        <!-- Full Name Field -->
                        <div class="col-12">
                            <label for="full_name" class="form-label fw-semibold">
                                Full Name <span class="text-danger">*</span>
                            </label>
                            <CustomInputText 
                                id="full_name"
                                placeholder="Enter your full name"
                                v-model="full_name"
                                v-bind="full_nameAttr"
                                :class="{ 'is-invalid': errors?.full_name }"
                            />
                            <div v-if="errors?.full_name" class="invalid-feedback d-block small">
                                <i class="bi bi-exclamation-circle me-1"></i>
                                {{ errors.full_name }}
                            </div>
                        </div>

                        <!-- Email Field -->
                        <div class="col-12">
                            <label for="email" class="form-label fw-semibold">
                                Email Address <span class="text-danger">*</span>
                            </label>
                            <CustomInputText 
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                v-model="email"
                                v-bind="emailAttr"
                                :class="{ 'is-invalid': errors?.email }"
                            />
                            <div v-if="errors?.email" class="invalid-feedback d-block small">
                                <i class="bi bi-exclamation-circle me-1"></i>
                                {{ errors.email }}
                            </div>
                        </div>

                        <!-- LinkedIn Field -->
                        <div class="col-12">
                            <label for="linked_in" class="form-label fw-semibold">
                                LinkedIn Profile <span class="text-danger">*</span>
                                <small class="text-muted ms-1">(e.g., https://linkedin.com/in/username)</small>
                            </label>
                            <CustomInputText 
                                id="linked_in"
                                type="text"
                                placeholder="https://linkedin.com/in/username"
                                v-model="linked_in"
                                v-bind="linked_inAttr"
                                :class="{ 'is-invalid': errors?.linked_in }"
                            />
                            <div v-if="errors?.linked_in" class="invalid-feedback d-block small">
                                <i class="bi bi-exclamation-circle me-1"></i>
                                {{ errors.linked_in }}
                            </div>
                        </div>

                        <!-- Password Field -->
                        <div class="col-12">
                            <label for="password" class="form-label fw-semibold">
                                Password <span class="text-danger">*</span>
                            </label>
                            <CustomInputPassword 
                                id="password"
                                placeholder="Create a strong password"
                                v-model="password"
                                v-bind="passwordAttr"
                                :class="{ 'is-invalid': errors?.password }"
                            />
                            <div class="form-text small">
                                Must be at least 8 characters with uppercase, lowercase, number, and special character
                            </div>
                            <div v-if="errors?.password" class="invalid-feedback d-block small">
                                <i class="bi bi-exclamation-circle me-1"></i>
                                {{ errors.password }}
                            </div>
                        </div>

                        <!-- Confirm Password Field -->
                        <div class="col-12">
                            <label for="confirm_password" class="form-label fw-semibold">
                                Confirm Password <span class="text-danger">*</span>
                            </label>
                            <CustomInputPassword 
                                id="confirm_password"
                                placeholder="Confirm your password"
                                v-model="confirm_password"
                                v-bind="confirm_passwordAttr"
                                :class="{ 'is-invalid': errors?.confirm_password }"
                            />
                            <div v-if="errors?.confirm_password" class="invalid-feedback d-block small">
                                <i class="bi bi-exclamation-circle me-1"></i>
                                {{ errors.confirm_password }}
                            </div>
                        </div>

                        <!-- Terms and Conditions -->
                        <div class="col-12">
                            <div class="form-check">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    id="terms" 
                                    v-model="termsAccepted"
                                    :class="{ 'is-invalid': errors?.terms }"
                                >
                                <label class="form-check-label small" for="terms">
                                    I agree to the 
                                    <a href="/terms" class="text-decoration-none" style="color: #6e354e;">Terms of Service</a> and 
                                    <a href="/privacy" class="text-decoration-none" style="color: #6e354e;">Privacy Policy</a>
                                    <span class="text-danger">*</span>
                                </label>
                                <div v-if="errors?.terms" class="invalid-feedback d-block small">
                                    <i class="bi bi-exclamation-circle me-1"></i>
                                    {{ errors.terms }}
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="col-12 mt-2">
                            <CustomInputSubmitButton 
                                :loading="isSubmitting"
                                type="submit"
                                class-name="btn btn-primary w-100 py-2"
                                style="background-color: #293567; border-color: #293567;"
                            >
                                <span v-if="!isSubmitting">Create Account</span>
                                <span v-else>
                                    <span class="spinner-border spinner-border-sm me-2"></span>
                                    Creating Account...
                                </span>
                            </CustomInputSubmitButton>
                        </div>

                        <!-- Login Link -->
                        <!-- <div class="col-12 text-center mt-4 pt-3 border-top">
                            <p class="mb-0">
                                Already have an account?
                                <nuxt-link to="/auth/login" style="color: #6e354e;"  class=" fw-semibold text-decoration-none ms-1">
                                    Sign In
                                </nuxt-link>
                            </p>
                        </div> -->
                    </form>
                    
                    <!-- Back to Home -->
                    <div class="text-center mt-4">
                        <nuxt-link to="/" class="text-decoration-none text-muted small">
                            <i class="bi bi-arrow-left me-1"></i>
                            Back to Home
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-layout>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import api from '~/api';

definePageMeta({
    middleware: 'auth-route-middleware',
    layout: 'login-and-register'
});

const { passwordRegex }: any = useFxn;
const { alertToast }: any = sweetAlerts;

// Form validation schema
const validationSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required')
        .test(
            'email-format',
            'Please enter a valid email address',
            (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '')
        ),
    full_name: yup
        .string()
        .required('Full name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long'),
    linked_in: yup
        .string()
        .required('LinkedIn profile is required')
        .matches(
            /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?$/,
            'Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)'
        ),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/\d/, 'Must contain at least one number')
        .matches(/[@$!%*?&]/, 'Must contain at least one special character (@$!%*?&)'),
    confirm_password: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
    terms: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions')
});

const { 
    errors, 
    handleSubmit, 
    defineField, 
    isSubmitting, 
    setFieldError,
    resetForm 
} = useForm({
    validationSchema: toTypedSchema(validationSchema),
    initialValues: {
        terms: false
    }
});

const [email, emailAttr] = defineField('email');
const [full_name, full_nameAttr] = defineField('full_name');
const [linked_in, linked_inAttr] = defineField('linked_in');
const [password, passwordAttr] = defineField('password');
const [confirm_password, confirm_passwordAttr] = defineField('confirm_password');
const [termsAccepted, termsAttr] = defineField('terms');

// Handle form submission
const validateAndSignUp = handleSubmit(async (values) => {
    try {
        // Prepare data
        const registrationData = {
            name: values.full_name.trim(),
            email: values.email.trim().toLowerCase(),
            linkedin_profile: values.linked_in.trim(),
            password: values.password,
            password_confirmation: values.confirm_password
        };

        // Call API
        const response = await api.register(registrationData);
        
        // Handle success
        if (response.data.success) {
            // Store user data temporarily
            localStorage.setItem('WIGRFCTempReg', JSON.stringify({
                email: values.email,
                name: values.full_name,
                registered_at: new Date().toISOString()
            }));

            // Show success message
            alertToast('Registration successful! Please check your email to verify your account.', 'success');
            
            // Navigate to success page
            navigateTo({
                path: '/auth/reg-success',
                query: { 
                    e: values.email,
                    tm: new Date().getTime()
                }
            });
            
            // Reset form
            resetForm();
        }
        
    } catch (err: any) {
        console.error('Registration error:', err);
        
        // Handle API validation errors
        if (err.response?.status === 422) {
            const errorData = err.response.data.errors;
            
            // Map backend errors to form fields
            if (errorData.email) {
                setFieldError('email', errorData.email[0]);
            }
            if (errorData.linkedin_profile) {
                setFieldError('linked_in', errorData.linkedin_profile[0]);
            }
            if (errorData.password) {
                setFieldError('password', errorData.password[0]);
            }
        } else {
            // Handle generic errors
            alertToast(
                err.response?.data?.message || 
                'Registration failed. Please try again later.', 
                'error'
            );
        }
    }
});

// Google Sign Up


// Google Auth setup


// Helper function to fetch Google user info
const fetchGoogleUserInfo = async (accessToken: string) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch user info from Google');
    }
    
    return response.json();
};

// Clean up on component unmount
onBeforeUnmount(() => {
    resetForm();
});
</script>

<style scoped>
.card {
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.btn-outline-secondary:hover {
    background-color: #f8f9fa;
    border-color: #6c757d;
}

.form-label {
    font-size: 0.9rem;
}

.invalid-feedback {
    font-size: 0.8rem;
}

.spinner-border {
    width: 1rem;
    height: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-body {
        padding: 2rem 1.5rem !important;
    }
}

/* Animation for form elements */
.form-control {
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
    border-color: #4dabf7;
    box-shadow: 0 0 0 0.2rem rgba(77, 171, 247, 0.25);
}

/* Custom checkbox styling */
.form-check-input:checked {
    background-color: #4dabf7;
    border-color: #4dabf7;
}
</style>