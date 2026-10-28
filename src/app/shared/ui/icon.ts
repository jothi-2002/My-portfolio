import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ICON_PATHS, IconName } from '../icons';

/**
 * Decorative inline SVG icon. Inherits the surrounding text colour; pass `size` in pixels.
 * Icons are `aria-hidden`: give the parent link or button an accessible name instead.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    class: 'inline-block shrink-0 align-middle',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
  },
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" class="block h-full w-full">
      <path [attr.d]="path()" />
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(24);

  protected readonly path = computed(() => ICON_PATHS[this.name()]);
}
