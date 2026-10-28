import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from './reveal';

/** Numbered eyebrow + heading (+ optional intro) used at the top of every section. */
@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  imports: [Reveal],
  template: `
    <div appReveal class="space-y-3">
      <p class="eyebrow">
        <span aria-hidden="true" class="text-mute">{{ index() }} /</span> {{ eyebrow() }}
      </p>
      <h2 [id]="headingId()" class="section-title">{{ title() }}</h2>
      @if (intro()) {
        <p class="max-w-2xl text-base leading-relaxed text-soft sm:text-lg">{{ intro() }}</p>
      }
    </div>
  `,
})
export class SectionHeader {
  readonly index = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly intro = input<string>();
}
