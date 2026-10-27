import { SkillGroup } from '../data/portfolio.data';

export interface ContactFormPayload {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactValidationResult {
  readonly valid: boolean;
  readonly errors: {
    readonly name?: string;
    readonly email?: string;
    readonly subject?: string;
    readonly message?: string;
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the contact form fields with strict rules.
 */
export function validateContactForm(payload: ContactFormPayload): ContactValidationResult {
  const errors: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  } = {};

  const trimmedName = payload.name.trim();
  const trimmedEmail = payload.name !== undefined ? payload.email.trim() : '';
  const trimmedSubject = payload.subject.trim();
  const trimmedMessage = payload.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedSubject) {
    errors.subject = 'Please enter a subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please enter a message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds a properly encoded mailto URI for opening the user's email client.
 */
export function buildMailtoUrl(recipientEmail: string, payload: ContactFormPayload): string {
  const subject = encodeURIComponent(payload.subject.trim());
  const bodyLines = [
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    '',
    payload.message.trim(),
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

/**
 * Filters skill groups by selected category ID ('all' returns all groups).
 */
export function filterSkillGroups(
  groups: readonly SkillGroup[],
  selectedCategoryId: string
): readonly SkillGroup[] {
  if (!selectedCategoryId || selectedCategoryId === 'all') {
    return groups;
  }
  return groups.filter((group) => group.id === selectedCategoryId);
}

/**
 * Computes interpolated count-up value using easeOutCubic curve.
 */
export function interpolateCountUp(target: number, progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  const eased = 1 - Math.pow(1 - clamped, 3);
  return Math.round(target * eased);
}
