import {$instanceForm, $instance } from '../instances'


// API methods
export default {
    membership(){
        return $instance.get('memberships');
    },

    myMembershipStatus() {
        return $instance.get('memberships/my-status');
    },
};
