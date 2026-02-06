import { $instance, $instanceForm } from '../instances'

// export default {

//     register(data: any) {
//         return $instance.post(`register`, JSON.stringify(data))
//     },

 
//     login(data: any) {
//         return $instance.post(`login`, JSON.stringify(data))
//     },


//     logout() {
//         return $instance.get(`logout`)
//     },

//     profile() {
//         return $instance.get(`profile`)
//     },
// }
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
        return $instance.get('auth/profile');
    },

    verifyEmail(data: any) {
        return $instance.post('auth/email/verify', data);
    },

    resendVerificationEmail() {
        return $instance.post('auth/email/resend');
    }
};
