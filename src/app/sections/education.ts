import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EducationItem } from '../data/portfolio.models';
import { Reveal } from '../shared/ui/reveal';
import { SectionHeader } from '../shared/ui/section-header';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SectionHeader, Reveal],
  template: `
    <div class="page-container space-y-10">
      <app-section-header index="06" eyebrow="Academic Foundation" title="Education" headingId="education-heading" />

      <div class="grid grid-cols-1 gap-6">
        @for (edu of education(); track edu.institution; let i = $index) {
          <article
            [appReveal]="i * 100"
            class="card card-interactive flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div class="flex items-start gap-4">
              <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand" aria-hidden="true">
                <mat-icon class="!h-6 !w-6 !text-2xl leading-none">school</mat-icon>
              </span>
              <div class="space-y-1.5">
                <h3 class="font-display text-lg font-bold text-ink sm:text-xl">{{ edu.degree }}, {{ edu.field }}</h3>
                <div class="flex flex-wrap items-center gap-2 text-sm text-soft">
                  <span class="font-medium text-ink">{{ edu.institution }}</span>
                  <span aria-hidden="true">·</span>
                  <span class="font-mono tabular-nums">{{ edu.period }}</span>
                </div>
              </div>
            </div>

            <div class="shrink-0 border-t border-line pt-4 sm:border-t-0 sm:pt-0 sm:text-right">
              <div class="text-xs font-medium text-mute">{{ edu.scoreLabel }}</div>
              <div class="mt-0.5 font-display text-2xl font-extrabold tabular-nums">
                <span class="text-gradient">{{ edu.scoreValue }}</span>
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
