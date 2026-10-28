import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SkillGroup } from '../data/portfolio.data';
import { filterSkillGroups } from '../utils/portfolio.utils';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Header & Interactive Category Filter -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-2">
          <div class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
            02. Technical Capabilities
          </div>
          <h2
            id="skills-heading"
            class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance"
          >
            Skills &amp; Technologies
          </h2>
        </div>

        <!-- Functional Category Filter Controls -->
        <div
          role="group"
          aria-label="Filter skills by category"
          class="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-900 p-1.5 border border-slate-200 dark:border-slate-800"
        >
          <button
            type="button"
            (click)="selectCategory('all')"
            [attr.aria-pressed]="selectedCategory() === 'all'"
            [class]="
              selectedCategory() === 'all'
                ? 'inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer'
                : 'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer'
            "
          >
            <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">apps</mat-icon>
            <span>All ({{ skillGroups().length }})</span>
          </button>

          @for (group of skillGroups(); track group.id) {
            <button
              type="button"
              (click)="selectCategory(group.id)"
              [attr.aria-pressed]="selectedCategory() === group.id"
              [class]="
                selectedCategory() === group.id
                  ? 'inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer'
                  : 'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer'
              "
            >
              <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">{{ group.icon }}</mat-icon>
              <span>{{ group.category }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Grouped Cards with Chips -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        @for (group of filteredGroups(); track group.id) {
          <article
            class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 flex flex-col justify-between gap-5 transition-colors duration-200 hover:border-blue-500/40"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  >
                    <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">{{ group.icon }}</mat-icon>
                  </div>
                  <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {{ group.category }}
                  </h3>
                </div>
                <span class="font-mono tabular-nums text-xs text-slate-400 dark:text-slate-500">
                  {{ group.skills.length }}
                </span>
              </div>

              <!-- Skill Chips -->
              <ul class="flex flex-wrap gap-2" [attr.aria-label]="group.category + ' skills'">
                @for (skill of group.skills; track skill) {
                  <li
                    class="rounded-lg bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors duration-150 hover:bg-blue-500/15 hover:text-blue-600 dark:hover:text-blue-300"
                  >
                    {{ skill }}
                  </li>
                }
              </ul>
            </div>
          </article>
        }
      </div>
    </div>
  `,
})
export class Skills {
  readonly skillGroups = input.required<readonly SkillGroup[]>();
  readonly selectedCategory = signal<string>('all');

  readonly filteredGroups = computed(() =>
    filterSkillGroups(this.skillGroups(), this.selectedCategory())
  );

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }
}
