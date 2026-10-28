import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { SectionNavService } from '../core/section-nav';
import { ThemeService } from '../core/theme';
import { NavItem } from '../data/portfolio.models';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMenu()' },
  imports: [Icon],
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-line/80 bg-canvas/80 backdrop-blur-xl">
      <div class="page-container flex h-16 items-center justify-between gap-6">
        <!-- Brand -->
        <a
          href="#hero"
          (click)="navigate($event, 'hero')"
          class="group flex shrink-0 items-center gap-3 whitespace-nowrap"
        >
          <span
            aria-hidden="true"
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-strong font-display text-sm font-bold text-on-brand shadow-lift transition-transform duration-200 group-hover:-rotate-6"
          >
            JM
          </span>
          <span class="font-display text-base font-bold tracking-tight text-ink">{{ brandName() }}</span>
        </a>

        <!-- Desktop navigation -->
        <nav aria-label="Primary Navigation" class="hidden items-center gap-1 text-sm font-medium lg:flex">
          @for (item of navItems(); track item.id) {
            <a
              [href]="'#' + item.id"
              (click)="navigate($event, item.id)"
              [attr.aria-current]="isActive(item.id) ? 'location' : null"
              class="relative whitespace-nowrap rounded-lg px-3 py-2 transition-colors duration-150"
              [class]="isActive(item.id) ? 'text-ink' : 'text-soft hover:text-ink'"
            >
              {{ item.label }}
              <span
                aria-hidden="true"
                class="absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-full bg-brand transition-transform duration-300"
                [class]="isActive(item.id) ? 'scale-x-100' : 'scale-x-0'"
              ></span>
            </a>
          }
        </nav>

        <div class="flex shrink-0 items-center gap-2">
          <button
            type="button"
            (click)="themeService.toggleTheme()"
            [attr.aria-label]="themeService.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
            class="btn-small !px-3 !py-2"
          >
            <app-icon [name]="themeService.isDark() ? 'light_mode' : 'dark_mode'" [size]="16" />
            <span class="hidden sm:inline">{{ themeService.isDark() ? 'Light' : 'Dark' }}</span>
          </button>

          <button
            type="button"
            (click)="mobileMenuOpen.set(!mobileMenuOpen())"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-controls="mobile-nav-menu"
            [attr.aria-label]="mobileMenuOpen() ? 'Close navigation menu' : 'Open navigation menu'"
            class="btn-small !p-2 lg:hidden"
          >
            <app-icon [name]="mobileMenuOpen() ? 'close' : 'menu'" [size]="20" />
          </button>
        </div>
      </div>

      <!-- Mobile drawer -->
      @if (mobileMenuOpen()) {
        <nav id="mobile-nav-menu" aria-label="Mobile Navigation" class="absolute inset-x-0 top-full border-b border-t border-line bg-canvas px-4 py-3 shadow-card lg:hidden">
          <ul class="flex flex-col gap-1">
            @for (item of navItems(); track item.id) {
              <li>
                <a
                  [href]="'#' + item.id"
                  (click)="navigate($event, item.id)"
                  [attr.aria-current]="isActive(item.id) ? 'location' : null"
                  class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium"
                  [class]="isActive(item.id) ? 'bg-brand/10 text-brand' : 'text-soft hover:bg-raised'"
                >
                  <span>{{ item.label }}</span>
                  <app-icon name="arrow_forward" [size]="16" class="opacity-60" />
                </a>
              </li>
            }
          </ul>
        </nav>
      }

      <!-- Reading progress (CSS scroll-timeline; hidden where unsupported) -->
      <span aria-hidden="true" class="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-brand to-api"></span>
    </header>
  `,
})
export class Navbar {
  protected readonly themeService = inject(ThemeService);
  private readonly sectionNav = inject(SectionNavService);

  readonly brandName = input.required<string>();
  readonly navItems = input.required<readonly NavItem[]>();

  protected readonly mobileMenuOpen = signal(false);

  protected closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected isActive(id: string): boolean {
    return this.sectionNav.activeSection() === id;
  }

  protected navigate(event: Event, sectionId: string): void {
    event.preventDefault();
    this.mobileMenuOpen.set(false);
    this.sectionNav.scrollTo(sectionId);
  }
}
