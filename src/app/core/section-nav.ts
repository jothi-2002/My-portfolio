import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';

/** Tracks which page section is in view (scroll-spy) and scrolls to sections on demand. */
@Injectable({
  providedIn: 'root',
})
export class SectionNavService implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Id of the section currently in view; empty while the hero is showing. */
  readonly activeSection = signal('');

  private observer: IntersectionObserver | null = null;

  observe(sectionIds: readonly string[]): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.activeSection.set(id === 'hero' ? '' : id);
          }
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0.05 },
    );

    for (const id of sectionIds) {
      const el = this.document.getElementById(id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }

  scrollTo(sectionId: string): void {
    if (sectionId !== 'hero') {
      this.activeSection.set(sectionId);
    }
    if (!this.isBrowser) {
      return;
    }

    const target = this.document.getElementById(sectionId);
    if (!target) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
