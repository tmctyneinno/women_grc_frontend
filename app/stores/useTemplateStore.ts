export const useTemplateStore = defineStore('template', () => {

  const activateToolTip = ref<number>(1)

  const navBarMenus: any[] = [

    {
      title: 'Home',
      routePath: '/',
    },
    {
      title: 'About',
      routePath: '/about-us',
      hasDropDown: true,
      dropdownItems: [
        { title: "Who We Are", routePath: '/about-us' },
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
    // {
    //   title: 'Resources',
    //   routePath: '/mentorship',
    //   hasDropDown: true,
    //   dropdownItems: [
    //     { title: "Mentorship", routePath: '/mentorship' },
    //     { title: "Facilitators", routePath: '/facilitators' },
    //   ]
    // },
    {
      title: 'Blog',
      routePath: '/#landing-blog'
    },
    {
      title: 'Contact Us',
      routePath: '/contact-us'
    },
  ]

  const themeColors = reactive({
    base: '#293567',
  })


  return { navBarMenus, themeColors, activateToolTip }
})
