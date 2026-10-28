import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Feeds the pointer position to `.card::before` (as --mx / --my) so cards glow where the cursor is.
 * Pure enhancement: only mouse-like pointers update it, and it is invisible until hover.
 */
@Directive({
  selector: '[appSpotlight]',
  host: { '(pointermove)': 'onMove($event)' },
})
export class Spotlight {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') {
      return;
    }
    const rect = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
