import { DeferBlockState, TestBed } from '@angular/core/testing';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { App } from './app';
import { PORTFOLIO_DATA } from './data/portfolio.data';

/** Below-the-fold sections sit in `@defer` blocks, so wait for their chunks before asserting. */
async function render() {
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  for (const block of await fixture.getDeferBlocks()) {
    await block.render(DeferBlockState.Complete);
  }
  fixture.detectChanges();
  return { fixture, root: fixture.nativeElement as HTMLElement };
}

describe('App', () => {
  it('should create the app', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('renders one section per nav item, in order, each labelled by its heading', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const { root } = await render();

    for (const item of PORTFOLIO_DATA.navItems) {
      const section = root.querySelector<HTMLElement>(`main section#${item.id}`);
      expect(section, `section #${item.id}`).not.toBeNull();
      const headingId = section!.getAttribute('aria-labelledby');
      expect(root.querySelector(`#${headingId}`), `heading for #${item.id}`).not.toBeNull();
    }
  });

  it('has exactly one h1 and the skip link targets <main>', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const { root } = await render();

    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(root.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      PORTFOLIO_DATA.hero.name,
    );
    expect(root.querySelector('a[href="#main-content"]')).not.toBeNull();
    expect(root.querySelector('main#main-content')).not.toBeNull();
  });

  it('every in-page anchor points at an element that exists', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const { root } = await render();

    const hrefs = new Set(
      Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')).map((a) =>
        a.getAttribute('href')!.slice(1),
      ),
    );
    expect(hrefs.size).toBeGreaterThan(5);
    for (const id of hrefs) {
      expect(root.querySelector(`#${id}`), `#${id}`).not.toBeNull();
    }
  });

  it('opens external links safely and gives every link an accessible name', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const { root } = await render();

    for (const a of Array.from(root.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'))) {
      expect(a.getAttribute('rel') ?? '', a.href).toContain('noopener');
    }
    for (const a of Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href]'))) {
      const name = a.getAttribute('aria-label') ?? a.textContent?.trim();
      expect(name, a.outerHTML.slice(0, 80)).toBeTruthy();
    }
  });

  it('ships the resume file that the Download Resume button points at', () => {
    const href = PORTFOLIO_DATA.hero.resumeUrl;
    expect(existsSync(join(process.cwd(), 'public', href))).toBe(true);
  });

  it('only decorative icons: every svg icon is hidden from assistive tech', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const { root } = await render();

    const icons = Array.from(root.querySelectorAll('app-icon'));
    expect(icons.length).toBeGreaterThan(20);
    for (const icon of icons) {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    }
  });
});
