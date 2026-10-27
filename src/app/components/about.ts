import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AboutData } from '../data/portfolio.data';
import { interpolateCountUp } from '../utils/portfolio.utils';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div #aboutContainer class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <!-- Section Heading & Narrative -->
        <div class="lg:col-span-6 space-y-4">
          <div class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
            01. Overview
          </div>
          <h2
            id="about-heading"
            class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance"
          >
            {{ about().heading }}
          </h2>
          <div class="space-y-4 pt-1 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            @for (paragraph of about().paragraphs; track paragraph) {
              <p>{{ paragraph }}</p>
            }
          </div>
        </div>

        <!-- Animated Count-Up Stat Cards -->
        <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          @for (stat of about().stats; track stat.id) {
            <article
              class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 transition-colors duration-200 hover:border-blue-500/40"
              [attr.aria-label]="stat.displayText"
            >
              <div
                class="font-mono tabular-nums text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
              >
                {{ animatedValues()[stat.id] ?? stat.numericValue }}{{ stat.suffix }}
              </div>
              <p class="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                {{ stat.label }}
              </p>
            </article>
          }
        </div>
      </div>
    </div>
  `,
})
export class About implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly about = input.required<AboutData>();
  readonly aboutContainer = viewChild<ElementRef<HTMLElement>>('aboutContainer');

  readonly animatedValues = signal<Record<string, number>>({});

  private observer: IntersectionObserver | null = null;
  private rafId: number | null = null;
  private hasAnimated = false;

  ngAfterViewInit(): void {
    const stats = this.about().stats;
    const finalMap: Record<string, number> = {};
    for (const s of stats) {
      finalMap[s.id] = s.numericValue;
    }

    if (!this.isBrowser) {
      this.animatedValues.set(finalMap);
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      this.animatedValues.set(finalMap);
      return;
    }

    // Initialize to final values first for zero-latency accessibility, then animate smoothly on intersection
    this.animatedValues.set(finalMap);

    const el = this.aboutContainer()?.nativeElement;
    if (!el) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.runCountUpAnimation();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    this.observer.observe(el);
  }

  private runCountUpAnimation(): void {
    const stats = this.about().stats;
    const durationMs = 900;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const current: Record<string, number> = {};

      for (const stat of stats) {
        current[stat.id] = interpolateCountUp(stat.numericValue, progress);
      }
      this.animatedValues.set(current);

      if (progress < 1) {
        this.rafId = requestAnimationFrame(step);
      }
    };

    this.rafId = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.rafId !== null && this.isBrowser) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
