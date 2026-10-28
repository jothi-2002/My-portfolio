import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PORTFOLIO_DATA } from '../data/portfolio.data';
import { Contact } from './contact';

async function setup() {
  await TestBed.configureTestingModule({ imports: [Contact] }).compileComponents();
  const fixture = TestBed.createComponent(Contact);
  fixture.componentRef.setInput('contact', PORTFOLIO_DATA.contact);
  fixture.detectChanges();
  return { fixture, root: fixture.nativeElement as HTMLElement };
}

function type(root: HTMLElement, id: string, value: string) {
  const el = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${id}`)!;
  el.value = value;
  el.dispatchEvent(new Event('input'));
}

describe('Contact', () => {
  it('shows no errors before submit, then one per invalid field wired up with aria-describedby', async () => {
    const { fixture, root } = await setup();
    expect(root.querySelectorAll('[role="alert"]')).toHaveLength(0);

    root.querySelector<HTMLFormElement>('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(root.querySelectorAll('[role="alert"]')).toHaveLength(4);
    for (const field of ['name', 'email', 'subject', 'message']) {
      const input = root.querySelector(`#contact-${field}`)!;
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(input.getAttribute('aria-describedby')).toBe(`contact-${field}-error`);
      expect(root.querySelector(`#contact-${field}-error`)).not.toBeNull();
    }
  });

  it('prepares Gmail and mailto links for valid input and clears them on reset', async () => {
    const { fixture, root } = await setup();
    type(root, 'contact-name', 'Jane Recruiter');
    type(root, 'contact-email', 'jane@company.com');
    type(root, 'contact-subject', 'Full stack role');
    type(root, 'contact-message', 'We would love to talk about a .NET and Angular role.');

    fixture.componentInstance.onSubmitMailto = () => undefined; // avoid jsdom navigation
    root.querySelector<HTMLFormElement>('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(root.querySelectorAll('[role="alert"]')).toHaveLength(0);
    const status = root.querySelector('[role="status"]');
    expect(status?.textContent).toContain(PORTFOLIO_DATA.contact.email);
    expect(status?.querySelector<HTMLAnchorElement>('a[href^="https://mail.google.com/"]')).not.toBeNull();

    fixture.componentInstance.onReset();
    fixture.detectChanges();
    expect(root.querySelector('[role="status"]')).toBeNull();
  });

  it('lists every direct contact channel from the data', async () => {
    const { root } = await setup();
    const text = root.textContent ?? '';
    for (const value of [
      PORTFOLIO_DATA.contact.email,
      PORTFOLIO_DATA.contact.phone,
      PORTFOLIO_DATA.contact.linkedinLabel,
      PORTFOLIO_DATA.contact.githubLabel,
      PORTFOLIO_DATA.contact.location,
    ]) {
      expect(text).toContain(value);
    }
  });
});
