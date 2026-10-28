import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EducationItem } from '../data/portfolio.data';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="space-y-2">
        <div class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
          05. Academic Foundation
        </div>
        <h2
          id="education-heading"
          class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance"
        >
          Education
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-6">
        @for (edu of education(); track edu.institution) {
          <article
            class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors duration-200 hover:border-blue-500/40"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                <mat-icon class="!text-xl !w-5 !h-5 leading-none">school</mat-icon>
              </div>
              <div class="space-y-1.5">
                <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50">
                  {{ edu.degree }}, {{ edu.field }}
                </h3>
                <div class="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span class="font-medium text-slate-800 dark:text-slate-200">
                    {{ edu.institution }}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span class="font-mono tabular-nums">{{ edu.period }}</span>
                </div>
              </div>
            </div>

            <div class="sm:text-right pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400">
                {{ edu.scoreLabel }}
              </div>
              <div class="font-mono tabular-nums text-xl font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                {{ edu.scoreValue }}
              </div>
            </div>
          </article>
        }
      </div>
    </div>
  `,
})
export class Education {
  readonly education = input.required<readonly EducationItem[]>();
}
