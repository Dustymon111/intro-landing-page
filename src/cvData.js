// Content sourced from the 2026 CV. Update here and every page follows.
const icon = (name) => `/skills-icon/icons/${name}/${name}-original.svg`;

export const profile = {
    name: 'Dustin Lionel',
    role: 'Backend Engineer',
    email: 'dustinlionel.pro@gmail.com',
    linkedin: 'https://www.linkedin.com/in/dustin-lionel-398487224/',
    github: 'https://github.com/Dustymon111',
    tagline:
        'I build reliable business workflows, secure access control, and fast queries for HR platforms serving tens of thousands of employees.',
    summary:
        "Backend Engineer with a year of production experience: 480+ merged pull requests on HR platforms serving tens of thousands of employees, and database optimizations of up to 99.8%. I'm strongest in reliable business workflows, secure access control, query performance, and AI integration. Informatics Engineering graduate (GPA 3.94), aiming to build secure, high-impact technology for digital banking in Indonesia.",
};

export const stats = [
    { value: 480, suffix: '+', label: 'merged pull requests' },
    { value: 99.8, suffix: '%', decimals: 1, label: 'faster dashboard query' },
    { value: 39, prefix: '~', suffix: 'K', label: 'employees served' },
    { value: 3.94, decimals: 2, label: 'GPA / 4.00' },
];

// Before/after numbers taken verbatim from the CV.
export const impact = [
    { label: 'Dashboard aggregation query', before: '41 min', after: '3.7 s', ratio: 3.7 / (41 * 60) },
    { label: 'Test suite runtime', before: '100 s', after: '24 s', ratio: 24 / 100 },
    { label: 'AI interview length', before: '45 min', after: '~15 min', ratio: 15 / 45 },
];

export const experience = [
    {
        role: 'Backend Engineer',
        company: 'PT. Rakamin Kolektif Madani',
        period: 'Oct 2025 — Present',
        current: true,
        summary: [
            {
                metric: '480+ merged pull requests in 12 months',
                text: 'across 4 HR technology products, working with Product Managers, Designers, QA, and Frontend Engineers.',
            },
        ],
        groups: [
            {
                title: 'Talent Management System',
                items: [
                    {
                        metric: '~39,000 employees',
                        text: 'served by 3 core modules I engineered (development planning, career path recommendation, succession planning), including multi-stage approvals and committee voting.',
                    },
                    {
                        metric: '41 min → 3.7 s (99.8% faster)',
                        text: 'dashboard aggregation query, by finding the bottleneck through query-plan analysis and removing an unnecessary join, with identical results.',
                    },
                    {
                        metric: '3–4 min → seconds',
                        text: 'page-load query, by adding a targeted index on a 630K-row table with zero write downtime.',
                    },
                    {
                        metric: '500K+ row-by-row inserts',
                        text: 'replaced with a single set-based write, stabilizing a nightly reporting job that had grown to 11.5 minutes and kept failing.',
                    },
                    {
                        text: 'Rule-based career recommendation engine that matches employees to roles by competency, with versioned and auditable decision traces.',
                    },
                    {
                        text: 'Role-based access control across a multi-level organizational hierarchy, so each manager can access only their own reporting line.',
                    },
                ],
            },
            {
                title: 'AI-Powered Mentoring & Performance Platform',
                items: [
                    {
                        metric: '4-stage AI pipeline',
                        text: 'for mentoring sessions (recording → transcription → summary and action items → translation), running on background job queues.',
                    },
                    {
                        metric: '1-hour sync delay eliminated',
                        text: 'by adding timeout-aware retries to a two-way calendar sync (every 15 minutes, 200 sessions per batch), alongside Single Sign-On (SSO) integration.',
                    },
                    {
                        metric: '76% faster test suite (100 s → 24 s)',
                        text: 'by cutting fixture setup from 410 inserts to 5.',
                    },
                    {
                        text: 'Idempotent background jobs, lock-contention fixes, and automatic stuck-session recovery to prevent duplicate processing and stalled sessions.',
                    },
                ],
            },
            {
                title: 'Other Projects',
                items: [
                    {
                        metric: '45-minute AI interviews ending at ~15 minutes:',
                        text: "fixed the interview engine's coverage logic and made its tuning configurable at runtime without redeployment.",
                    },
                    {
                        metric: '401 errors after Google OAuth sign-up:',
                        text: 'traced to a password-hashing race condition and fixed it for new users.',
                    },
                    {
                        text: 'AI-assisted bug-fixing workflow that turns a bug reported in team chat into a proposed fix for engineers to review.',
                    },
                ],
            },
        ],
    },
    {
        role: 'Backend Developer',
        company: 'Freelance',
        period: 'Jun 2023 — Jul 2023',
        summary: [
            {
                text: 'Built and deployed the official website of',
                metric: 'Perhimpunan Dokter Keluarga Indonesia (PDKI)',
                after: 'for thousands of medical professionals, using Next.js, Express.js, and MySQL.',
            },
        ],
        groups: [],
    },
];

export const organization = {
    role: 'Vice President',
    name: 'Mikroskil Programming Club',
    period: 'Oct 2023 — Oct 2024',
    items: [
        { metric: '4 national and international competitions', text: 'entered: GEMASTIK, COMPFEST, ARKAVIDIA, and ICPC.' },
        { text: 'Led member recruitment, taught C++ and competitive programming, and chaired the Ideafuse 2023 competition committee.' },
    ],
};

export const education = {
    degree: 'Bachelor of Informatics Engineering',
    school: 'Mikroskil University',
    period: '2021 — 2025',
    gpa: '3.94 / 4.00',
};

export const skillGroups = [
    {
        title: 'Languages',
        skills: [
            { name: 'JavaScript', icon: icon('javascript') },
            { name: 'TypeScript', icon: icon('typescript') },
            { name: 'Java', icon: icon('java') },
            { name: 'SQL', icon: icon('postgresql') },
            { name: 'Ruby', icon: icon('ruby') },
            { name: 'Python', icon: icon('python') },
            { name: 'Kotlin', icon: icon('kotlin') },
            { name: 'C++', icon: icon('cplusplus') },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', icon: icon('nodejs') },
            { name: 'Express.js', icon: icon('express') },
            { name: 'Spring Boot', icon: icon('spring') },
            { name: 'Ruby on Rails', icon: '/skills-icon/icons/rails/rails-plain.svg' },
            { name: 'Sequelize', icon: icon('sequelize') },
            { name: 'BullMQ' },
            { name: 'REST API design' },
            { name: 'JWT / SSO (OAuth 2.0)', icon: icon('oauth') },
        ],
    },
    {
        title: 'Databases',
        skills: [
            { name: 'PostgreSQL', icon: icon('postgresql') },
            { name: 'MySQL', icon: icon('mysql') },
            { name: 'Redis', icon: icon('redis') },
            { name: 'Query optimization' },
            { name: 'Indexing' },
            { name: 'Transactions & locking' },
        ],
    },
    {
        title: 'AI Integration',
        skills: [
            { name: 'Google Gemini', icon: icon('google') },
            { name: 'OpenAI GPT' },
            { name: 'Whisper' },
            { name: 'Prompt engineering' },
        ],
    },
    {
        title: 'Tools',
        skills: [
            { name: 'Git', icon: icon('git') },
            { name: 'GitHub Actions', icon: icon('githubactions') },
            { name: 'Docker', icon: icon('docker') },
            { name: 'Jest', icon: '/skills-icon/icons/jest/jest-plain.svg' },
            { name: 'RSpec', icon: icon('rspec') },
            { name: 'React', icon: icon('react') },
            { name: 'Next.js', icon: icon('nextjs') },
        ],
    },
];

export const certifications = [
    'Red Hat Enterprise Linux System Administration I',
    'Android Application Development Intermediate (Dicoding)',
    'Introduction to Cloud Development (IBM)',
];

export const spokenLanguages = ['Bahasa Indonesia', 'English'];
