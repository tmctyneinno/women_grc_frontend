import { $instance, $instanceForm } from '../instances'


// API methods
export default {
    register(data) {
        return $instance.post('auth/register', data);
    },

    login(data) {
        return $instance.post('auth/login', data);
    },

    logout() {
        return $instance.post('auth/logout');
    },

    profile() {
        return $instance.get('auth/profile');
    },

    verifyEmail(data) {
        return $instance.post('auth/email/verify', data);
    },

    resendVerificationEmail() {
        return $instance.post('auth/email/resend');
    }
};

export { $instance, $instanceSilent, $instanceForm };