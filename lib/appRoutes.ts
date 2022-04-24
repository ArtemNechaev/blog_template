const appRoutes = {
    public: [
        { href: '/', label: 'Main', drawer: false },
        { href: '/drafts', label: 'Posts', drawer: true },
        { href: '/calcs', label: 'Other', drawer: false }
    ],
    private: [
        { href: '/create', label: 'create post' },
        { href: '/mydrafts', label: 'My Posts' },
    ]
}

export default appRoutes;