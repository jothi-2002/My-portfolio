/**
 * Centralized portfolio content.
 * Edit this file to update any text, experience, skills, case studies or contact links across the site.
 * Types live in `portfolio.models.ts`.
 */
import { PortfolioData } from './portfolio.models';

export * from './portfolio.models';

export const PORTFOLIO_DATA: PortfolioData = {
  navItems: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'impact', label: 'Impact' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    name: 'Jothi MuthuKamaraj',
    title: 'Full Stack Developer',
    kicker: '.NET 9 & Angular Full Stack',
    tagline:
      'I build reliable .NET and Angular applications, from fast SQL and REST APIs to clean UIs.',
    location: 'Bengaluru, India',
    resumeUrl: '/assets/resume.pdf',
    contactSectionId: 'contact',
    currentRole: 'Software Engineer @ IntelliBuddies',
    socialLinks: [
      {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/jothim-dev',
        icon: 'work_outline',
        external: true,
      },
      {
        id: 'email',
        label: 'Email',
        href: 'mailto:muthu25jothi@gmail.com',
        icon: 'mail_outline',
        external: false,
      },
      {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/jothi-2002',
        icon: 'code',
        external: true,
      },
    ],
    stackLayers: [
      {
        id: 'ui',
        layer: 'ui',
        icon: 'web',
        title: 'Frontend Architecture',
        description:
          'Angular, TypeScript, HTML5, CSS3, complex filter builders, and responsive enterprise workflows.',
        technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3'],
      },
      {
        id: 'api',
        layer: 'api',
        icon: 'dns',
        title: 'Backend & REST APIs',
        description:
          'C#, .NET 9, ASP.NET Core Web API, billing & tenant system integrations, role-based & license-tier access control.',
        technologies: ['C#', '.NET 9', 'ASP.NET Core', 'REST'],
      },
      {
        id: 'data',
        layer: 'data',
        icon: 'storage',
        title: 'Database & Performance',
        description:
          'SQL query optimization and server-side pagination eliminating timeout errors on large enterprise datasets.',
        technologies: ['SQL', 'Query Optimization', 'Pagination'],
      },
    ],
  },

  about: {
    heading: 'From electronics to enterprise software',
    paragraphs: [
      'I trained as an electronics and communication engineer, then moved into software, where I enjoy the part of the job that sits between systems: the query that has to stay fast, the API that two products depend on, and the screen a person actually uses.',
      'Full Stack Software Engineer with 3+ years of experience building enterprise automation software. I deliver complete features spanning REST APIs, SQL and the Angular UI.',
      "I'm strong in query optimization, role-based security and system integration, and I'm the sole developer of an internal license and subscription management application.",
    ],
    stats: [
      {
        id: 'experience-years',
        numericValue: 3,
        suffix: '+',
        label: 'Years Experience',
        displayText: '3+ Years Experience',
      },
      {
        id: 'automation-activities',
        numericValue: 5,
        suffix: '',
        label: 'automation activities built',
        displayText: '5 automation activities built',
      },
    ],
    chaptersHeading: 'The path so far',
    chapters: [
      {
        id: 'foundations',
        period: '2019 – 2023',
        title: 'Engineering foundations',
        body: 'Studied Electronics and Communication Engineering at Mepco Schlenk Engineering College, building the systems-thinking habits that still shape how I design software.',
        icon: 'school',
        isCurrent: false,
      },
      {
        id: 'trainee',
        period: 'Feb – May 2023',
        title: 'First production codebase',
        body: 'Joined VIT Infotech as a Software Engineer Trainee on IntelliBuddies, an enterprise business process automation platform.',
        icon: 'rocket_launch',
        isCurrent: false,
      },
      {
        id: 'engineer',
        period: 'Jul 2023 onward',
        title: 'Full stack engineer',
        body: 'Shipping features end to end on IntelliBuddies: SQL and REST APIs in .NET, Angular screens on top, and the security and licensing rules in between.',
        icon: 'layers',
        isCurrent: false,
      },
      {
        id: 'owner',
        period: 'Today',
        title: 'Owning a product',
        body: 'Sole developer of Account Manager, the internal license, subscription and user management application: enhancements, fixes and support, all mine.',
        icon: 'verified',
        isCurrent: true,
      },
    ],
  },

  skillGroups: [
    {
      id: 'languages',
      category: 'Languages',
      icon: 'terminal',
      layer: 'core',
      skills: ['C#', 'TypeScript', 'SQL'],
    },
    {
      id: 'backend-apis',
      category: 'Backend & APIs',
      icon: 'dns',
      layer: 'api',
      skills: ['.NET 9', 'ASP.NET Core Web API', 'RESTful API Design'],
    },
    {
      id: 'frontend',
      category: 'Frontend',
      icon: 'web',
      layer: 'ui',
      skills: ['Angular', 'HTML5', 'CSS3'],
    },
    {
      id: 'database',
      category: 'Database',
      icon: 'storage',
      layer: 'data',
      skills: ['SQL Queries', 'Query Optimization', 'Server-Side Pagination'],
    },
    {
      id: 'security-access',
      category: 'Security & Access',
      icon: 'verified_user',
      layer: 'security',
      skills: [
        'Role-Based Access',
        'License-Based Feature Gating',
        'LDAP / Windows Authentication',
      ],
    },
    {
      id: 'tools-practices',
      category: 'Tools & Practices',
      icon: 'build_circle',
      layer: 'ops',
      skills: [
        'Git',
        'GitHub',
        'GitLab',
        'Postman',
        'JIRA',
        'Agile',
        'Unit Testing',
        'Bug Triage',
        'Production Support',
      ],
    },
  ],

  experiences: [
    {
      id: 'intellibuddies-se',
      role: 'Software Engineer',
      company: 'IntelliBuddies',
      location: 'Bengaluru',
      period: 'Jul 2023 – Present',
      isCurrent: true,
      project: 'IntelliBuddies',
      projectSubtitle: 'Enterprise Business Process Automation Platform',
      technologies: ['C#', '.NET 9', 'ASP.NET Core', 'Angular', 'SQL', 'DevExpress', 'GitLab'],
      highlights: [
        {
          layer: 'data',
          text: 'Eliminated timeout errors on large datasets in the Purchase Order and Subscription modules by optimizing SQL queries and adding server-side pagination.',
        },
        {
          layer: 'api',
          text: 'Designed and shipped 6 REST API endpoints for billing system integration (tenant, subscription, purchase order approval, SKU, customer, email), keeping two systems in sync.',
        },
        {
          layer: 'security',
          text: 'Closed a licensing gap by enforcing license-tier access to Enterprise Variables and Workflow Designer features.',
        },
        {
          layer: 'core',
          text: 'Delivered full stack features across .NET and Angular: Agent enable/disable with 3-role access, cloning for 3 SKU types, email attachments, Email Processing Order and Integration Gateway usage details.',
        },
        {
          layer: 'core',
          text: 'Built 5 Directory automation activities with unit tests, and added a DevExpress FilterBuilder for complex form-binding filters.',
        },
        {
          layer: 'security',
          text: 'Improved authentication and stability: Access Denied flow for LDAP users, AD-deleted user sync, and a more responsive BPA Designer.',
        },
        {
          layer: 'ops',
          text: 'Fixed 20+ production defects across Control Room, Form Designer and Account Manager.',
        },
      ],
    },
    {
      id: 'vit-trainee',
      role: 'Software Engineer Trainee',
      company: 'VIT Infotech',
      location: 'Bengaluru',
      period: 'Feb 2023 – May 2023',
      isCurrent: false,
      project: 'IntelliBuddies',
      projectSubtitle: 'Enterprise Business Process Automation Platform',
      technologies: [],
      highlights: [],
    },
  ],

  impact: [
    {
      id: 'large-datasets',
      layer: 'data',
      icon: 'speed',
      title: 'Large datasets kept timing out',
      problem:
        'Purchase Order and Subscription screens threw timeout errors once the data grew large.',
      approach:
        'Optimized the SQL queries behind them and moved to server-side pagination, so each request only fetches the page being viewed.',
      outcome: 'Timeout errors eliminated on large datasets.',
      technologies: ['SQL', 'Query Optimization', 'Server-Side Pagination'],
    },
    {
      id: 'billing-sync',
      layer: 'api',
      icon: 'sync_alt',
      title: 'Two systems had to agree',
      problem:
        'The platform and the billing system each held part of the truth about tenants, subscriptions and orders.',
      approach:
        'Designed and shipped 6 REST API endpoints covering tenant, subscription, purchase order approval, SKU, customer and email.',
      outcome: 'The two systems stay in sync through one clear integration surface.',
      technologies: ['ASP.NET Core Web API', 'REST', 'Postman'],
    },
    {
      id: 'licensing-gap',
      layer: 'security',
      icon: 'lock',
      title: 'A licensing gap let features leak',
      problem:
        'Enterprise Variables and Workflow Designer were reachable without the right license tier.',
      approach:
        'Enforced license-tier access to both features, building on role-based access and license-based feature gating.',
      outcome: 'Premium features are available only to the tiers that include them.',
      technologies: ['License-Based Gating', 'Role-Based Access', 'C#'],
    },
    {
      id: 'directory-auth',
      layer: 'security',
      icon: 'badge',
      title: 'Directory users hit dead ends',
      problem:
        'LDAP users had no clear path when access was refused, and users deleted from AD could linger in the platform.',
      approach:
        'Added an Access Denied flow for LDAP users and a sync for AD-deleted users, alongside a more responsive BPA Designer.',
      outcome: 'Clearer sign-in behaviour and user records that match the directory.',
      technologies: ['LDAP', 'Windows Authentication', 'Angular'],
    },
  ],

  projects: [
    {
      id: 'account-manager',
      title: 'Account Manager',
      subtitle: 'Internal Application, Sole Developer',
      summary: 'Internal license, subscription and user management application.',
      bullets: [
        'Owned enhancements, bug fixes and support as the sole developer.',
        'Integrated with the sales and billing application through new REST APIs.',
        'Added license regeneration and subscription pricing; fixed renewal and top-up issues.',
      ],
      technologies: ['.NET', 'ASP.NET Core Web API', 'Angular', 'SQL', 'REST APIs'],
      note: 'Internal company tool, so no public demo or source.',
      isPlaceholder: false,
      caseStudy: {
        challenge:
          'Licenses, subscriptions and users had to be managed in one internal tool that also stays consistent with the separate sales and billing application.',
        role: 'Sole developer: I own the application end to end, from enhancements and bug fixes to ongoing support.',
        approach: [
          'Integrated the app with the sales and billing application through new REST APIs.',
          'Added license regeneration and subscription pricing.',
          'Fixed renewal and top-up issues.',
        ],
        outcomes: [
          'One application for license, subscription and user management.',
          'Sales and billing data connected through APIs instead of manual hand-offs.',
          'Renewals and top-ups behave correctly.',
        ],
        architecture: [
          {
            id: 'ui',
            layer: 'ui',
            icon: 'web',
            label: 'Angular UI',
            detail: 'Screens for licenses, subscriptions and users.',
            technologies: ['Angular', 'TypeScript'],
          },
          {
            id: 'api',
            layer: 'api',
            icon: 'dns',
            label: 'ASP.NET Core Web API',
            detail: 'REST endpoints and the business rules behind them.',
            technologies: ['.NET', 'C#', 'REST'],
          },
          {
            id: 'data',
            layer: 'data',
            icon: 'storage',
            label: 'SQL database',
            detail: 'Persistent license, subscription and user records.',
            technologies: ['SQL'],
          },
        ],
        integration: {
          label: 'Sales & billing application',
          detail: 'Connected to the API layer through new REST APIs.',
          icon: 'sync_alt',
        },
      },
    },
    // TODO: Add future public or personal projects to this list
    {
      id: 'coming-soon',
      title: 'More projects coming soon',
      subtitle: 'Future Engineering Work',
      summary: 'Additional case studies and open-source utilities will be added here.',
      bullets: [],
      technologies: [],
      note: 'TODO: Populate with upcoming project details and repository links.',
      isPlaceholder: true,
    },
  ],

  education: [
    {
      degree: 'Bachelor of Engineering',
      field: 'Electronics and Communication Engineering',
      institution: 'Mepco Schlenk Engineering College',
      period: '2019 – 2023',
      scoreLabel: 'CGPA',
      scoreValue: '7.85 / 10',
    },
  ],

  contact: {
    heading: "Let's build something reliable",
    intro:
      'Reach out directly via email, phone, LinkedIn, or GitHub, or use the form below to compose an email in your Gmail or default mail app.',
    email: 'muthu25jothi@gmail.com',
    phone: '6363185955',
    phoneDisplay: '+91 6363185955',
    linkedinUrl: 'https://www.linkedin.com/in/jothim-dev',
    linkedinLabel: 'linkedin.com/in/jothim-dev',
    githubUrl: 'https://github.com/jothi-2002',
    githubLabel: 'github.com/jothi-2002',
    location: 'Bengaluru, India',
  },

  footerCopyright: '© 2026 Jothi MuthuKamaraj',
};
