<template>
  <span class="position-relative cursor-pointer" @click="goToCart">
    <i class="bi bi-cart"></i>
    <span style="font-size: 10px;"
          class="position-absolute top-0 start-100 translate-middle badge p-1 rounded-pill bg-danger">
      {{ cartStore.items.length }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart-store'
import api from '~/api'

const cartStore = useCartStore()

function goToCart() {
  navigateTo('/account/cart')
}

// Fetch cart from backend
const fetchCart = async () => {
  try {
    const response = await api.cart() // your GET /carts endpoint
    const data = response.data?.data ?? [] // adjust if your response structure differs

    // Map backend data to store format (with defaults)
    const items = data.map((item: any) => ({
      id: item.id,
      title: item.title ?? item.name ?? 'Untitled',
      category: item.category ?? 'Membership',
      price: Number(item.price ?? item.annual_fee ?? 0),
      source: item.source ?? 'membership',
      image: item.image ?? '/images/WGRC-logo.png',
      stars: item.stars ?? 5,
      rating: item.rating ?? 5,
      total_rating: item.total_rating ?? 100,
      duration: item.duration ?? (item.source === 'course' ? '1 year' : undefined),
      no_of_lectures: item.no_of_lectures ?? (item.source === 'course' ? 0 : undefined),
    }))

    // Store in cart store
    cartStore.items = items
  } catch (err) {
    console.error('Failed to fetch cart:', err)
  }
}

onMounted(() => {
  fetchCart()
})
</script>