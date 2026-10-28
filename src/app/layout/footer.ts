import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SectionNavService } from '../core/section-nav';
import { NavItem, SocialLink } from '../data/portfolio.models';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <footer class="border-t border-line bg-surface py-12">
      <div class="page-container space-y-8">
        <div class="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div class="max-w-sm space-y-2">
            <p class="font-display text-lg font-bold text-ink">{{ name() }}</p>
            <p class="text-sm leading-relaxed text-soft">
              Full stack developer building dependable enterprise software with .NET, Angular and SQL.
            </p>
          </div>

          <nav aria-label="Footer Navigation" class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
            @for (item of navItems(); track item.id) {
              <a
                [href]="'#' + item.id"
                (click)="navigate($event, item.id)"
                class="whitespace-nowrap text-soft transition-colors hover:text-brand"
              >
                {{ item.label }}
              </a>
            }
          </nav>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-mute sm:flex-row">
          <p>{{ copyright() }} · Built with Angular, Tailwind CSS and server-side rendering.</p>

          <div class="flex items-center gap-4">
            @for (link of socialLinks(); track link.id) {
              <a
                [href]="link.href"
                [attr.target]="link.external ? '_blank' : null"
                [attr.rel]="link.external ? 'noopener noreferrer' : null"
                class="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                <app-icon [name]="link.icon" [size]="16" />
                <span>{{ link.label }}</span>
              </a>
            }
            <a
              href="#hero"
              (click)="navigate($event, 'hero')"
              class="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
            >
              <app-icon name="arrow_upward" [size]="14" />
              <span>Top</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  private readonly sectionNav = inject(SectionNavService);

  readonly name = input.required<string>();
  readonly copyright = input.required<string>();
  readonly navItems = input.required<readonly NavItem[]>();
  readonly socialLinks = input.required<readonly SocialLink[]>();

  protected navigate(event: Event, sectionId: string): void {
    event.preventDefault();
    this.sectionNav.scrollTo(sectionId);
  }
}
