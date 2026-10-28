import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';
import { prefersReducedMotion } from '../../utils/motion';

/**
 * Fades and lifts an element in the first time it scrolls into view.
 *
 * Progressive enhancement: nothing is hidden on the server or before hydration, and elements
 * already on screen are left alone, so there is no flash of hidden content. Usage:
 * `<div appReveal>` or `<div [appReveal]="120">` for a stagger delay in milliseconds.
 */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  readonly delay = input(0, { alias: 'appReveal', transform: numberAttribute });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const reduceMotion = prefersReducedMotion();
      const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight * 0.9;
      if (reduceMotion || alreadyVisible || typeof IntersectionObserver === 'undefined') {
        return;
      }

      const delay = this.delay();
      let cleanupTimer: ReturnType<typeof setTimeout> | undefined;

      el.style.setProperty('--reveal-delay', `${delay}ms`);
      el.dataset['reveal'] = 'hidden';

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) {
            return;
          }
          observer.disconnect();
          el.dataset['reveal'] = 'shown';
          // Drop the attribute afterwards so the reveal transition never overrides hover styles.
          cleanupTimer = setTimeout(() => {
            delete el.dataset['reveal'];
            el.style.removeProperty('--reveal-delay');
          }, delay + 800);
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      observer.observe(el);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        clearTimeout(cleanupTimer);
      });
    });
  }
}
