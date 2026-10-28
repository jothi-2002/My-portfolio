import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { SectionNavService } from '../core/section-nav';
import { ThemeService } from '../core/theme';
import { NavItem } from '../data/portfolio.models';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', '(document:keydown.escape)': 'closeMenu()' },
  imports: [Icon],
  template: `
    <header class="sticky top-0 z-50 pt-3 sm:pt-4">
      <div class="page-container">
        <div class="relative rounded-xl border border-line bg-surface shadow-card">
          <div class="flex h-14 items-center justify-between gap-4 pl-3 pr-2.5 sm:pl-4">
            <!-- Brand -->
            <a
              href="#hero"
              (click)="navigate($event, 'hero')"
              class="group flex shrink-0 items-center gap-3 whitespace-nowrap"
            >
              <span
                aria-hidden="true"
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-strong font-sans text-xs font-bold text-on-brand transition-transform duration-300 group-hover:-rotate-6"
              >
                JM
              </span>
              <span class="sr-only font-display text-xl font-normal tracking-[-0.005em] text-ink min-[360px]:not-sr-only">{{ brandName() }}</span>
            </a>

            <!-- Desktop navigation -->
            <nav aria-label="Primary Navigation" class="hidden items-center gap-0.5 text-sm font-medium lg:flex">
              @for (item of navItems(); track item.id) {
                <a
                  [href]="'#' + item.id"
                  (click)="navigate($event, item.id)"
                  [attr.aria-current]="isActive(item.id) ? 'location' : null"
                  class="whitespace-nowrap rounded-lg px-3 py-1.5 transition-colors duration-200"
                  [class]="isActive(item.id) ? 'bg-raised text-ink' : 'text-soft hover:text-ink'"
                >
                  {{ item.label }}
                </a>
              }
            </nav>

            <div class="flex shrink-0 items-center gap-2">
              <a
                [href]="resumeUrl()"
                download="Jothi_MuthuKamaraj_Resume.pdf"
                class="hidden items-center gap-1.5 rounded-lg bg-brand-strong px-3 py-2 text-xs font-semibold text-on-brand transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
              >
                <app-icon name="download" [size]="16" />
                <span>Resume</span>
              </a>

              <button
                type="button"
                (click)="themeService.toggleTheme()"
                [attr.aria-label]="themeService.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
                class="btn-small group !p-2"
              >
                <app-icon
                  [name]="themeService.isDark() ? 'light_mode' : 'dark_mode'"
                  [size]="18"
                  class="transition-transform duration-500 group-hover:rotate-45"
                />
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

          <!-- Reading progress (CSS scroll-timeline; hidden where unsupported) -->
          <span aria-hidden="true" class="pointer-events-none absolute inset-x-4 bottom-0 h-px overflow-hidden">
            <span class="scroll-progress block h-full w-full bg-brand"></span>
          </span>

          <!-- Mobile drawer (overlays the page so it never shifts layout) -->
          @if (mobileMenuOpen()) {
            <nav
              id="mobile-nav-menu"
              aria-label="Mobile Navigation"
              class="absolute inset-x-0 top-full mt-2 rounded-xl border border-line bg-surface p-2 shadow-lift lg:hidden"
            >
              <ul class="flex flex-col gap-0.5">
                @for (item of navItems(); track item.id) {
                  <li>
                    <a
                      [href]="'#' + item.id"
                      (click)="navigate($event, item.id)"
                      [attr.aria-current]="isActive(item.id) ? 'location' : null"
                      class="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium"
                      [class]="isActive(item.id) ? 'bg-raised text-ink' : 'text-soft hover:bg-raised'"
                    >
                      <span>{{ item.label }}</span>
                      <app-icon name="arrow_forward" [size]="16" class="opacity-60" />
                    </a>
                  </li>
                }
                <li class="mt-1 border-t border-line pt-2 sm:hidden">
                  <a
                    [href]="resumeUrl()"
                    download="Jothi_MuthuKamaraj_Resume.pdf"
                    class="flex items-center justify-between rounded-md bg-brand-strong px-3 py-2.5 text-sm font-semibold text-on-brand"
                  >
                    <span>Download Resume</span>
                    <app-icon name="download" [size]="18" />
                  </a>
                </li>
              </ul>
            </nav>
          }
        </div>
      </div>
    </header>
  `,
})
export class Navbar {
  protected readonly themeService = inject(ThemeService);
  private readonly sectionNav = inject(SectionNavService);

  readonly brandName = input.required<string>();
  readonly navItems = input.required<readonly NavItem[]>();
  readonly resumeUrl = input.required<string>();

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
