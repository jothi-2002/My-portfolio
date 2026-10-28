import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeroData } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section
      id="hero"
      aria-labelledby="hero-heading"
      class="relative overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-slate-200/70 dark:border-slate-800/70"
    >
      <!-- Subtle deep-blue gradient glow in hero background -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-transparent blur-3xl dark:from-blue-600/20 dark:via-blue-500/12"
      ></div>

      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <!-- Left Column: Primary Identity & Actions -->
          <div class="lg:col-span-7 space-y-6">
            <!-- Location & Role Kicker (Unboxed clean metadata with separator) -->
            <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
              <span class="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                <mat-icon class="!text-base !w-4 !h-4 leading-none">place</mat-icon>
                {{ hero().location }}
              </span>
              <span aria-hidden="true">·</span>
              <span>.NET 9 &amp; Angular Full Stack</span>
            </div>

            <!-- Name & Title -->
            <div class="space-y-3">
              <h1
                id="hero-heading"
                class="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1] text-balance"
              >
                {{ hero().name }}
              </h1>
              <p class="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 tracking-tight">
                {{ hero().title }}
              </p>
            </div>

            <!-- Tagline -->
            <p class="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ hero().tagline }}
            </p>

            <!-- Primary CTA Buttons -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                [href]="hero().resumeUrl"
                download="Jothi_MuthuKamaraj_Resume.pdf"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">download</mat-icon>
                <span>Download Resume</span>
              </a>

              <a
                [href]="'#' + hero().contactSectionId"
                (click)="onContactClick($event)"
                class="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none text-blue-600 dark:text-blue-400">
                  send
                </mat-icon>
                <span>Contact Me</span>
              </a>
            </div>

            <!-- Social Icon Links -->
            <div class="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-4">
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
                Connect:
              </span>
              <div class="flex flex-wrap items-center gap-3">
                @for (link of hero().socialLinks; track link.id) {
                  @if (link.id === 'gitlab') {
                    <!-- TODO: Replace href="#" with Jothi's GitLab profile link when ready -->
                    <a
                      [href]="link.href"
                      (click)="onGitlabPlaceholderClick($event)"
                      [attr.aria-label]="link.label + ' (Profile link coming soon)'"
                      title="GitLab profile link coming soon"
                      class="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap shrink-0"
                    >
                      <mat-icon class="!text-base !w-4 !h-4 leading-none">{{ link.icon }}</mat-icon>
                      <span>{{ link.label }}</span>
                    </a>
                  } @else {
                    <a
                      [href]="link.href"
                      [target]="link.external ? '_blank' : null"
                      [rel]="link.external ? 'noopener noreferrer' : null"
                      [attr.aria-label]="link.label"
                      class="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap shrink-0"
                    >
                      <mat-icon class="!text-base !w-4 !h-4 leading-none">{{ link.icon }}</mat-icon>
                      <span>{{ link.label }}</span>
                      @if (link.external) {
                        <mat-icon class="!text-xs !w-3.5 !h-3.5 leading-none opacity-60">
                          open_in_new
                        </mat-icon>
                      }
                    </a>
                  }
                }
              </div>

              @if (gitlabNoticeVisible()) {
                <p
                  role="status"
                  class="text-xs text-blue-600 dark:text-blue-400 font-medium"
                >
                  GitLab link placeholder (#) — ready to be updated in portfolio.data.ts.
                </p>
              }
            </div>
          </div>

          <!-- Right Column: Architectural Stack Overview Card -->
          <div class="lg:col-span-5">
            <div
              class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-6 sm:p-7 shadow-sm space-y-5"
            >
              <div class="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
                <div>
                  <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Core Engineering Stack
                  </h2>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    End-to-end delivery across database, API, and UI layers
                  </p>
                </div>
                <mat-icon class="text-blue-600 dark:text-blue-400">layers</mat-icon>
              </div>

              <div class="space-y-4">
                <div class="flex items-start gap-3.5">
                  <div class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">dns</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Backend &amp; REST APIs
                    </h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                      C#, .NET 9, ASP.NET Core Web API, billing &amp; tenant system integrations, role-based &amp; license-tier access control.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3.5">
                  <div class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">storage</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Database &amp; Performance
                    </h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                      SQL query optimization and server-side pagination eliminating timeout errors on large enterprise datasets.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3.5">
                  <div class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">web</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Frontend Architecture
                    </h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                      Angular, TypeScript, HTML5, CSS3, complex filter builders, and responsive enterprise workflows.
                    </p>
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Current Role: Software Engineer &#64; VIT Infotech</span>
                <a
                  href="#experience"
                  (click)="onExperienceClick($event)"
                  class="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap shrink-0"
                >
                  <span>View Timeline</span>
                  <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">arrow_downward</mat-icon>
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
  readonly hero = input.required<HeroData>();
  readonly navigateToSection = output<string>();

  readonly gitlabNoticeVisible = signal(false);

  onContactClick(event: Event): void {
    event.preventDefault();
    this.navigateToSection.emit(this.hero().contactSectionId);
  }

  onExperienceClick(event: Event): void {
    event.preventDefault();
    this.navigateToSection.emit('experience');
  }

  onGitlabPlaceholderClick(event: Event): void {
    if (this.hero().socialLinks.find((l) => l.id === 'gitlab')?.href === '#') {
      event.preventDefault();
      this.gitlabNoticeVisible.set(true);
    }
  }
}
