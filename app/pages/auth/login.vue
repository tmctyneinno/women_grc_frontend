<template>
    <nuxt-layout name="login-and-register">
        <div class="col-lg-9 col-12">
            <div class="card border-0 animate__animated animate__slideInDown">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="text-center">
                                <img src="/images/WGRC-logo.png" width="40" alt="">
                            </div>
                            <div class="text-center fw-600 fw-bold fs-4">
                                Welcome back!
                            </div>
                            <div class="text-center text-muted small">
                                Please provide your details to log into your account.
                            </div>


                            <div :disabled="!isReady" @click="() => loginWithGoogle()"
                                class="card google-card rounded-0 p-2 my-3">
                                <div class="text-center theme-color">
                                    <img src="/images/auth/google-icon.png" width="20"> &nbsp;continue with Google
                                </div>
                            </div>

                            <div class="text-between-lines">
                                or with
                            </div>
                        </div>



                        <div class="col-12">
                            <div class="form-label fw-bold">
                                Email
                                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
                            </div>
                            <CustomInputText type="email" placeholder="enter your email" />
                        </div>



                        <div class="col-12">
                            <div class="form-label fw-bold">
                                Password
                                <sup><i class="bi bi-asterisk xxsmall text-danger"></i></sup>
                            </div>
                            <CustomInputPassword placeholder="enter password" />
                        </div>



                        <div class="col-12 mt-4">
                            <button class="btn btn-theme w-100 hover-tiltX">
                                <span class="float-start">
                                    Login
                                </span>
                                <i class="bi bi-arrow-right float-end"></i>
                            </button>
                        </div>

                        <div class="col-12 text-center">
                            Don't have an account?
                            <nuxt-link class="text-theme" to="/auth/register">Register</nuxt-link>
                        </div>

                    </div>
                    <div class="mt-3">
                        <nuxt-link to="/">Back to Home</nuxt-link>
                    </div>
                </div>

            </div>
        </div>

    </nuxt-layout>
</template>


<script setup lang="ts">
import {
    useTokenClient,
    type AuthCodeFlowSuccessResponse,
    type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";




const pass = ref('')










// // google sign in ################################
const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
    const accessToken = response.access_token
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const googleProfile = await response.json();
        signinUsingGoogle(googleProfile)
    } catch (error) {
        console.error("Error fetching user profile:", error);
        // useFxn.toast('Sorry, Cannot initiate login now, check your internet', 'error')
    }
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
    // useFxn.toast('Sorry, Cannot initiate login now,' + errorResponse, 'error')
    console.log("Error: ", errorResponse);
};

const { isReady, login: loginWithGoogle } = useTokenClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    // other options
});



async function signinUsingGoogle(googleProfile: any) {
    // form.isLoading = true
    try {
        // const { data } = await api.userLoginWithGoogle(googleProfile)

        // if (data.status === 200) {
        //     // profile.login(data.body.token, 'user')
        // }
    } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
            // useFxn.toast(error?.response?.data?.message ?? 'Error occoured', 'error')
        }
        else {
            // useFxn.toast('Sorry, error occured, check your internet', 'error')
        }
    }
    finally {
        // form.isLoading = false
    }
}
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