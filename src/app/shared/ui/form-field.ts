import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Label + projected control + validation message.
 * The projected control should set `[id]="controlId"` and `aria-describedby="<controlId>-error"`.
 */
@Component({
  selector: 'app-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  imports: [MatIconModule],
  template: `
    <div class="space-y-1.5">
      <label [for]="controlId()" class="block text-xs font-semibold text-ink">{{ label() }}</label>
      <ng-content />
      @if (error()) {
        <p [id]="controlId() + '-error'" role="alert" class="flex items-center gap-1 text-xs font-medium text-danger">
          <mat-icon class="!h-3.5 !w-3.5 !text-sm leading-none">error_outline</mat-icon>
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
