export const useTemplateStore = defineStore('template', () => {

  const activateToolTip = ref<number>(1)

  const navBarMenus: any[] = [

    {
      title: 'Home',
      routePath: '/',
    },
    {
      title: 'About',
      routePath: '/about',
      hasDropDown: true,
      dropdownItems: [
        { title: "Who We Are", routePath: '/about' },
        { title: "Advisory Board", routePath: '/advisory-board' },
      ]
    },
    {
      title: 'Recognition',
      routePath: '/recognition'
    },
    {
      title: 'Membership',
      routePath: '/membership'
    },
    {
      title: 'Resources',
      routePath: '/mentorship',
      hasDropDown: true,
      dropdownItems: [
        { title: "Mentorship", routePath: '/mentorship' },
        { title: "Facilitators", routePath: '/facilitators' },
      ]
    },
    {
      title: 'Blog',
      routePath: '/#landing-blog'
    },
    {
      title: 'Contact Us',
      routePath: '/contact-us'
    },
  ]


  const accountMenus: any[] = [

    {
      title: 'Dashboard',
      routePath: '/account/dashboard',
    },
    {
      title: 'Learning Center',
      routePath: '/account/learning-center',
    },
    {
      title: 'Forum',
      routePath: '/account/forum',
    },

    {
      title: 'Members',
      routePath: '/account/members',
    },

    {
      title: 'events',
      routePath: '/account/events',
    }
  ]


  const themeColors = reactive({
    base: '#293567',
    accountBg: '#F5F7FD'
  })


  return { navBarMenus, accountMenus, themeColors, activateToolTip }
})
