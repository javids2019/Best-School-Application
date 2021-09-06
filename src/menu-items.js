export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'userDashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/user/userdashboard',
                    icon: 'feather icon-server'
                },
            ]
        }, 
        {
            id: 'ui-forms',
            title: 'Users',
            type: 'group',
            icon: 'icon-group',
            children: [
                // {
                //     id: 'questiontype',
                //     title: 'Question Type',
                //     type: 'item',
                //     url: '/questiontype',
                //     icon: 'feather icon-file-text'
                // },               
         
                {
                    id: 'profile',
                    title: 'Profile',
                    type: 'item',
                    url: '/user/profile',
                    icon: 'feather icon-server'
                },
                {
                    id: 'message',
                    title: 'Messages',
                    type: 'item',
                    url: '/user/messages',
                    icon: 'feather icon-server'
                },
                {
                    id: 'contactus',
                    title: 'ContactUs/Feedback',
                    type: 'item',
                    url: '/user/contactus',
                    icon: 'feather icon-server'
                },
            ]
        }
    ],
    adminMenuItems: [
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
                    url: '/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'userDashboard',
                    title: 'User Dashboard',
                    type: 'item',
                    url: '/user/userdashboard',
                    icon: 'feather icon-server'
                },
            ]
        },
        {
            id: 'ui-forms',
            title: 'Question Admin',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'questiontype',
                    title: 'Question Type',
                    type: 'item',
                    url: '/questiontype',
                    icon: 'feather icon-file-text'
                },
                {
                    id: 'assessmenttype',
                    title: 'Assessment Type',
                    type: 'item',
                    url: '/assessmenttype',
                    icon: 'feather icon-server'
                },
                {
                    id: 'program',
                    title: 'Program',
                    type: 'item',
                    url: '/program',
                    icon: 'feather icon-server'
                },
                {
                    id: 'module',
                    title: 'Module',
                    type: 'item',
                    url: '/module',
                    icon: 'feather icon-server'
                },
                {
                    id: 'level',
                    title: 'Level',
                    type: 'item',
                    url: '/level',
                    icon: 'feather icon-server'
                },
                {
                    id: 'questions',
                    title: 'Question',
                    type: 'item',
                    url: '/questions',
                    icon: 'feather icon-server'
                },
                {
                    id: 'questions',
                    title: 'Question Report',
                    type: 'item',
                    url: '/questionReport',
                    icon: 'feather icon-server'
                },
                // {
                //     id: 'questions',
                //     title: 'Quiz',
                //     type: 'item',
                //     url: '/quiz',
                //     icon: 'feather icon-server'
                // }, 
                {
                    id: 'CheckAndUncheck',
                    title: 'CheckAndUncheck',
                    type: 'item',
                    url: '/CheckAndUncheck',
                    icon: 'feather icon-server'
                },
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/users',
                    icon: 'feather icon-server'
                },
                {
                    id: 'loginhistory',
                    title: 'Login History',
                    type: 'item',
                    url: '/loginhistory',
                    icon: 'feather icon-server'
                },
                {
                    id: 'quizreport',
                    title: 'Quiz Report',
                    type: 'item',
                    url: '/quizreport',
                    icon: 'feather icon-server'
                },
                 
            ]
        },
        {
            id: 'ui-forms',
            title: 'Users',
            type: 'group',
            icon: 'icon-group',
            children: [
                             
         
                {
                    id: 'profile',
                    title: 'Profile',
                    type: 'item',
                    url: '/user/profile',
                    icon: 'feather icon-server'
                },
                {
                    id: 'message',
                    title: 'Messages',
                    type: 'item',
                    url: '/user/messages',
                    icon: 'feather icon-server'
                },
                {
                    id: 'contactus',
                    title: 'ContactUs/Feedback',
                    type: 'item',
                    url: '/contactus',
                    icon: 'feather icon-server'
                },
            ]
        },
        {
            id: 'chart-maps',
            title: 'Chart & Maps',
            type: 'group',
            icon: 'icon-charts',
            children: [
                {
                    id: 'charts',
                    title: 'Charts',
                    type: 'item',
                    icon: 'feather icon-pie-chart',
                    url: '/charts/nvd3'
                },
                {
                    id: 'maps',
                    title: 'Map',
                    type: 'item',
                    icon: 'feather icon-map',
                    url: '/maps/google-map'
                }
            ]
        },
        {
            id: 'pages',
            title: 'Pages',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'auth',
                    title: 'Authentication',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    badge: {
                        title: 'New',
                        type: 'label-danger'
                    },
                    children: [
                        {
                            id: 'signup-1',
                            title: 'Sign up',
                            type: 'item',
                            url: '/auth/signup-1',
                            target: true,
                            breadcrumbs: false
                        },
                        {
                            id: 'signin-1',
                            title: 'Sign in',
                            type: 'item',
                            url: '/auth/signin-1',
                            target: true,
                            breadcrumbs: false
                        }
                    ]
                },

                {
                    id: 'sample-page',
                    title: 'Sample Page',
                    type: 'item',
                    url: '/sample-page',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'docs',
                    title: 'Documentation',
                    type: 'item',
                    url: '/docs',
                    classes: 'nav-item',
                    icon: 'feather icon-help-circle'
                },
                {
                    id: 'menu-level',
                    title: 'Menu Levels',
                    type: 'collapse',
                    icon: 'feather icon-menu',
                    children: [
                        {
                            id: 'menu-level-1.1',
                            title: 'Menu Level 1.1',
                            type: 'item',
                            url: '#!',
                        },
                        {
                            id: 'menu-level-1.2',
                            title: 'Menu Level 2.2',
                            type: 'collapse',
                            children: [
                                {
                                    id: 'menu-level-2.1',
                                    title: 'Menu Level 2.1',
                                    type: 'item',
                                    url: '#',
                                },
                                {
                                    id: 'menu-level-2.2',
                                    title: 'Menu Level 2.2',
                                    type: 'collapse',
                                    children: [
                                        {
                                            id: 'menu-level-3.1',
                                            title: 'Menu Level 3.1',
                                            type: 'item',
                                            url: '#',
                                        },
                                        {
                                            id: 'menu-level-3.2',
                                            title: 'Menu Level 3.2',
                                            type: 'item',
                                            url: '#',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'disabled-menu',
                    title: 'Disabled Menu',
                    type: 'item',
                    url: '#',
                    classes: 'nav-item disabled',
                    icon: 'feather icon-power'
                },
                {
                    id: 'buy-now',
                    title: 'Buy Now',
                    type: 'item',
                    icon: 'feather icon-user',
                    classes: 'nav-item',
                    url: 'https://codedthemes.com',
                    target: true,
                    external: true,
                    badge: {
                        title: 'v1.0',
                        type: 'label-primary'
                    }
                }
            ]
        }
    ]
}