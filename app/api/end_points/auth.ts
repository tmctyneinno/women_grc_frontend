import {$instanceForm, $instance } from '../instances'


// API methods
export default {
    register(data: any) {
        return $instance.post('auth/register', data);
    },

    login(data: any) {
        return $instance.post('auth/login', data);
    },

    logout() {
        return $instance.post('auth/logout');
    },

    profile() {
        return $instance.get('user/profile');
    },

    updateProfile(formData: FormData) {
        return $instanceForm.post('user/profile', formData);
    },

    verifyEmail(data: any) {
        return $instance.post('auth/email/verify', data);
    },

    resendVerificationEmail() {
        return $instance.post('auth/email/resend');
    }
};
