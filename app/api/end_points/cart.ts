import {$instanceForm, $instance } from '../instances'


// API methods
export default {
    cart() {
        return $instance.get('carts');
    },

    addCart(data: any) {
        return $instance.post('carts/add', data);
    },

    removeCart(cartId: number) {
        return $instance.delete(`carts/${cartId}`);
    },

    cartCheckout(payload: { success_url?: string; cancel_url?: string; tax_amount?: number } = {}) {
        return $instance.post('carts/checkout', payload);
    },

    cartCheckoutStatus(sessionId: string) {
        return $instance.get(`carts/checkout/status/${sessionId}`);
    },

};
