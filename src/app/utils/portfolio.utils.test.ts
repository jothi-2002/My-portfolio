import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoUrl,
  filterSkillGroups,
  interpolateCountUp,
  validateContactForm,
} from './portfolio.utils';
import { PORTFOLIO_DATA } from '../data/portfolio.data';

test('validateContactForm rejects empty fields and returns clear errors', () => {
  const result = validateContactForm({
    name: '',
    email: 'invalid-email',
    subject: 'Hi',
    message: 'Short',
  });

  assert.equal(result.valid, false);
  assert.equal(result.errors.name, 'Please enter your name.');
  assert.equal(result.errors.email, 'Please enter a valid email address.');
  assert.equal(result.errors.subject, 'Subject must be at least 3 characters.');
  assert.equal(result.errors.message, 'Message must be at least 10 characters.');
});

test('validateContactForm accepts valid input', () => {
  const result = validateContactForm({
    name: 'Recruiter Jane',
    email: 'jane@company.com',
    subject: 'Full Stack Engineer Opportunity',
    message: 'Hi Jothi, we would love to discuss a .NET + Angular role in Bengaluru.',
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});

test('buildMailtoUrl constructs encoded mailto link for muthu25jothi@gmail.com', () => {
  const url = buildMailtoUrl(PORTFOLIO_DATA.contact.email, {
    name: 'Alex Kumar',
    email: 'alex@tech.io',
    subject: 'Role Inquiry',
    message: 'Hello Jothi, let us connect.',
  });

  assert.equal(url.startsWith('mailto:muthu25jothi@gmail.com?subject=Role%20Inquiry&body='), true);
  assert.equal(url.includes('Alex%20Kumar'), true);
  assert.equal(url.includes('alex%40tech.io'), true);
});

test('filterSkillGroups returns all groups for "all" and specific group when filtered', () => {
  const all = filterSkillGroups(PORTFOLIO_DATA.skillGroups, 'all');
  assert.equal(all.length, 6);

  const backend = filterSkillGroups(PORTFOLIO_DATA.skillGroups, 'backend-apis');
  assert.equal(backend.length, 1);
  assert.equal(backend[0]?.category, 'Backend & APIs');
  assert.deepEqual(backend[0]?.skills, ['.NET 9', 'ASP.NET Core Web API', 'RESTful API Design']);
});

test('interpolateCountUp returns 0 at start and target at completion', () => {
  assert.equal(interpolateCountUp(20, 0), 0);
  assert.equal(interpolateCountUp(20, 1), 20);
  assert.equal(interpolateCountUp(6, 0.5) >= 3, true);
});
