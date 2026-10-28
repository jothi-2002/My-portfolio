import { describe, expect, it } from 'vitest';
import { PORTFOLIO_DATA } from '../data/portfolio.data';
import {
  buildGmailComposeUrl,
  buildMailtoUrl,
  filterSkillGroups,
  interpolateCountUp,
  validateContactForm,
} from './portfolio.utils';

describe('contact form helpers', () => {
  it('validateContactForm rejects empty fields and returns clear errors', () => {
    const result = validateContactForm({
      name: '',
      email: 'invalid-email',
      subject: 'Hi',
      message: 'Short',
    });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe('Please enter your name.');
    expect(result.errors.email).toBe('Please enter a valid email address.');
    expect(result.errors.subject).toBe('Subject must be at least 3 characters.');
    expect(result.errors.message).toBe('Message must be at least 10 characters.');
  });

  it('validateContactForm accepts valid input', () => {
    const result = validateContactForm({
      name: 'Recruiter Jane',
      email: 'jane@company.com',
      subject: 'Full Stack Engineer Opportunity',
      message: 'Hi Jothi, we would love to discuss a .NET + Angular role in Bengaluru.',
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('buildMailtoUrl constructs encoded mailto link for muthu25jothi@gmail.com', () => {
    const url = buildMailtoUrl(PORTFOLIO_DATA.contact.email, {
      name: 'Alex Kumar',
      email: 'alex@tech.io',
      subject: 'Role Inquiry',
      message: 'Hello Jothi, let us connect.',
    });

    expect(url.startsWith('mailto:muthu25jothi@gmail.com?subject=Role%20Inquiry&body=')).toBe(true);
    expect(url).toContain('Alex%20Kumar');
    expect(url).toContain('alex%40tech.io');
  });

  it('buildGmailComposeUrl constructs Gmail web compose URL for visitor Gmail tab', () => {
    const url = buildGmailComposeUrl(PORTFOLIO_DATA.contact.email, {
      name: 'Alex Kumar',
      email: 'alex@tech.io',
      subject: 'Role Inquiry',
      message: 'Hello Jothi, let us connect.',
    });

    expect(
      url.startsWith(
        'https://mail.google.com/mail/?view=cm&fs=1&to=muthu25jothi%40gmail.com&su=Role%20Inquiry&body=',
      ),
    ).toBe(true);
    expect(url).toContain('Alex%20Kumar');
  });
});

describe('skills and animation helpers', () => {
  it('filterSkillGroups returns all groups for "all" and specific group when filtered', () => {
    const all = filterSkillGroups(PORTFOLIO_DATA.skillGroups, 'all');
    expect(all).toHaveLength(6);

    const backend = filterSkillGroups(PORTFOLIO_DATA.skillGroups, 'backend-apis');
    expect(backend).toHaveLength(1);
    expect(backend[0]?.category).toBe('Backend & APIs');
    expect(backend[0]?.skills).toEqual(['.NET 9', 'ASP.NET Core Web API', 'RESTful API Design']);
  });

  it('interpolateCountUp returns 0 at start and target at completion', () => {
    expect(interpolateCountUp(20, 0)).toBe(0);
    expect(interpolateCountUp(20, 1)).toBe(20);
    expect(interpolateCountUp(6, 0.5)).toBeGreaterThanOrEqual(3);
  });
});

describe('portfolio data', () => {
  it('includes GitHub profile and omits defect/endpoint stat cards', () => {
    const githubLink = PORTFOLIO_DATA.hero.socialLinks.find((link) => link.id === 'github');
    expect(githubLink?.href).toBe('https://github.com/jothi-2002');
    expect(PORTFOLIO_DATA.contact.githubUrl).toBe('https://github.com/jothi-2002');

    const statIds = PORTFOLIO_DATA.about.stats.map((stat) => stat.id);
    expect(statIds).not.toContain('rest-endpoints');
    expect(statIds).not.toContain('defects-fixed');
    expect(statIds).toEqual(['experience-years', 'automation-activities']);
  });

  it('has a nav item for every rendered section, in page order', () => {
    expect(PORTFOLIO_DATA.navItems.map((item) => item.id)).toEqual([
      'about',
      'skills',
      'experience',
      'impact',
      'projects',
      'education',
      'contact',
    ]);
  });

  it('uses unique ids within each list so @for tracking stays stable', () => {
    const lists: Record<string, readonly { id: string }[]> = {
      skillGroups: PORTFOLIO_DATA.skillGroups,
      experiences: PORTFOLIO_DATA.experiences,
      impact: PORTFOLIO_DATA.impact,
      projects: PORTFOLIO_DATA.projects,
      chapters: PORTFOLIO_DATA.about.chapters,
      stackLayers: PORTFOLIO_DATA.hero.stackLayers,
    };

    for (const [name, items] of Object.entries(lists)) {
      const ids = items.map((item) => item.id);
      expect(new Set(ids).size, `${name} ids must be unique`).toBe(ids.length);
    }
  });

  it('gives every non-placeholder project a case study with an architecture', () => {
    const real = PORTFOLIO_DATA.projects.filter((project) => !project.isPlaceholder);
    expect(real.length).toBeGreaterThan(0);
    for (const project of real) {
      expect(project.caseStudy?.architecture.length).toBeGreaterThan(0);
    }
  });
});
