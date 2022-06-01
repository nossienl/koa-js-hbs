
export const pages = [
    {
        id: 'index',
        link: '/',
        template: 'index',
        name: 'Home',
        data: {
            title: "Home",
            people: ['niels', 'test', 'test 2'],
            metadata: {
                pageTitle: "Home Page",
                metatags: [
                    {
                        name: "description",
                        content: 'index page'
                    }
                ]
            }
        }
    },
    {
        id: 'nieuws',
        link: '/nieuws',
        template: 'news',
        name: 'Nieuws',
        data: {
            title: "Nieuws",
            metadata: {
                pageTitle: "Nieuws Page",
                metatags: [
                    {
                        name: "description",
                        content: 'nieuws page'
                    }
                ]
            }
        }
    },
    {
        id: 'nieuws/item',
        title: 'nieuws-item',
        link: '/nieuws/item',
        template: 'news/item',
        name: 'Nieuws Item',
        data: {
            title: "Nieuws Item",
            metadata: {
                pageTitle: "Nieuws Item Page",
            }
        }
    },
    {
        id: 'profile',
        link: '/profile',
        name: 'Profile Link',
        template: 'profile',
        data: {
            title: "Profile",
            metadata: {
                pageTitle: "Profile Page",
            }
        }
    },
    {
        id: 'about',
        link: '/about',
        name: 'About us',
        template: 'about',
        data: {
            title: "About page",
            metadata: {
                pageTitle: "About Page",
            }
        }
    },
    {
        id: 'contact',
        link: '/contact',
        name: 'Contact',
        template: 'contact',
        data: {
            title: "Contact page",
            metadata: {
                pageTitle: "Contact Page",
            }
        }
    }
];