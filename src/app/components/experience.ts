import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ExperienceItem } from '../data/portfolio.data';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="space-y-2">
        <div class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
          03. Career Progression
        </div>
        <h2
          id="experience-heading"
          class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance"
        >
          Professional Experience
        </h2>
      </div>

      <!-- Vertical Timeline -->
      <div class="relative pl-6 sm:pl-8">
        <!-- Vertical connector hairline -->
        <div
          aria-hidden="true"
          class="absolute top-2 bottom-2 left-2 sm:left-3 w-px bg-slate-200 dark:bg-slate-800"
        ></div>

        <div class="space-y-8">
          @for (item of experiences(); track item.id) {
            <article class="relative">
              <!-- Timeline Node Marker -->
              <div
                aria-hidden="true"
                [class]="
                  item.isCurrent
                    ? 'absolute -left-[1.35rem] sm:-left-[1.6rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-slate-950'
                    : 'absolute -left-[1.35rem] sm:-left-[1.6rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-950'
                "
              ></div>

              <!-- Timeline Card -->
              <div
                class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-7 space-y-5 transition-colors duration-200 hover:border-blue-500/40"
              >
                <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div class="space-y-1">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50">
                      {{ item.role }}
                    </h3>
                    <!-- Unboxed metadata with typographic separators -->
                    <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                      <span class="text-slate-900 dark:text-slate-200 font-semibold">
                        {{ item.company }}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{{ item.location }}</span>
                      <span aria-hidden="true">·</span>
                      <span class="font-mono tabular-nums text-blue-600 dark:text-blue-400">
                        {{ item.period }}
                      </span>
                    </div>
                  </div>

                  <!-- Project Context -->
                  <div class="text-xs sm:text-right text-slate-500 dark:text-slate-400">
                    <span class="font-semibold text-slate-800 dark:text-slate-200">
                      Project: {{ item.project }}
                    </span>
                    @if (item.projectSubtitle) {
                      <div class="text-xs text-slate-500 dark:text-slate-400">
                        {{ item.projectSubtitle }}
                      </div>
                    }
                  </div>
                </div>

                @if (item.highlights.length > 0) {
                  <ul class="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    @for (point of item.highlights; track point) {
                      <li class="flex items-start gap-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span
                          aria-hidden="true"
                          class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                        ></span>
                        <span>{{ point }}</span>
                      </li>
                    }
                  </ul>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </div>
  `,
})
export class Experience {
  readonly experiences = input.required<readonly ExperienceItem[]>();
}
