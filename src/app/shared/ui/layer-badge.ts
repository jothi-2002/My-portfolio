import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StackLayer } from '../../data/portfolio.models';
import { IconName } from '../icons';
import { LAYER_STYLES } from '../layer';
import { Icon } from './icon';

/** Rounded icon tile tinted with the colour of a stack layer. */
@Component({
  selector: 'app-layer-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { class: 'inline-flex shrink-0' },
  template: `
    <span
      aria-hidden="true"
      class="flex items-center justify-center rounded-md ring-1 ring-inset ring-current/25 {{ sizeClass() }} {{ style().softBg }} {{ style().text }}"
    >
      <app-icon [name]="icon()" [size]="iconPx()" />
    </span>
  `,
})
export class LayerBadge {
  readonly icon = input.required<IconName>();
  readonly layer = input<StackLayer>('core');
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  protected readonly style = computed(() => LAYER_STYLES[this.layer()]);
  protected readonly sizeClass = computed(
    () => ({ sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' })[this.size()],
  );
  protected readonly iconPx = computed(() => ({ sm: 18, md: 20, lg: 24 })[this.size()]);
}
