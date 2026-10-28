/**
 * Strictly-typed content models for the portfolio.
 * The content itself lives in `portfolio.data.ts`.
 */

/**
 * Which part of the stack a piece of content belongs to.
 * Drives the colour coding shared by the hero, skills, experience and case study.
 */
export type StackLayer = 'core' | 'ui' | 'api' | 'data' | 'security' | 'ops';

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
}

export interface StackLayerCard {
  readonly id: string;
  readonly layer: StackLayer;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
}

export interface HeroData {
  readonly name: string;
  readonly title: string;
  readonly kicker: string;
  readonly tagline: string;
  readonly location: string;
  readonly resumeUrl: string;
  readonly contactSectionId: string;
  readonly currentRole: string;
  readonly socialLinks: readonly SocialLink[];
  readonly stackLayers: readonly StackLayerCard[];
}

export interface StatItem {
  readonly id: string;
  readonly numericValue: number;
  readonly suffix: string;
  readonly label: string;
  readonly displayText: string;
}

export interface StoryChapter {
  readonly id: string;
  readonly period: string;
  readonly title: string;
  readonly body: string;
  readonly icon: string;
  readonly isCurrent: boolean;
}

export interface AboutData {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly stats: readonly StatItem[];
  readonly chaptersHeading: string;
  readonly chapters: readonly StoryChapter[];
}

export interface SkillGroup {
  readonly id: string;
  readonly category: string;
  readonly icon: string;
  readonly layer: StackLayer;
  readonly skills: readonly string[];
}

export interface ExperienceHighlight {
  readonly text: string;
  readonly layer: StackLayer;
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
  readonly highlights: readonly ExperienceHighlight[];
  readonly technologies: readonly string[];
}

/** One problem-solving story: what was wrong, what was done, what changed. */
export interface ImpactItem {
  readonly id: string;
  readonly layer: StackLayer;
  readonly icon: string;
  readonly title: string;
  readonly problem: string;
  readonly approach: string;
  readonly outcome: string;
  readonly technologies: readonly string[];
}

export interface ArchitectureNode {
  readonly id: string;
  readonly layer: StackLayer;
  readonly icon: string;
  readonly label: string;
  readonly detail: string;
  readonly technologies: readonly string[];
}

export interface ArchitectureIntegration {
  readonly label: string;
  readonly detail: string;
  readonly icon: string;
}

export interface CaseStudy {
  readonly challenge: string;
  readonly role: string;
  readonly approach: readonly string[];
  readonly outcomes: readonly string[];
  readonly architecture: readonly ArchitectureNode[];
  readonly integration: ArchitectureIntegration;
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
  readonly caseStudy?: CaseStudy;
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
  readonly heading: string;
  readonly intro: string;
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
  readonly impact: readonly ImpactItem[];
  readonly projects: readonly ProjectItem[];
  readonly education: readonly EducationItem[];
  readonly contact: ContactData;
  readonly footerCopyright: string;
}
