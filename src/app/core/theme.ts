import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { prefersReducedMotion } from '../utils/motion';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'jothi-portfolio-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Dark is the default; a saved visitor preference wins. */
  readonly theme = signal<ThemeMode>('dark');
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    if (this.isBrowser) {
      const initial = this.resolveInitialTheme();
      this.theme.set(initial);
      this.applyToDom(initial);
    }
  }

  toggleTheme(): void {
    const next: ThemeMode = this.isDark() ? 'light' : 'dark';
    const doc = this.document as Document & {
      startViewTransition?: (callback: () => void) => unknown;
    };

    if (this.isBrowser && !prefersReducedMotion() && doc.startViewTransition) {
      doc.startViewTransition(() => this.setTheme(next));
    } else {
      this.setTheme(next);
    }
  }

  private setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    this.applyToDom(mode);
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore storage quota / privacy errors
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
    return 'dark';
  }

  private applyToDom(mode: ThemeMode): void {
    this.document.documentElement.classList.toggle('dark', mode === 'dark');
  }
}
