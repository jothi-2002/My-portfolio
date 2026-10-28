import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { SkillGroup } from '../data/portfolio.models';
import { LAYER_STYLES } from '../shared/layer';
import { LayerBadge } from '../shared/ui/layer-badge';
import { Reveal } from '../shared/ui/reveal';
import { SectionHeader } from '../shared/ui/section-header';
import { filterSkillGroups } from '../utils/portfolio.utils';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, LayerBadge, Reveal, Icon],
  template: `
    <div class="page-container space-y-10">
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <app-section-header
          index="02"
          eyebrow="Technical Capabilities"
          title="Skills & Technologies"
          headingId="skills-heading"
          intro="From the query to the screen: the tools I reach for on each layer of an application."
        />

        <div
          appReveal="120"
          role="group"
          aria-label="Filter skills by category"
          class="flex flex-wrap items-center gap-1 rounded-md border border-line bg-surface p-1.5 shadow-card lg:max-w-md"
        >
          <button
            type="button"
            (click)="selectCategory('all')"
            [attr.aria-pressed]="selectedCategory() === 'all'"
            [class]="pillClass(selectedCategory() === 'all')"
          >
            <app-icon name="apps" [size]="14" />
            <span>All ({{ skillGroups().length }})</span>
          </button>

          @for (group of skillGroups(); track group.id) {
            <button
              type="button"
              (click)="selectCategory(group.id)"
              [attr.aria-pressed]="selectedCategory() === group.id"
              [class]="pillClass(selectedCategory() === group.id)"
            >
              <app-icon [name]="group.icon" [size]="14" />
              <span>{{ group.category }}</span>
            </button>
          }
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        @for (group of filteredGroups(); track group.id; let i = $index) {
          <article [appReveal]="i * 80" class="card card-interactive flex flex-col gap-5 p-6">
            <div class="flex items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-3">
                <app-layer-badge [icon]="group.icon" [layer]="group.layer" />
                <div class="min-w-0">
                  <h3 class="font-display text-xl font-normal text-ink">{{ group.category }}</h3>
                  <p class="text-xs font-medium {{ layerStyles[group.layer].text }}">{{ layerStyles[group.layer].label }}</p>
                </div>
              </div>
              <span class="font-mono text-xs tabular-nums text-mute" aria-hidden="true">
                {{ group.skills.length }}
              </span>
            </div>

            <ul class="flex flex-wrap gap-2" [attr.aria-label]="group.category + ' skills'">
              @for (skill of group.skills; track skill) {
                <li
                  class="rounded-lg border border-line bg-raised px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-150 hover:border-brand hover:text-brand"
                >
                  {{ skill }}
                </li>
              }
            </ul>
          </article>
        }
      </div>
    </div>
  `,
})
export class Skills {
  readonly skillGroups = input.required<readonly SkillGroup[]>();
  readonly selectedCategory = signal<string>('all');

  protected readonly layerStyles = LAYER_STYLES;

  readonly filteredGroups = computed(() =>
    filterSkillGroups(this.skillGroups(), this.selectedCategory()),
  );

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  protected pillClass(active: boolean): string {
    const base =
      'inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-150';
    return active
      ? `${base} bg-brand-strong text-on-brand shadow-card`
      : `${base} text-soft hover:text-ink`;
  }
}
