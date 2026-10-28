import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SectionNavService } from '../core/section-nav';
import { HeroData } from '../data/portfolio.models';
import { LayerBadge } from '../shared/ui/layer-badge';
import { Reveal } from '../shared/ui/reveal';
import { TechChips } from '../shared/ui/tech-chips';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayerBadge, TechChips, Reveal, Icon],
  template: `
    <section id="hero" aria-labelledby="hero-heading" class="relative overflow-hidden pb-24 pt-12 sm:pb-32 sm:pt-16 lg:pt-20">
      <div class="page-container">
        <div class="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <!-- Identity -->
          <div class="space-y-7 lg:col-span-7">
            <div appReveal class="flex flex-wrap items-center gap-3 text-sm font-medium text-soft">
              <span class="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 shadow-card">
                <span class="relative flex h-2 w-2">
                  <span class="relative h-2 w-2 rounded-full bg-brand"></span>
                </span>
                <span class="text-ink">{{ hero().currentRole }}</span>
              </span>
              <span class="inline-flex items-center gap-1">
                <app-icon name="place" [size]="16" class="text-brand" />
                {{ hero().location }}
              </span>
            </div>

            <div appReveal="80" class="space-y-4">
              <p class="eyebrow">{{ hero().kicker }}</p>
              <h1
                id="hero-heading"
                class="font-display text-5xl font-normal leading-[0.95] tracking-[-0.015em] text-ink text-balance min-[360px]:text-[3.5rem] min-[400px]:text-[4.25rem] sm:text-8xl lg:text-[6.5rem] xl:text-[7.25rem]"
              >
                <span class="block">{{ nameParts().first }}</span>&ngsp;<span class="block">{{ nameParts().last }}</span>
              </h1>
              <p class="font-display text-3xl font-normal italic sm:text-4xl lg:text-5xl">
                <span class="text-brand">{{ hero().title }}</span>
              </p>
            </div>

            <p appReveal="160" class="max-w-xl text-lg leading-relaxed text-soft sm:text-xl">
              {{ hero().tagline }}
            </p>

            <div appReveal="240" class="flex flex-wrap items-center gap-3">
              <a [href]="hero().resumeUrl" download="Jothi_MuthuKamaraj_Resume.pdf" target="_blank" rel="noopener" class="btn-primary">
                <app-icon name="download" [size]="20" />
                <span>Download Resume</span>
              </a>
              <a [href]="'#' + hero().contactSectionId" (click)="goTo($event, hero().contactSectionId)" class="btn-secondary">
                <app-icon name="send" [size]="20" class="text-brand" />
                <span>Contact Me</span>
              </a>
            </div>

            <a
              appReveal="280"
              [href]="'#' + hero().featured.targetId"
              (click)="goTo($event, hero().featured.targetId)"
              class="card card-interactive group flex max-w-xl items-center justify-between gap-4 p-4"
            >
              <span class="flex min-w-0 items-center gap-3.5">
                <app-layer-badge icon="verified" layer="core" />
                <span class="min-w-0">
                  <span class="block text-xs font-medium text-mute">{{ hero().featured.label }}</span>
                  <span class="block font-display text-xl font-normal text-ink">{{ hero().featured.title }}</span>
                  <span class="block text-xs text-soft">{{ hero().featured.description }}</span>
                </span>
              </span>
              <span class="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand">
                <span class="hidden sm:inline">Read the case study</span>
                <app-icon name="arrow_forward" [size]="16" class="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </a>

            <div appReveal="320" class="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6">
              <span class="text-xs font-medium text-mute">Connect</span>
              @for (link of hero().socialLinks; track link.id) {
                <a
                  [href]="link.href"
                  [attr.target]="link.external ? '_blank' : null"
                  [attr.rel]="link.external ? 'noopener noreferrer' : null"
                  [attr.aria-label]="link.label"
                  class="btn-small"
                >
                  <app-icon [name]="link.icon" [size]="16" />
                  <span>{{ link.label }}</span>
                  @if (link.external) {
                    <app-icon name="open_in_new" [size]="14" class="opacity-60" />
                  }
                </a>
              }
            </div>
          </div>

          <!-- Full-stack layer card -->
          <div appReveal="200" class="lg:col-span-5">
            <div class="card relative space-y-6 p-6 sm:p-7">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="font-display text-xl font-normal text-ink">Core Engineering Stack</h2>
                  <p class="mt-0.5 text-xs text-mute">End-to-end delivery across database, API, and UI layers</p>
                </div>
                <app-icon name="layers" class="text-brand" />
              </div>

              <ol class="relative space-y-6">
                @for (card of hero().stackLayers; track card.id; let i = $index; let last = $last) {
                  <li class="relative flex items-start gap-4">
                    @if (!last) {
                      <span aria-hidden="true" class="absolute -bottom-6 left-5 top-10 w-px bg-line"></span>
                    }
                    <app-layer-badge [icon]="card.icon" [layer]="card.layer" />
                    <div class="min-w-0 space-y-2">
                      <h3 class="text-sm font-semibold text-ink">{{ card.title }}</h3>
                      <p class="text-xs leading-relaxed text-soft">{{ card.description }}</p>
                      <app-tech-chips [items]="card.technologies" [label]="card.title + ' technologies'" />
                    </div>
                  </li>
                }
              </ol>

              <div class="flex items-center justify-between border-t border-line pt-4 text-xs text-mute">
                <span>Currently: {{ hero().currentRole }}</span>
                <a href="#experience" (click)="goTo($event, 'experience')" class="inline-flex shrink-0 items-center gap-1 font-semibold text-brand hover:underline">
                  <span>View Timeline</span>
                  <app-icon name="arrow_downward" [size]="14" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  private readonly sectionNav = inject(SectionNavService);

  readonly hero = input.required<HeroData>();

  /** The name always breaks between first name and surname, so the font swap can't re-wrap the headline. */
  protected readonly nameParts = computed(() => {
    const [first = '', ...rest] = this.hero().name.split(' ');
    return { first, last: rest.join(' ') };
  });

  protected goTo(event: Event, sectionId: string): void {
    event.preventDefault();
    this.sectionNav.scrollTo(sectionId);
  }
}
