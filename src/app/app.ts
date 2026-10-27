import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { About } from './components/about';
import { Contact } from './components/contact';
import { Education } from './components/education';
import { Experience } from './components/experience';
import { Footer } from './components/footer';
import { Hero } from './components/hero';
import { Navbar } from './components/navbar';
import { Projects } from './components/projects';
import { Skills } from './components/skills';
import { PORTFOLIO_DATA } from './data/portfolio.data';
import { ThemeService } from './services/theme';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [Navbar, Hero, About, Skills, Experience, Projects, Education, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Initialize ThemeService eagerly at root
  readonly themeService = inject(ThemeService);

  readonly data = signal(PORTFOLIO_DATA);
  readonly activeSection = signal<string>('about');
  readonly mobileMenuOpen = signal<boolean>(false);
  readonly eagerLoadAll = signal<boolean>(false);

  private sectionObserver: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sectionIds = ['hero', ...this.data().navItems.map((item) => item.id)];
    const elements = sectionIds
      .map((id) => this.document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id && id !== 'hero') {
              this.activeSection.set(id);
            }
          }
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0.05,
      }
    );

    for (const el of elements) {
      this.sectionObserver.observe(el);
    }
  }

  scrollToSection(sectionId: string): void {
    this.eagerLoadAll.set(true);
    if (sectionId !== 'hero') {
      this.activeSection.set(sectionId);
    }

    if (!this.isBrowser) {
      return;
    }

    setTimeout(() => {
      const target = this.document.getElementById(sectionId);
      if (!target) {
        return;
      }

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 30);
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }
}
