import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { AboutData } from '../data/portfolio.models';
import { Reveal } from '../shared/ui/reveal';
import { SectionHeader } from '../shared/ui/section-header';
import { interpolateCountUp } from '../utils/portfolio.utils';
import { Icon } from '../shared/ui/icon';
import { prefersReducedMotion } from '../utils/motion';

const COUNT_UP_DURATION_MS = 1100;

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, Reveal, Icon],
  template: `
    <div class="page-container space-y-16">
      <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <!-- Narrative -->
        <div class="space-y-6 lg:col-span-7">
          <app-section-header index="01" eyebrow="Overview" [title]="about().heading" headingId="about-heading" />
          <div appReveal="100" class="space-y-4 text-base leading-relaxed text-soft sm:text-lg">
            @for (paragraph of about().paragraphs; track paragraph; let first = $first) {
              <p [class]="first ? 'text-ink' : ''">{{ paragraph }}</p>
            }
          </div>
        </div>

        <!-- Count-up stats -->
        <div #statsContainer class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          @for (stat of about().stats; track stat.id; let i = $index) {
            <article [appReveal]="i * 120" class="card card-interactive p-6" [attr.aria-label]="stat.displayText">
              <div class="font-display text-5xl font-extrabold tabular-nums tracking-tight">
                <span class="text-gradient">{{ displayValue(stat.id, stat.numericValue) }}{{ stat.suffix }}</span>
              </div>
              <p class="mt-2 text-sm font-medium text-soft">{{ stat.label }}</p>
            </article>
          }
        </div>
      </div>

      <!-- Career story -->
      <div class="space-y-8">
        <h3 appReveal class="font-display text-xl font-bold text-ink">{{ about().chaptersHeading }}</h3>

        <ol class="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          @for (chapter of about().chapters; track chapter.id; let i = $index) {
            <li [appReveal]="i * 110" class="card card-interactive relative flex flex-col gap-4 p-6">
              <div class="flex items-center justify-between">
                <span
                  class="flex h-10 w-10 items-center justify-center rounded-xl {{ chapter.isCurrent ? 'bg-brand-strong text-on-brand' : 'bg-brand/10 text-brand' }}"
                  aria-hidden="true"
                >
                  <app-icon [name]="chapter.icon" [size]="20" />
                </span>
                <span class="font-mono text-xs font-medium text-brand">{{ chapter.period }}</span>
              </div>
              <div class="space-y-2">
                <h4 class="font-display text-base font-bold text-ink">{{ chapter.title }}</h4>
                <p class="text-sm leading-relaxed text-soft">{{ chapter.body }}</p>
              </div>
            </li>
          }
        </ol>
      </div>
    </div>
  `,
})
export class About {
  readonly about = input.required<AboutData>();
  private readonly statsContainer = viewChild<ElementRef<HTMLElement>>('statsContainer');

  /** Values shown while the count-up is running; null means "show the final numbers". */
  private readonly animatedValues = signal<Record<string, number> | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.statsContainer()?.nativeElement;
      const reduceMotion = prefersReducedMotion();
      if (!el || reduceMotion || typeof IntersectionObserver === 'undefined') {
        return;
      }
      // Already on screen: show final numbers rather than flashing back to zero.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        return;
      }

      let rafId = 0;
      const stats = this.about().stats;
      this.animatedValues.set(Object.fromEntries(stats.map((s) => [s.id, 0])));

      const step = (now: number, start: number): void => {
        const progress = Math.min(1, (now - start) / COUNT_UP_DURATION_MS);
        this.animatedValues.set(
          Object.fromEntries(stats.map((s) => [s.id, interpolateCountUp(s.numericValue, progress)])),
        );
        if (progress < 1) {
          rafId = requestAnimationFrame((t) => step(t, start));
        } else {
          this.animatedValues.set(null);
        }
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            observer.disconnect();
            rafId = requestAnimationFrame((now) => step(now, now));
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(el);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(rafId);
      });
    });
  }

  protected displayValue(id: string, finalValue: number): number {
    return this.animatedValues()?.[id] ?? finalValue;
  }
}
