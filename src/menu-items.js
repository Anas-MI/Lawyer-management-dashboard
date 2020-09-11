export const navigation = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-bar-chart',
          url: '/admin/dashboard',
        },
        {
          id: 'lawyermanage',
          title: 'Manage Lawyers',
          type: 'item',
          icon: 'feather icon-target',
          url: '/lawyers',
        },
        {
          id: 'subscriptionmanage',
          title: 'Manage Subscriptions',
          type: 'item',
          icon: 'feather icon-users',
          url: '/manage/subscription',
        },
        {
          id: 'support',
          title: 'Support',
          type: 'item',
          icon: 'feather icon-help-circle',
          url: '/support',
        },
        {
          id: 'content',
          title: 'Manage Content',
          type: 'collapse',
          icon: 'feather icon-book',
          children: [
            {
              id: 'blogs',
              title: 'Blogs',
              type: 'item',
              icon: 'feather icon-file',
              url: '/manage/blogs',
            },
            {
              id: 'features',
              title: 'Features',
              type: 'item',
              icon: 'feather icon-file-plus',
              url: '/manage/features',
            },
            {
              id: 'plans',
              title: 'Plans',
              type: 'item',
              icon: 'feather icon-codepen',
              url: '/manage/plans',
            },
            {
              id: 'Home',
              title: 'Home',
              type: 'item',
              icon: 'feather icon-users',
              url: '/manage/footer',
            },
          ],
        },
        /*
        {
          id: 'contactmanage',
          title: 'Manage Contacts',
          type: 'item',
          icon: 'feather icon-mail',
          url: '/manage/contacts',
        },
        */

        {
          id: 'logout',
          title: 'Logout',
          type: 'item',
          icon: 'feather icon-log-out',
          url: '/logout',
        },
      ],
    },
  ],
};

export default {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-bar-chart',
          url: '/dashboard/default',
        },
        {
          id: 'calendar',
          title: 'Calendar',
          type: 'item',
          icon: 'feather icon-calendar',
          url: '/calendar',
        },
        {
          id: 'Task',
          title: 'Task',
          type: 'item',
          icon: 'feather icon-list',
          url: '/tasks',
        },
        {
          id: 'matters',
          title: 'Matters',
          type: 'item',
          icon: 'feather icon-target',
          url: '/manage/matter',
        },
        {
          id: 'contacts',
          title: 'Contact',
          type: 'item',
          icon: 'feather icon-mail',
          url: '/manage/contacts',
        },
        {
          id: 'activities',
          title: 'Activities',
          type: 'item',
          icon: 'feather icon-users',
          url: '/manage/activity',
        },
        {
          id: 'billings',
          title: 'Billings',
          type: 'item',
          icon: 'feather icon-book',
          url: '/manage/billing',
        },
        {
          id: 'accounts',
          title: 'Accounts',
          type: 'item',
          icon: 'feather icon-server',
          url: '/accounts',
        },
        {
          id: 'documents',
          title: 'Documents',
          type: 'item',
          icon: 'feather icon-file',
          url: '/documents',
        },
        {
          id: 'communication',
          title: 'Communication ',
          type: 'item',
          icon: 'feather icon-phone-call',
          url: '/manage/communication',
        },
        /*
        {
          id: 'reports',
          title: 'Reports',
          type: 'item',
          icon: 'feather icon-book',
          url: '/',
        },
        */
        {
          id: 'settings',
          title: 'Settings',
          type: 'item',
          icon: 'feather icon-settings',
          url: '/settings',
        },
        {
          id: 'help',
          title: 'Support',
          type: 'item',
          icon: 'feather icon-help-circle',
          url: '/help',
        },
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          icon: 'feather icon-user',
          url: '/profile',
        },
        {
          id: 'logout',
          title: 'Logout',
          type: 'item',
          icon: 'feather icon-log-out',
          url: '/logout',
        },
      ],
    },
    // for test commit
    // {
    //     id: 'ui-element',
    //     title: 'UI ELEMENT',
    //     type: 'group',
    //     icon: 'icon-ui',
    //     children: [
    //         {
    //             id: 'basic',
    //             title: 'Component',
    //             type: 'collapse',
    //             icon: 'feather icon-box',
    //             children: [
    //                 {
    //                     id: 'button',
    //                     title: 'Button',
    //                     type: 'item',
    //                     url: '/basic/button'
    //                 },
    //                 {
    //                     id: 'badges',
    //                     title: 'Badges',
    //                     type: 'item',
    //                     url: '/basic/badges'
    //                 },
    //                 {
    //                     id: 'breadcrumb-pagination',
    //                     title: 'Breadcrumb & Pagination',
    //                     type: 'item',
    //                     url: '/basic/breadcrumb-paging'
    //                 },
    //                 {
    //                     id: 'collapse',
    //                     title: 'Collapse',
    //                     type: 'item',
    //                     url: '/basic/collapse'
    //                 },
    //                 {
    //                     id: 'tabs-pills',
    //                     title: 'Tabs & Pills',
    //                     type: 'item',
    //                     url: '/basic/tabs-pills'
    //                 },
    //                 {
    //                     id: 'typography',
    //                     title: 'Typography',
    //                     type: 'item',
    //                     url: '/basic/typography'
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: 'ui-forms',
    //     title: 'Forms & Tables',
    //     type: 'group',
    //     icon: 'icon-group',
    //     children: [
    //         {
    //             id: 'form-basic',
    //             title: 'Form Elements',
    //             type: 'item',
    //             url: '/forms/form-basic',
    //             icon: 'feather icon-file-text'
    //         },
    //         {
    //             id: 'bootstrap',
    //             title: 'Table',
    //             type: 'item',
    //             icon: 'feather icon-server',
    //             url: '/tables/bootstrap'
    //         }
    //     ]
    // },
    // {
    //     id: 'chart-maps',
    //     title: 'Chart & Maps',
    //     type: 'group',
    //     icon: 'icon-charts',
    //     children: [
    //         {
    //             id: 'charts',
    //             title: 'Charts',
    //             type: 'item',
    //             icon: 'feather icon-pie-chart',
    //             url: '/charts/nvd3'
    //         },
    //         {
    //             id: 'maps',
    //             title: 'Map',
    //             type: 'item',
    //             icon: 'feather icon-map',
    //             url: '/maps/google-map'
    //         }
    //     ]
    // },
    // {
    //     id: 'pages',
    //     title: 'Pages',
    //     type: 'group',
    //     icon: 'icon-pages',
    //     children: [
    //         {
    //             id: 'auth',
    //             title: 'Authentication',
    //             type: 'collapse',
    //             icon: 'feather icon-lock',
    //             badge: {
    //                 title: 'New',
    //                 type: 'label-danger'
    //             },
    //             children: [
    //                 {
    //                     id: 'signup-1',
    //                     title: 'Sign up',
    //                     type: 'item',
    //                     url: '/auth/signup-1',
    //                     target: true,
    //                     breadcrumbs: false
    //                 },
    //                 {
    //                     id: 'signin-1',
    //                     title: 'Sign in',
    //                     type: 'item',
    //                     url: '/auth/signin-1',
    //                     target: true,
    //                     breadcrumbs: false
    //                 }
    //             ]
    //         },

    //         {
    //             id: 'sample-page',
    //             title: 'Sample Page',
    //             type: 'item',
    //             url: '/sample-page',
    //             classes: 'nav-item',
    //             icon: 'feather icon-sidebar'
    //         },
    //         {
    //             id: 'docs',
    //             title: 'Documentation',
    //             type: 'item',
    //             url: '/docs',
    //             classes: 'nav-item',
    //             icon: 'feather icon-help-circle'
    //         },
    //         {
    //             id: 'menu-level',
    //             title: 'Menu Levels',
    //             type: 'collapse',
    //             icon: 'feather icon-menu',
    //             children: [
    //                 {
    //                     id: 'menu-level-1.1',
    //                     title: 'Menu Level 1.1',
    //                     type: 'item',
    //                     url: '#!',
    //                 },
    //                 {
    //                     id: 'menu-level-1.2',
    //                     title: 'Menu Level 2.2',
    //                     type: 'collapse',
    //                     children: [
    //                         {
    //                             id: 'menu-level-2.1',
    //                             title: 'Menu Level 2.1',
    //                             type: 'item',
    //                             url: '#',
    //                         },
    //                         {
    //                             id: 'menu-level-2.2',
    //                             title: 'Menu Level 2.2',
    //                             type: 'collapse',
    //                             children: [
    //                                 {
    //                                     id: 'menu-level-3.1',
    //                                     title: 'Menu Level 3.1',
    //                                     type: 'item',
    //                                     url: '#',
    //                                 },
    //                                 {
    //                                     id: 'menu-level-3.2',
    //                                     title: 'Menu Level 3.2',
    //                                     type: 'item',
    //                                     url: '#',
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             id: 'disabled-menu',
    //             title: 'Disabled Menu',
    //             type: 'item',
    //             url: '#',
    //             classes: 'nav-item disabled',
    //             icon: 'feather icon-power'
    //         },
    //         /*{
    //             id: 'buy-now',
    //             title: 'Buy Now',
    //             type: 'item',
    //             icon: 'feather icon-user',
    //             classes: 'nav-item',
    //             url: 'https://codedthemes.com',
    //             target: true,
    //             external: true,
    //             badge: {
    //                 title: 'v1.0',
    //                 type: 'label-primary'
    //             }
    //         }*/
    //     ]
    // }
  ],
};
