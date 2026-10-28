import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from './icon';

/**
 * Label + projected control + validation message.
 * The projected control should set `[id]="controlId"` and `aria-describedby="<controlId>-error"`.
 */
@Component({
  selector: 'app-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  imports: [Icon],
  template: `
    <div class="space-y-1.5">
      <label [for]="controlId()" class="block text-xs font-semibold text-ink">{{ label() }}</label>
      <ng-content />
      @if (error()) {
        <p [id]="controlId() + '-error'" role="alert" class="flex items-center gap-1 text-xs font-medium text-danger">
          <app-icon name="error_outline" [size]="14" />
          <span>{{ error() }}</span>
        </p>
      }
    </div>
  `,
})
export class FormField {
  readonly controlId = input.required<string>();
  readonly label = input.required<string>();
  readonly error = input<string | undefined>();
}
