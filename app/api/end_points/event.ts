import {$instanceForm, $instance } from '../instances'


// API methods
export default {

    events() {
        return $instance.get('events');
    },

    myEventBookings() {
        return $instance.get('events/my-bookings');
    },

    bookEvent(eventId: number) {
        return $instance.post(`/events/${eventId}/book`)
    },

};
