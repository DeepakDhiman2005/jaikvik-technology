export interface serviceOptionsInterface {
    group?: string;
    options?: string[];
}

// Service options
const serviceOptions: serviceOptionsInterface[] = [
    {
        group: 'Software Development', options: [
            'Customised Software Development',
            'ERP Systems',
            'CRM Solutions',
            'HRM Systems',
        ]
    },
    {
        group: 'Web Development', options: [
            'Custom Web Development',
            'API Integration',
        ]
    },
    {
        group: 'Mobile Application Development', options: [
            'Mobile Application Development',
            'iOS & Android Apps',
            'UI/UX Design',
            'App Optimization',
            'Cross-Platform Development',
            'Maintenance & Support',
        ]
    },
    {
        group: 'SEO & Digital Marketing', options: [
            'Search Engine Optimization',
            'Content Marketing',
            'Social Media Campaigns',
            'PPC Advertising',
            'Analytics & Reporting',
        ]
    },
    {
        group: 'Corporate Film Production', options: [
            'Promotional Videos',
            'Corporate Films',
            'Product Demos',
            'Animation & Motion Graphics',
            'Event Coverage',
        ]
    },
];

export default serviceOptions;