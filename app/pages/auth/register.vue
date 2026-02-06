<template>
    <nuxt-layout name="login-and-register">
        <div class="col-lg-9 col-12 py-5 py-lg-0">
            <div class="card border-0 animate__animated animate__slideInDown">
                <div class="card-body py-5">
                    <form @submit.prevent="validateAndSignUp" class="row g-3">
                        <div class="col-12">
                            <div class="text-center">
                                <NuxtImg src="/images/WGRC-logo.png" width="40" alt="" />
                            </div>
                            <div class="text-center fw-600 fw-bold fs-4">
                                Join us!
                            </div>
                            <div class="text-center text-muted small">
                                Please provide your details to register into your account.
                            </div>


                            <!-- <div :disabled="!isReady" @click="() => loginWithGoogle()"
                                class="card google-card rounded-0 p-2 my-3">
                                <div class="text-center theme-color">
                                    <NuxtImg src="/images/auth/google-icon.png" width="20" /> &nbsp;signin with Google
                                </div>
                            </div> -->

                            <div class="text-between-lines">
                                or with
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-label fw-bold">
                                Full Name
                                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
                            </div>
                            <CustomInputText placeholder="enter your email" v-model="full_name"
                                v-bind="full_nameAttr" />
                            <div class="small text-danger">{{ errors?.full_name }}</div>
                        </div>

                        <div class="col-12">
                            <div class="form-label fw-bold">
                                Email
                                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
                            </div>
                            <CustomInputText type="email" placeholder="enter your email" v-model="email"
                                v-bind="emailAttr" />
                            <div class="small text-danger">{{ errors?.email }}</div>
                        </div>

                        <div class="col-12">
                            <div class="form-label fw-bold">
                                LinkedIn
                                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
                            </div>
                            <CustomInputText placeholder="enter your linkedIn URL" v-model="linked_in"
                                v-bind="linked_inAttr" />
                            <div class="small text-danger">{{ errors?.linked_in }}</div>
                        </div>

                        <div class="col-12">
                            <div class="form-label fw-bold">
                                Password
                                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
                            </div>
                            <CustomInputPassword placeholder="enter password" v-model="password"
                                v-bind="passwordAttr" />
                            <div class="small text-danger">{{ errors?.password }}</div>
                        </div>

                        <div class="col-12">
                            <div class="form-label fw-bold">
                                Confirm Password
                                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
                            </div>
                            <CustomInputPassword placeholder="confirm password" v-model="confirm_password"
                                v-bind="confirm_passwordAttr" />
                            <div class="small text-danger">{{ errors?.confirm_password }}</div>
                        </div>

                        <div class="col-12 mt-4">
                            <CustomInputSubmitButton :loading="isSubmitting" type="submit"
                                class-name="btn btn-theme w-100 hover-tiltX">
                                <span class="float-start">
                                    Register
                                </span>
                                <i class="bi bi-arrow-right float-end"></i>
                            </CustomInputSubmitButton>

                        </div>

                        <div class="col-12 text-center">
                            Already have an account?
                            <nuxt-link class="text-theme" to="/auth/login">Login</nuxt-link>
                        </div>

                    </form>
                    <div class="mt-3">
                        <nuxt-link to="/">Back to Home</nuxt-link>
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

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

import {
    useTokenClient,
    type AuthCodeFlowSuccessResponse,
    type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";

import api from '~/api';

const { passwordRegex }: any = useFxn
const { alertToast }: any = sweetAlerts

// form and validation
const validationRules = {
    email: yup.string().email('Invalid email format').required('Email is required'),
    full_name: yup.string().required('Full name is required'),
    linked_in: yup.string().required('LinkedIn field is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .test(
            'password-complexity',
            'Must contain at least one number and one special character',
            passwordRegex
        ),
    confirm_password: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords do not match')
};

const { errors, handleSubmit, defineField, setFieldValue, isSubmitting } = useForm({
    validationSchema: toTypedSchema(yup.object(validationRules)),
});

const [email, emailAttr] = defineField('email');
const [full_name, full_nameAttr] = defineField('full_name');
const [linked_in, linked_inAttr] = defineField('linked_in');
const [password, passwordAttr] = defineField('password');
const [confirm_password, confirm_passwordAttr] = defineField('confirm_password');


const validateAndSignUp = handleSubmit(async (values) => {

    try {
        values.full_name = values.full_name.trim();
        values.linked_in = values.linked_in.trim();
        values.email = values.email.trim().toLowerCase();
        values.password = values.password.trim();

        await api.register(values)

        localStorage.setItem('WIGRFCTempReg', JSON.stringify(values))

        navigateTo({
            path: '/auth/reg-success',
            query: { e: values.email, tm: new Date().getTime() }
        })

    }
    catch (err: any) {
        const errorMessage = err.response?.data?.errors;
        errors.value.email = errorMessage?.email?.[0]
        errors.value.password = errorMessage?.password?.[0]
    }
})



// // google sign up START ################################
const handleGoogleSuccess = async (response: AuthCodeFlowSuccessResponse) => {
    const accessToken = response.access_token
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const googleProfile = await response.json();

        const values = {
            full_name: googleProfile?.name,
            email: googleProfile?.email,
            linked_in: '',
            password: 'password',
            is_google_account: true
        }

        isSubmitting.value = true
        await api.register(values)

        localStorage.setItem('WIGRFCTempReg', JSON.stringify(values))

        navigateTo({
            path: '/auth/reg-success',
            query: { e: values.email, tm: new Date().getTime() }
        })

        isSubmitting.value = false


    } catch (error) {
        console.error("Error fetching user profile:", error);
        alertToast('Sorry, Cannot initiate login now, check your internet', 'error')
        isSubmitting.value = false
    }
};

const handleGoogleError = (errorResponse: AuthCodeFlowErrorResponse) => {
    alertToast('Sorry, Cannot initiate login now,' + errorResponse, 'error')
    console.log("Error: ", errorResponse);
};

const { isReady, login: loginWithGoogle } = useTokenClient({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
});
// // google sign up END ################################



</script>



<style scoped>
.google-card {
    cursor: pointer;
    background-color: #eeeeee49;
}

.google-card:hover {

    background-color: #eeeeee71;
}
</style>