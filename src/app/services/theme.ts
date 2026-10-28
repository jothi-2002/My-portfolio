import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'jothi-portfolio-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Dark theme is the default as requested.
   * Respects saved user preference in localStorage or explicit prefers-color-scheme when toggled.
   */
  readonly theme = signal<ThemeMode>('dark');
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    if (this.isBrowser) {
      const initial = this.resolveInitialTheme();
      this.theme.set(initial);
      this.applyThemeToDom(initial);
    }

    effect(() => {
      const currentTheme = this.theme();
      if (this.isBrowser) {
        this.applyThemeToDom(currentTheme);
        try {
          localStorage.setItem(STORAGE_KEY, currentTheme);
        } catch {
          // Ignore storage quota / privacy errors
        }
      }
    });
  }

  toggleTheme(): void {
    const next: ThemeMode = this.theme() === 'dark' ? 'light' : 'dark';
    if (!this.isBrowser) {
      this.theme.set(next);
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const docWithTransition = this.document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (!prefersReducedMotion && typeof docWithTransition.startViewTransition === 'function') {
      docWithTransition.startViewTransition(() => {
        this.theme.set(next);
        this.applyThemeToDom(next);
      });
    } else {
      this.theme.set(next);
    }
  }

  private resolveInitialTheme(): ThemeMode {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Ignore storage access errors
    }

    // Dark theme by default as specified in design requirements
    return 'dark';
  }

  private applyThemeToDom(mode: ThemeMode): void {
    const root = this.document.documentElement;
    const body = this.document.body;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
      body?.classList.remove('bg-slate-50', 'text-slate-900');
      body?.classList.add('bg-slate-950', 'text-slate-100');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
      body?.classList.remove('bg-slate-950', 'text-slate-100');
      body?.classList.add('bg-slate-50', 'text-slate-900');
    }
  }
}
