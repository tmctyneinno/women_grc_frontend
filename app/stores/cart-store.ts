import api from '~/api'

export interface cartItemInterface {
    id: number | string,
    image?: string,
    level?: string,
    category: string,
    title: string,
    text?: string,
    stars?: number,
    rating?: number,
    total_rating?: number,
    duration?: string,
    no_of_lectures?: number,
    price: number,
    source?: 'course' | 'membership' | 'event' | string
}

export const useCartStore = defineStore("cartStore", () => {

    const items = ref<cartItemInterface[]>([])
    const tax = ref<number>(0.00)
    const loading = ref(false)

    /**
     * 🔥 Load Cart From Backend
     */
    const fetchCart = async () => {
        try {
            loading.value = true
            const response = await api.cart()

            // Adjust depending on your API structure
            // Map API response to your cartItemInterface with default values
            items.value = (response.data.data ?? response.data).map((item: any) => ({
                id: item.id,
                image: item.image ?? '/images/WGRC-logo.png',  // default image
                level: item.level ?? 'Beginner',                     // default level
                category: item.category ?? 'General',               // default category
                title: item.title ?? 'Untitled Item',               // default title
                text: item.text ?? '',                               // default text
                stars: item.stars ?? 5,                              // default stars
                rating: item.rating ?? 5,                            // default rating
                total_rating: item.total_rating ?? 0,               // default total rating
                duration: item.duration ?? 'N/A',                   // default duration
                no_of_lectures: item.no_of_lectures ?? 0,           // default lectures
                price: item.price ?? 0,                              // default price
                source: item.item_type ?? 'course',                     // default source
            }))

        } catch (error) {
            console.error("Error fetching cart:", error)
        } finally {
            loading.value = false
        }
    }

    /**
     * ➕ Add Item To Backend Cart
     */
    const addToCart = async (item: cartItemInterface) => {

        console.log("Sending to backend:", {
            item_id: Number(item.id),
            item_type: item.source,
            title: item.title,
            price: item.price
        })

        try {
            await api.addCart({
                item_id: Number(item.id),
                item_type: item.source,
                title: item.title,
                price: item.price,
                metadata: {
                    category: item.category,
                    level: item.level,
                    image: item.image
                }
            })

            await fetchCart()
            return true

        } catch (error) {
            console.error("Error adding to cart:", error)
            throw error
        }
    }

    /**
     * ❌ Remove Item From Backend Cart
     */
    const removeFromCart = async (id: number | string) => {
        try {
            await api.removeCart(Number(id))

            // Refresh cart
            await fetchCart()

        } catch (error) {
            console.error("Error removing from cart:", error)
        }
    }

    /**
     * ⭐ Review Modal
     */
    const newReview = reactive({
        modal: false,
        rating: null as number | null,
        review: ''
    })

    const toggleNewReviewModal = () => {
        newReview.modal = !newReview.modal
    }

    return {
        items,
        tax,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        newReview,
        toggleNewReviewModal
    }
})
