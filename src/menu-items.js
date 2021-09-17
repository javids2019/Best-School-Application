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
            title: 'Admin',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'basic',
                    title: 'Question Admin',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'questiontype',
                            title: 'Question Type',
                            type: 'item',
                            url: '/questiontype',
                        },
                        {
                            id: 'assessmenttype',
                            title: 'Assessment Type',
                            type: 'item',
                            url: '/assessmenttype',
                        },
                        {
                            id: 'program',
                            title: 'Program',
                            type: 'item',
                            url: '/program',
                        },
                        {
                            id: 'module',
                            title: 'Module',
                            type: 'item',
                            url: '/module',
                        },
                        {
                            id: 'level',
                            title: 'Level',
                            type: 'item',
                            url: '/level',
                        },
                        {
                            id: 'questions',
                            title: 'Question',
                            type: 'item',
                            url: '/questions',
                        },
                        {
                            id: 'questions',
                            title: 'Question Report',
                            type: 'item',
                            url: '/questionReport',
                        }, 
                        {
                            id: 'CheckAndUncheck',
                            title: 'parent',
                            type: 'item',
                            url: '/Parent',
                        },
                        {
                            id: 'users',
                            title: 'Users',
                            type: 'item',
                            url: '/users',
                        },
                        {
                            id: 'loginhistory',
                            title: 'Login History',
                            type: 'item',
                            url: '/loginhistory',
                        },
                        {
                            id: 'quizreport',
                            title: 'Quiz Report',
                            type: 'item',
                            url: '/quizreport',
                        },
                        
                    ]
                },
                {
                    id: 'frontOfficeGroup',
                    title: 'Front Office',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'admissionEnquiry',
                            title: 'Admission Enquiry',
                            type: 'item',
                            url: '/admissionEnquiry',
                        },
                        {
                            id: 'visitors',
                            title: 'Visitor Book',
                            type: 'item',
                            url: '/visitors',
                        },
                        {
                            id: 'phonecalllog',
                            title: 'Phone Call Log',
                            type: 'item',
                            url: '/phonecalllog',
                        },
                        {
                            id: 'postalreceive',
                            title: 'Postal Receive',
                            type: 'item',
                            url: '/postalreceive',
                        },
                        {
                            id: 'postalsent',
                            title: 'Postal Dispatch',
                            type: 'item',
                            url: '/postalsent',
                        },
                        {
                            id: 'complaint',
                            title: 'Register Complaint',
                            type: 'item',
                            url: '/complaint',
                        }  
                    ]
                },
                {
                    id: 'studentInformation',
                    title: 'Student Information',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'studentDetails',
                            title: 'Student Details',
                            type: 'item',
                            url: '/students',
                        },
                        {
                            id: 'studentCategories',
                            title: 'Student Categories',
                            type: 'item',
                            url: '/category',
                        },
                        {
                            id: 'studentHouse',
                            title: 'Student House',
                            type: 'item',
                            url: '/studenthouse',
                        },
                        {
                            id: 'bulkdelete',
                            title: 'Bulk delete',
                            type: 'item',
                            url: '/module',
                        },
                        {
                            id: 'Class',
                            title: 'Student Class',
                            type: 'item',
                            url: '/classnames',
                        },
                        {
                            id: 'section',
                            title: 'Student Section',
                            type: 'item',
                            url: '/sections',
                        }
                         
                    ]
                },
                {
                    id: 'hotelDetails',
                    title: 'Hostel Information',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'studentHostel',
                            title: 'Hostel',
                            type: 'item',
                            url: '/hostel',
                        },
                        {
                            id: 'studentRoomes',
                            title: 'Hostel Rooms',
                            type: 'item',
                            url: '/roomdetails',
                        }
                    ]
                },
                {
                    id: 'transportDetails',
                    title: 'Transport Information',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'transport_Details',
                            title: 'Transport Details',
                            type: 'item',
                            url: '/transport',
                        },
                        {
                            id: 'transport_Route',
                            title: 'Transport Route',
                            type: 'item',
                            url: '/transportroute',
                        }
                    ]
                }
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
                    title: 'Collapse',
                    type: 'item',
                    url: '/basic/collapse',
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