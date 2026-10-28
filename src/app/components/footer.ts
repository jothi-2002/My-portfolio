import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavItem } from '../data/portfolio.data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer
      class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors duration-200"
    >
      <div
        class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <p class="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
          {{ copyright() }}
        </p>

        <nav aria-label="Footer Navigation" class="flex flex-wrap items-center gap-5 text-xs font-medium">
          @for (item of navItems(); track item.id) {
            <a
              [href]="'#' + item.id"
              (click)="onNavClick($event, item.id)"
              class="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              {{ item.label }}
            </a>
          }
          <a
            href="#hero"
            (click)="onNavClick($event, 'hero')"
            aria-label="Scroll back to top"
            class="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap shrink-0"
          >
            <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">arrow_upward</mat-icon>
            <span>Top</span>
          </a>
        </nav>
      </div>
    </footer>
  `,
})
export class Footer {
  readonly copyright = input.required<string>();
  readonly navItems = input.required<readonly NavItem[]>();
  readonly navigateToSection = output<string>();

  onNavClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.navigateToSection.emit(sectionId);
  }
}
