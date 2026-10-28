import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ImpactItem } from '../data/portfolio.models';
import { LAYER_STYLES } from '../shared/layer';
import { LayerBadge } from '../shared/ui/layer-badge';
import { Reveal } from '../shared/ui/reveal';
import { SectionHeader } from '../shared/ui/section-header';
import { TechChips } from '../shared/ui/tech-chips';

@Component({
  selector: 'app-impact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SectionHeader, LayerBadge, TechChips, Reveal],
  template: `
    <div class="page-container space-y-12">
      <app-section-header
        index="04"
        eyebrow="Problem Solving"
        title="Problems I've solved"
        headingId="impact-heading"
        intro="Four real problems from production work: what was wrong, what I changed, and what got better."
      />

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        @for (item of items(); track item.id; let i = $index) {
          <article [appReveal]="(i % 2) * 120" class="card card-interactive flex flex-col gap-6 p-6 sm:p-8">
            <header class="flex items-start gap-4">
              <app-layer-badge [icon]="item.icon" [layer]="item.layer" size="lg" />
              <div class="space-y-1">
                <p class="text-xs font-semibold uppercase tracking-wider {{ layerStyles[item.layer].text }}">
                  {{ layerStyles[item.layer].label }}
                </p>
                <h3 class="font-display text-lg font-bold leading-snug text-ink sm:text-xl">{{ item.title }}</h3>
              </div>
            </header>

            <dl class="space-y-4 text-sm leading-relaxed">
              <div class="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt class="font-mono text-xs font-medium uppercase tracking-wider text-mute">Problem</dt>
                <dd class="text-soft">{{ item.problem }}</dd>
              </div>
              <div class="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt class="font-mono text-xs font-medium uppercase tracking-wider text-mute">Approach</dt>
                <dd class="text-soft">{{ item.approach }}</dd>
              </div>
              <div class="grid grid-cols-[5.5rem_1fr] gap-3 rounded-xl p-3 -mx-3 {{ layerStyles[item.layer].softBg }}">
                <dt class="font-mono text-xs font-medium uppercase tracking-wider {{ layerStyles[item.layer].text }}">Outcome</dt>
                <dd class="flex items-start gap-2 font-medium text-ink">
                  <mat-icon class="!h-5 !w-5 shrink-0 !text-xl leading-none {{ layerStyles[item.layer].text }}">check_circle</mat-icon>
                  <span>{{ item.outcome }}</span>
                </dd>
              </div>
            </dl>

            <app-tech-chips [items]="item.technologies" [label]="item.title + ' technologies'" />
          </article>
        }
      </div>
    </div>
  `,
})
export class Impact {
  readonly items = input.required<readonly ImpactItem[]>();

  protected readonly layerStyles = LAYER_STYLES;
}
