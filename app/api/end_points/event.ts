import {$instanceForm, $instance } from '../instances'


// API methods
export default {

    events(params: Record<string, any> = {}) {
        return $instance.get('events', { params });
    },

    myEventBookings() {
        return $instance.get('events/my-bookings');
    },

    bookEvent(eventId: number) {
        return $instance.post(`/events/${eventId}/book`)
    },

};
