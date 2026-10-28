import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectItem } from '../data/portfolio.data';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="space-y-2">
        <div class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
          04. Key Deliverables
        </div>
        <h2
          id="projects-heading"
          class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance"
        >
          Projects
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        @for (project of projects(); track project.id) {
          @if (!project.isPlaceholder) {
            <article
              class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 flex flex-col justify-between gap-6 transition-colors duration-200 hover:border-blue-500/40"
            >
              <div class="space-y-4">
                <div class="space-y-1">
                  <div class="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {{ project.subtitle }}
                  </div>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-slate-50">
                    {{ project.title }}
                  </h3>
                </div>

                <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {{ project.summary }}
                </p>

                @if (project.bullets.length > 0) {
                  <ul class="space-y-2.5 pt-1">
                    @for (bullet of project.bullets; track bullet) {
                      <li class="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <span
                          aria-hidden="true"
                          class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                        ></span>
                        <span>{{ bullet }}</span>
                      </li>
                    }
                  </ul>
                }
              </div>

              <div class="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                @if (project.technologies.length > 0) {
                  <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    @for (tech of project.technologies; track tech; let last = $last) {
                      <span class="font-medium text-slate-700 dark:text-slate-300">{{ tech }}</span>
                      @if (!last) {
                        <span aria-hidden="true">·</span>
                      }
                    }
                  </div>
                }

                <p class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic">
                  <mat-icon class="!text-sm !w-4 !h-4 leading-none shrink-0">lock_outline</mat-icon>
                  <span>{{ project.note }}</span>
                </p>
              </div>
            </article>
          } @else {
            <!-- TODO: Replace placeholder card with upcoming project case studies when ready -->
            <article
              class="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/30 p-6 sm:p-8 flex flex-col items-start justify-center gap-4 text-left"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                <mat-icon class="!text-xl !w-5 !h-5 leading-none">upcoming</mat-icon>
              </div>
              <div class="space-y-1.5">
                <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {{ project.title }}
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                  {{ project.summary }}
                </p>
              </div>
            </article>
          }
        }
      </div>
    </div>
  `,
})
export class Projects {
  readonly projects = input.required<readonly ProjectItem[]>();
}
