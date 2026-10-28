import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ExperienceItem, StackLayer } from '../data/portfolio.models';
import { LAYER_STYLES } from '../shared/layer';
import { Reveal } from '../shared/ui/reveal';
import { SectionHeader } from '../shared/ui/section-header';
import { TechChips } from '../shared/ui/tech-chips';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, TechChips, Reveal],
  template: `
    <div class="page-container space-y-12">
      <app-section-header
        index="03"
        eyebrow="Career Progression"
        title="Professional Experience"
        headingId="experience-heading"
        intro="Each highlight is tagged by the layer of the stack it touched."
      />

      <div class="relative pl-8 sm:pl-10">
        <div aria-hidden="true" class="absolute bottom-2 left-[0.7rem] top-2 w-px bg-line sm:left-[0.95rem]"></div>

        <div class="space-y-8">
          @for (item of experiences(); track item.id; let i = $index) {
            <article [appReveal]="i * 100" class="relative">
              <!-- Timeline node -->
              <span
                aria-hidden="true"
                class="absolute -left-8 top-7 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-canvas sm:-left-10 {{ item.isCurrent ? 'border-brand' : 'border-mute' }}"
              >
                @if (item.isCurrent) {
                  <span class="h-1.5 w-1.5 rounded-full bg-brand"></span>
                }
              </span>

              <div class="card card-interactive space-y-6 p-6 sm:p-8">
                <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div class="space-y-1.5">
                    <div class="flex flex-wrap items-center gap-3">
                      <h3 class="font-display text-xl font-normal text-ink sm:text-2xl">{{ item.role }}</h3>
                      @if (item.isCurrent) {
                        <span class="rounded-full bg-api/10 px-2.5 py-0.5 text-xs font-semibold text-api">Current</span>
                      }
                    </div>
                    <div class="flex flex-wrap items-center gap-2 text-sm font-medium text-soft">
                      <span class="font-semibold text-ink">{{ item.company }}</span>
                      <span aria-hidden="true">·</span>
                      <span>{{ item.location }}</span>
                      <span aria-hidden="true">·</span>
                      <span class="font-mono tabular-nums text-brand">{{ item.period }}</span>
                    </div>
                  </div>

                  <div class="text-xs text-mute sm:text-right">
                    <span class="font-semibold text-ink">Project: {{ item.project }}</span>
                    @if (item.projectSubtitle) {
                      <div>{{ item.projectSubtitle }}</div>
                    }
                  </div>
                </div>

                @if (item.highlights.length > 0) {
                  <ul class="space-y-3.5 border-t border-line pt-6">
                    @for (point of item.highlights; track point.text) {
                      <li class="flex items-start gap-3.5 text-sm leading-relaxed text-soft sm:text-base">
                        <span
                          class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full {{ layerStyles[point.layer].dot }}"
                          [attr.title]="layerStyles[point.layer].label"
                        ></span>
                        <span>
                          <span class="sr-only">{{ layerStyles[point.layer].label }}: </span>{{ point.text }}
                        </span>
                      </li>
                    }
                  </ul>

                  <ul class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-mute" aria-label="Legend">
                    @for (layer of legendFor(item); track layer) {
                      <li class="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" class="h-2 w-2 rounded-full {{ layerStyles[layer].dot }}"></span>
                        {{ layerStyles[layer].label }}
                      </li>
                    }
                  </ul>
                }

                <app-tech-chips [items]="item.technologies" [label]="item.role + ' technologies'" />
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

  protected readonly layerStyles = LAYER_STYLES;

  /** Layers actually used by an item's highlights, in first-seen order. */
  protected legendFor(item: ExperienceItem): readonly StackLayer[] {
    return [...new Set(item.highlights.map((h) => h.layer))];
  }
}
