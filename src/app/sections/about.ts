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
    <div class="page-container space-y-24">
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <!-- Narrative -->
        <div class="space-y-8 lg:col-span-7">
          <app-section-header index="01" eyebrow="Overview" [title]="about().heading" headingId="about-heading" />
          <div appReveal="100" class="space-y-5 text-base leading-relaxed text-soft sm:text-lg">
            @for (paragraph of about().paragraphs; track paragraph; let first = $first) {
              <p [class]="first ? 'font-display text-3xl font-normal leading-snug tracking-[-0.005em] text-ink sm:text-[2.15rem]' : ''">
                {{ paragraph }}
              </p>
            }
          </div>
        </div>

        <!-- Count-up stats -->
        <dl #statsContainer class="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          @for (stat of about().stats; track stat.id; let i = $index) {
            <div [appReveal]="i * 120" class="flex flex-col-reverse border-t border-line py-6 lg:py-8">
              <dt class="mt-2 text-sm font-medium text-soft">{{ stat.label }}</dt>
              <dd class="font-display text-7xl font-normal lining-nums tabular-nums tracking-[-0.01em] sm:text-8xl">
                <span class="text-brand">{{ displayValue(stat.id, stat.numericValue) }}{{ stat.suffix }}</span>
              </dd>
            </div>
          }
        </dl>
      </div>

      <!-- Career story: a hairline timeline -->
      <div class="space-y-10">
        <h3 appReveal class="font-display text-2xl font-normal tracking-[-0.005em] text-ink">{{ about().chaptersHeading }}</h3>

        <ol class="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          @for (chapter of about().chapters; track chapter.id; let i = $index) {
            <li [appReveal]="i * 110" class="group relative border-t border-line pt-7">
              <span
                aria-hidden="true"
                class="absolute -top-[6px] left-0 flex h-3 w-3 items-center justify-center rounded-full border-2 bg-canvas transition-colors duration-300 {{ chapter.isCurrent ? 'border-brand' : 'border-mute group-hover:border-brand' }}"
              >
                @if (chapter.isCurrent) {
                  <span class="h-1 w-1 rounded-full bg-brand"></span>
                }
              </span>
              <div class="mb-3 flex items-center justify-between gap-3">
                <span class="font-mono text-xs font-medium text-brand">{{ chapter.period }}</span>
                <app-icon
                  [name]="chapter.icon"
                  [size]="20"
                  class="transition-colors duration-300 {{ chapter.isCurrent ? 'text-brand' : 'text-mute group-hover:text-brand' }}"
                />
              </div>
              <h4 class="font-display text-2xl font-normal leading-snug tracking-[-0.005em] text-ink">{{ chapter.title }}</h4>
              <p class="mt-2 text-sm leading-relaxed text-soft">{{ chapter.body }}</p>
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
