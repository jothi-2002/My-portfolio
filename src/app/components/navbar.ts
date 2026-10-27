import { ChangeDetectionStrategy, Component, inject, input, model, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavItem } from '../data/portfolio.data';
import { ThemeService } from '../services/theme';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <header
      class="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-colors duration-200"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        <!-- Zone 1: Single-line Brand Wordmark -->
        <a
          href="#hero"
          (click)="onNavigate($event, 'hero')"
          class="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-sm"
        >
          {{ brandName() }}
        </a>

        <!-- Zone 2: Desktop Navigation Links (Clean Typography, Single-Line) -->
        <nav
          aria-label="Primary Navigation"
          class="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          @for (item of navItems(); track item.id) {
            <a
              [href]="'#' + item.id"
              (click)="onNavigate($event, item.id)"
              [attr.aria-current]="activeSection() === item.id ? 'location' : null"
              [class]="
                activeSection() === item.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 py-1 whitespace-nowrap shrink-0 transition-colors duration-150'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border-b-2 border-transparent py-1 whitespace-nowrap shrink-0 transition-colors duration-150'
              "
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Zone 3: Theme Toggle & Mobile Menu Trigger -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            (click)="themeService.toggleTheme()"
            [attr.aria-label]="
              themeService.isDark() ? 'Switch to light theme' : 'Switch to dark theme'
            "
            class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <mat-icon class="!text-base !w-4 !h-4 leading-none">
              {{ themeService.isDark() ? 'light_mode' : 'dark_mode' }}
            </mat-icon>
            <span class="hidden sm:inline">
              {{ themeService.isDark() ? 'Light' : 'Dark' }}
            </span>
          </button>

          <button
            type="button"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-controls="mobile-nav-menu"
            [attr.aria-label]="mobileMenuOpen() ? 'Close navigation menu' : 'Open navigation menu'"
            class="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 p-2 text-slate-700 dark:text-slate-200 hover:border-blue-500/50 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <mat-icon class="!text-xl !w-5 !h-5 leading-none">
              {{ mobileMenuOpen() ? 'close' : 'menu' }}
            </mat-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile Navigation"
          class="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 shadow-lg"
        >
          <ul class="flex flex-col space-y-1">
            @for (item of navItems(); track item.id) {
              <li>
                <a
                  [href]="'#' + item.id"
                  (click)="onNavigate($event, item.id)"
                  [attr.aria-current]="activeSection() === item.id ? 'location' : null"
                  [class]="
                    activeSection() === item.id
                      ? 'flex items-center justify-between rounded-lg bg-blue-500/10 px-3 py-2.5 text-sm font-semibold text-blue-600 dark:text-blue-400'
                      : 'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  "
                >
                  <span>{{ item.label }}</span>
                  <mat-icon class="!text-base !w-4 !h-4 opacity-70">arrow_forward</mat-icon>
                </a>
              </li>
            }
          </ul>
        </nav>
      }
    </header>
  `,
})
export class Navbar {
  readonly themeService = inject(ThemeService);

  readonly brandName = input.required<string>();
  readonly navItems = input.required<readonly NavItem[]>();
  readonly activeSection = input.required<string>();
  readonly mobileMenuOpen = model<boolean>(false);

  readonly sectionSelected = output<string>();

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  onNavigate(event: Event, sectionId: string): void {
    event.preventDefault();
    this.mobileMenuOpen.set(false);
    this.sectionSelected.emit(sectionId);
  }
}
