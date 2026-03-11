import {$instanceForm, $instance } from '../instances'


// API methods
export default {

    profile() {
        return $instance.get('user/profile');
    },

    timezone() {
        return $instance.get('timezone');
    },

    updateProfile(formData: FormData) {
        return $instanceForm.post('user/profile', formData);
    },

};
