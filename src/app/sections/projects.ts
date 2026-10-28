import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectItem } from '../data/portfolio.models';
import { ArchitectureDiagram } from '../shared/ui/architecture-diagram';
import { Reveal } from '../shared/ui/reveal';
import { SectionHeader } from '../shared/ui/section-header';
import { TechChips } from '../shared/ui/tech-chips';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SectionHeader, TechChips, ArchitectureDiagram, Reveal],
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
            <article appReveal class="card overflow-hidden">
              <div class="grid grid-cols-1 lg:grid-cols-12">
                <!-- Case study narrative -->
                <div class="space-y-8 p-6 sm:p-10 lg:col-span-7">
                  <header class="space-y-3">
                    <div class="flex flex-wrap items-center gap-3">
                      <span class="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">Case study</span>
                      <span class="text-xs font-medium text-mute">{{ project.subtitle }}</span>
                    </div>
                    <h3 class="font-display text-3xl font-bold tracking-tight text-ink">{{ project.title }}</h3>
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
                        <dd class="leading-relaxed text-soft">{{ study.role }}</dd>
                      </div>
                      <div class="space-y-2.5">
                        <dt class="eyebrow">What I built</dt>
                        <dd>
                          <ul class="space-y-2.5">
                            @for (step of study.approach; track step) {
                              <li class="flex items-start gap-3 text-soft">
                                <mat-icon class="!h-5 !w-5 shrink-0 !text-xl leading-none text-brand">arrow_right_alt</mat-icon>
                                <span>{{ step }}</span>
                              </li>
                            }
                          </ul>
                        </dd>
                      </div>
                      <div class="space-y-2.5">
                        <dt class="eyebrow">Outcomes</dt>
                        <dd>
                          <ul class="space-y-2.5">
                            @for (outcome of study.outcomes; track outcome) {
                              <li class="flex items-start gap-3 text-ink">
                                <mat-icon class="!h-5 !w-5 shrink-0 !text-xl leading-none text-api">check_circle</mat-icon>
                                <span>{{ outcome }}</span>
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
                      <mat-icon class="!h-4 !w-4 shrink-0 !text-sm leading-none">lock_outline</mat-icon>
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
                <mat-icon class="!h-6 !w-6 !text-2xl leading-none">upcoming</mat-icon>
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
