import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    @if (items().length > 0) {
      <ul class="flex flex-wrap gap-1.5" [attr.aria-label]="label()">
        @for (item of items(); track item) {
          <li class="chip">{{ item }}</li>
        }
      </ul>
    }
  `,
})
export class TechChips {
  readonly items = input.required<readonly string[]>();
  readonly label = input('Technologies');
}
