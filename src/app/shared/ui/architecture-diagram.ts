import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArchitectureIntegration, ArchitectureNode } from '../../data/portfolio.models';
import { LAYER_STYLES } from '../layer';
import { LayerBadge } from './layer-badge';
import { TechChips } from './tech-chips';
import { Icon } from './icon';

/** Vertical UI -> API -> data flow with a side integration, drawn from plain data. */
@Component({
  selector: 'app-architecture-diagram',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  imports: [LayerBadge, TechChips, Icon],
  template: `
    <figure class="space-y-4" [attr.aria-label]="caption()">
      <ol class="space-y-5">
        @for (node of nodes(); track node.id; let i = $index; let last = $last) {
          <li class="relative flex items-start gap-4">
            @if (!last) {
              <span aria-hidden="true" class="absolute -bottom-5 left-5 top-10 w-px bg-line"></span>
            }
            <app-layer-badge [icon]="node.icon" [layer]="node.layer" />
            <div class="min-w-0 flex-1 space-y-2 rounded-md border bg-surface p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card {{ styles[node.layer].border }}">
              <div>
                <p class="text-sm font-semibold text-ink">{{ node.label }}</p>
                <p class="text-xs leading-relaxed text-soft">{{ node.detail }}</p>
              </div>
              <app-tech-chips [items]="node.technologies" [label]="node.label + ' technologies'" />
            </div>
          </li>
        }
      </ol>

      <div class="flex items-start gap-3 rounded-md border border-dashed border-line bg-raised/60 p-3.5">
        <app-icon [name]="integration().icon" [size]="20" class="shrink-0 text-mute" />
        <div>
          <p class="text-sm font-semibold text-ink">{{ integration().label }}</p>
          <p class="text-xs leading-relaxed text-soft">{{ integration().detail }}</p>
        </div>
      </div>
    </figure>
  `,
})
export class ArchitectureDiagram {
  readonly nodes = input.required<readonly ArchitectureNode[]>();
  readonly integration = input.required<ArchitectureIntegration>();
  readonly caption = input('Application architecture');

  protected readonly styles = LAYER_STYLES;
}
