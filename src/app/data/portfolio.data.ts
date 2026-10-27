/**
 * Centralized, strictly-typed portfolio data file.
 * Edit this file to update any text, metrics, experience items, skills, or contact links across the site.
 */

export interface NavItem {
  readonly id: string;
  readonly label: string;
}

export interface SocialLink {
  readonly id: 'linkedin' | 'email' | 'github' | 'gitlab';
  readonly label: string;
  readonly href: string;
  readonly icon: string;
  readonly external: boolean;
  readonly todoComment?: string;
}

export interface HeroData {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly location: string;
  readonly resumeUrl: string;
  readonly contactSectionId: string;
  readonly socialLinks: readonly SocialLink[];
}

export interface StatItem {
  readonly id: string;
  readonly numericValue: number;
  readonly suffix: string;
  readonly label: string;
  readonly displayText: string;
}

export interface AboutData {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly stats: readonly StatItem[];
}

export interface SkillGroup {
  readonly id: string;
  readonly category: string;
  readonly icon: string;
  readonly skills: readonly string[];
}

export interface ExperienceItem {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly isCurrent: boolean;
  readonly project: string;
  readonly projectSubtitle?: string;
  readonly highlights: readonly string[];
}

export interface ProjectItem {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly bullets: readonly string[];
  readonly technologies: readonly string[];
  readonly note: string;
  readonly isPlaceholder: boolean;
  readonly todoComment?: string;
}

export interface EducationItem {
  readonly degree: string;
  readonly field: string;
  readonly institution: string;
  readonly period: string;
  readonly scoreLabel: string;
  readonly scoreValue: string;
}

export interface ContactData {
  readonly email: string;
  readonly phone: string;
  readonly phoneDisplay: string;
  readonly linkedinUrl: string;
  readonly linkedinLabel: string;
  readonly githubUrl: string;
  readonly githubLabel: string;
  readonly location: string;
}

export interface PortfolioData {
  readonly navItems: readonly NavItem[];
  readonly hero: HeroData;
  readonly about: AboutData;
  readonly skillGroups: readonly SkillGroup[];
  readonly experiences: readonly ExperienceItem[];
  readonly projects: readonly ProjectItem[];
  readonly education: readonly EducationItem[];
  readonly contact: ContactData;
  readonly footerCopyright: string;
}

export const PORTFOLIO_DATA: PortfolioData = {
  navItems: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    name: 'Jothi MuthuKamaraj',
    title: 'Full Stack Developer',
    tagline:
      'I build reliable .NET and Angular applications, from fast SQL and REST APIs to clean UIs.',
    location: 'Bengaluru, India',
    resumeUrl: '/assets/resume.pdf',
    contactSectionId: 'contact',
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
  },

  about: {
    heading: 'About',
    paragraphs: [
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
  },

  skillGroups: [
    {
      id: 'languages',
      category: 'Languages',
      icon: 'terminal',
      skills: ['C#', 'TypeScript', 'SQL'],
    },
    {
      id: 'backend-apis',
      category: 'Backend & APIs',
      icon: 'dns',
      skills: ['.NET 9', 'ASP.NET Core Web API', 'RESTful API Design'],
    },
    {
      id: 'frontend',
      category: 'Frontend',
      icon: 'web',
      skills: ['Angular', 'HTML5', 'CSS3'],
    },
    {
      id: 'database',
      category: 'Database',
      icon: 'storage',
      skills: ['SQL Queries', 'Query Optimization', 'Server-Side Pagination'],
    },
    {
      id: 'security-access',
      category: 'Security & Access',
      icon: 'verified_user',
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
      skills: [
        'Git',
        'GitHub',
        'GitLab',
        'Postman',
        'JIRA',
        'Agile',
        'Unit Testing',
        'Production Support',
      ],
    },
  ],

  experiences: [
    {
      id: 'vit-se',
      role: 'Software Engineer',
      company: 'VIT Infotech',
      location: 'Bengaluru',
      period: 'Jun 2023 – Present',
      isCurrent: true,
      project: 'IntelliBuddies',
      projectSubtitle: 'Enterprise Business Process Automation Platform',
      highlights: [
        'Eliminated timeout errors on large datasets in the Purchase Order and Subscription modules by optimizing SQL queries and adding server-side pagination.',
        'Designed and integrated REST APIs for billing system integration (tenant, subscription, purchase order approval, SKU, customer, email).',
        'Closed a licensing gap by enforcing license-tier access to Enterprise Variables and Workflow Designer features.',
        'Delivered full stack features across .NET and Angular: Agent enable/disable with 3-role access, cloning for 3 SKU types, email attachments, Email Processing Order and Integration Gateway usage details.',
        'Built 5 Directory automation activities with unit tests, and added a DevExpress FilterBuilder for complex form-binding filters.',
        'Improved authentication and stability: Access Denied flow for LDAP users, AD-deleted user sync, and a more responsive BPA Designer.',
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
      highlights: [],
    },
  ],

  projects: [
    {
      id: 'account-manager',
      title: 'Account Manager',
      subtitle: 'Internal Application, Sole Developer',
      summary:
        'Internal license, subscription and user management application.',
      bullets: [
        'Owned enhancements, bug fixes and support as the sole developer.',
        'Integrated with the sales and billing application through new REST APIs.',
        'Added license regeneration and subscription pricing.',
      ],
      technologies: ['.NET', 'ASP.NET Core Web API', 'Angular', 'SQL', 'REST APIs'],
      note: 'Internal company tool, so no public demo or source.',
      isPlaceholder: false,
    },
    // TODO: Add future public or personal projects to this list
    {
      id: 'coming-soon',
      title: 'More projects coming soon',
      subtitle: 'Future Engineering Work',
      summary:
        'Additional case studies and open-source utilities will be added here.',
      bullets: [],
      technologies: [],
      note: 'TODO: Populate with upcoming project details and repository links.',
      isPlaceholder: true,
      todoComment: 'TODO: Add next project card details here',
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
