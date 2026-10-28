import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PORTFOLIO_DATA } from '../data/portfolio.data';
import { Skills } from './skills';

describe('Skills', () => {
  it('filters skill cards by category and back to all', async () => {
    await TestBed.configureTestingModule({ imports: [Skills] }).compileComponents();
    const fixture = TestBed.createComponent(Skills);
    fixture.componentRef.setInput('skillGroups', PORTFOLIO_DATA.skillGroups);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    const cards = () => root.querySelectorAll('article').length;
    const pill = (label: string) =>
      Array.from(root.querySelectorAll<HTMLButtonElement>('button[aria-pressed]')).find((b) =>
        b.textContent?.includes(label),
      )!;

    expect(cards()).toBe(PORTFOLIO_DATA.skillGroups.length);

    pill('Frontend').click();
    fixture.detectChanges();
    expect(cards()).toBe(1);
    expect(pill('Frontend').getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('article')?.textContent).toContain('Angular');

    pill('All').click();
    fixture.detectChanges();
    expect(cards()).toBe(PORTFOLIO_DATA.skillGroups.length);
  });
});
