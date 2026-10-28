import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProjectItem } from '../data/portfolio.models';
import { ArchitectureDiagram } from '../shared/ui/architecture-diagram';
import { Reveal } from '../shared/ui/reveal';
import { SectionHeader } from '../shared/ui/section-header';
import { TechChips } from '../shared/ui/tech-chips';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, TechChips, ArchitectureDiagram, Reveal, Icon],
  template: `
    <div class="page-container space-y-12">
      <app-section-header
        index="05"
        eyebrow="Key Deliverables"
        title="Projects"
        headingId="projects-heading"
      />

      <div class="space-y-8">
        @for (project of projects(); track project.id) {
          @if (!project.isPlaceholder) {
            <article appReveal class="card overflow-hidden !shadow-lift">
              <div class="grid grid-cols-1 lg:grid-cols-12">
                <!-- Case study narrative -->
                <div class="space-y-8 p-6 sm:p-10 lg:col-span-7">
                  <header class="space-y-3">
                    <div class="flex flex-wrap items-center gap-3">
                      <span class="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">Case study</span>
                      <span class="inline-flex items-center gap-1.5 text-xs font-medium text-soft">
                        <app-icon name="verified" [size]="16" class="text-brand" />
                        {{ project.subtitle }}
                      </span>
                    </div>
                    <h3 class="font-display text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">{{ project.title }}</h3>
                    <p class="text-base leading-relaxed text-soft sm:text-lg">{{ project.summary }}</p>
                  </header>

                  @if (project.caseStudy; as study) {
                    <dl class="space-y-6">
                      <div class="space-y-1.5">
                        <dt class="eyebrow">The challenge</dt>
                        <dd class="leading-relaxed text-soft">{{ study.challenge }}</dd>
                      </div>
                      <div class="space-y-1.5">
                        <dt class="eyebrow">My role</dt>
                        <dd class="space-y-3">
                          <p class="leading-relaxed text-soft">{{ study.role }}</p>
                          <app-tech-chips [items]="study.ownership" label="Areas of ownership" />
                        </dd>
                      </div>
                      <div class="space-y-2.5">
                        <dt class="eyebrow">What I delivered</dt>
                        <dd>
                          <ul class="space-y-2.5">
                            @for (item of study.delivered; track item) {
                              <li class="flex items-start gap-3 text-ink">
                                <app-icon name="check_circle" [size]="20" class="mt-0.5 text-api" />
                                <span>{{ item }}</span>
                              </li>
                            }
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  } @else if (project.bullets.length > 0) {
                    <ul class="space-y-2.5">
                      @for (bullet of project.bullets; track bullet) {
                        <li class="flex items-start gap-3 text-soft">
                          <span aria-hidden="true" class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span>
                          <span>{{ bullet }}</span>
                        </li>
                      }
                    </ul>
                  }

                  <footer class="space-y-4 border-t border-line pt-6">
                    <app-tech-chips [items]="project.technologies" [label]="project.title + ' technologies'" />
                    <p class="flex items-center gap-2 text-xs italic text-mute">
                      <app-icon name="lock_outline" [size]="16" class="shrink-0" />
                      <span>{{ project.note }}</span>
                    </p>
                  </footer>
                </div>

                <!-- Architecture -->
                @if (project.caseStudy; as study) {
                  <aside class="border-t border-line bg-raised/50 p-6 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
                    <h4 class="eyebrow mb-6">How it fits together</h4>
                    <app-architecture-diagram
                      [nodes]="study.architecture"
                      [integration]="study.integration"
                      [caption]="project.title + ' architecture'"
                    />
                  </aside>
                }
              </div>
            </article>
          } @else {
            <!-- TODO: Replace placeholder card with upcoming project case studies when ready -->
            <article
              appReveal
              class="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line bg-raised/40 p-6 sm:flex-row sm:items-center sm:p-8"
            >
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <app-icon name="upcoming" />
              </span>
              <div class="space-y-1">
                <h3 class="font-display text-lg font-semibold text-ink">{{ project.title }}</h3>
                <p class="max-w-lg text-sm leading-relaxed text-soft">{{ project.summary }}</p>
              </div>
            </article>
          }
        }
      </div>
    </div>
  `,
})
export class Projects {
  readonly projects = input.required<readonly ProjectItem[]>();
}
