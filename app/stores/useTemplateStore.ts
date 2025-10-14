import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('template', () => {

  const activateToolTip = ref<number>(1)

  const navBarMenus: any[] = [

    {
      title: 'Home',
      routePath: '/'
    },
    {
      title: 'About',
      routePath: '#landing-about'
    },
    {
      title: 'Recognition',
      routePath: '/'
    },
    {
      title: 'Membership',
      routePath: '/'
    },
    {
      title: 'Resources',
      routePath: '/'
    },
    {
      title: 'Blog',
      routePath: '#landing-blog'
    },
    {
      title: 'Contact Us',
      routePath: '/'
    },
  ]

  const themeColors = reactive({
    base: '#293567',
  })


  return { navBarMenus, themeColors, activateToolTip }
})
