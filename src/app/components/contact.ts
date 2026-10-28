import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ContactData } from '../data/portfolio.data';
import { buildGmailComposeUrl, buildMailtoUrl, validateContactForm } from '../utils/portfolio.utils';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="space-y-2">
        <div class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
          06. Get in Touch
        </div>
        <h2
          id="contact-heading"
          class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance"
        >
          Contact
        </h2>
        <p class="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Reach out directly via email, phone, LinkedIn, or GitHub, or use the form below to compose an email in your Gmail or default mail app.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <!-- Left Column: Direct Contact Details -->
        <div class="lg:col-span-5 space-y-4">
          <!-- Email -->
          <div
            class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">mail_outline</mat-icon>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-medium text-slate-500 dark:text-slate-400">Email</div>
                <a
                  [href]="'https://mail.google.com/mail/?view=cm&fs=1&to=' + contact().email"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {{ contact().email }}
                </a>
              </div>
            </div>
            <button
              type="button"
              (click)="copyText(contact().email, 'email')"
              [attr.aria-label]="'Copy email address ' + contact().email"
              class="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shrink-0"
            >
              <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">
                {{ copiedField() === 'email' ? 'check' : 'content_copy' }}
              </mat-icon>
              <span>{{ copiedField() === 'email' ? 'Copied' : 'Copy' }}</span>
            </button>
          </div>

          <!-- Phone -->
          <div
            class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">call</mat-icon>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</div>
                <a
                  [href]="'tel:' + contact().phone"
                  class="block font-mono tabular-nums text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {{ contact().phone }}
                </a>
              </div>
            </div>
            <button
              type="button"
              (click)="copyText(contact().phone, 'phone')"
              [attr.aria-label]="'Copy phone number ' + contact().phone"
              class="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shrink-0"
            >
              <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">
                {{ copiedField() === 'phone' ? 'check' : 'content_copy' }}
              </mat-icon>
              <span>{{ copiedField() === 'phone' ? 'Copied' : 'Copy' }}</span>
            </button>
          </div>

          <!-- LinkedIn -->
          <div
            class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">work_outline</mat-icon>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-medium text-slate-500 dark:text-slate-400">LinkedIn</div>
                <a
                  [href]="contact().linkedinUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {{ contact().linkedinLabel }}
                </a>
              </div>
            </div>
            <a
              [href]="contact().linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile in new tab"
              class="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
            >
              <span>Visit</span>
              <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">open_in_new</mat-icon>
            </a>
          </div>

          <!-- GitHub -->
          <div
            class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">code</mat-icon>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-medium text-slate-500 dark:text-slate-400">GitHub</div>
                <a
                  [href]="contact().githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {{ contact().githubLabel }}
                </a>
              </div>
            </div>
            <a
              [href]="contact().githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile in new tab"
              class="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
            >
              <span>Visit</span>
              <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">open_in_new</mat-icon>
            </a>
          </div>

          <!-- Location -->
          <div
            class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 flex items-center gap-3.5"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"
            >
              <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none">place</mat-icon>
            </div>
            <div>
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400">Location</div>
              <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {{ contact().location }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Typed Reactive Form backed by Signals -->
        <div class="lg:col-span-7">
          <form
            [formGroup]="contactForm"
            (ngSubmit)="onSubmitGmail()"
            novalidate
            class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 space-y-5"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Name Field -->
              <div class="space-y-1.5">
                <label
                  for="contact-name"
                  class="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  formControlName="name"
                  (input)="syncFormSignal()"
                  placeholder="e.g. Priya Sharma"
                  [attr.aria-invalid]="submitted() && !!validationResult().errors.name"
                  [attr.aria-describedby]="
                    submitted() && validationResult().errors.name ? 'error-name' : null
                  "
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                />
                @if (submitted() && validationResult().errors.name) {
                  <p
                    id="error-name"
                    role="alert"
                    class="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
                  >
                    <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">error_outline</mat-icon>
                    <span>{{ validationResult().errors.name }}</span>
                  </p>
                }
              </div>

              <!-- Email Field -->
              <div class="space-y-1.5">
                <label
                  for="contact-email"
                  class="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  formControlName="email"
                  (input)="syncFormSignal()"
                  placeholder="name@company.com"
                  [attr.aria-invalid]="submitted() && !!validationResult().errors.email"
                  [attr.aria-describedby]="
                    submitted() && validationResult().errors.email ? 'error-email' : null
                  "
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                />
                @if (submitted() && validationResult().errors.email) {
                  <p
                    id="error-email"
                    role="alert"
                    class="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
                  >
                    <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">error_outline</mat-icon>
                    <span>{{ validationResult().errors.email }}</span>
                  </p>
                }
              </div>
            </div>

            <!-- Subject Field -->
            <div class="space-y-1.5">
              <label
                for="contact-subject"
                class="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                formControlName="subject"
                (input)="syncFormSignal()"
                placeholder="Full Stack Developer Opportunity (.NET / Angular)"
                [attr.aria-invalid]="submitted() && !!validationResult().errors.subject"
                [attr.aria-describedby]="
                  submitted() && validationResult().errors.subject ? 'error-subject' : null
                "
                class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
              />
              @if (submitted() && validationResult().errors.subject) {
                <p
                  id="error-subject"
                  role="alert"
                  class="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
                >
                  <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">error_outline</mat-icon>
                  <span>{{ validationResult().errors.subject }}</span>
                </p>
              }
            </div>

            <!-- Message Field -->
            <div class="space-y-1.5">
              <label
                for="contact-message"
                class="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows="4"
                formControlName="message"
                (input)="syncFormSignal()"
                placeholder="Hello Jothi, I came across your portfolio and would like to connect..."
                [attr.aria-invalid]="submitted() && !!validationResult().errors.message"
                [attr.aria-describedby]="
                  submitted() && validationResult().errors.message ? 'error-message' : null
                "
                class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors resize-y"
              ></textarea>
              @if (submitted() && validationResult().errors.message) {
                <p
                  id="error-message"
                  role="alert"
                  class="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
                >
                  <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">error_outline</mat-icon>
                  <span>{{ validationResult().errors.message }}</span>
                </p>
              }
            </div>

            <!-- Form Footer & Submit Actions -->
            <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  class="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <mat-icon class="!text-base !w-4 !h-4 leading-none">mail</mat-icon>
                  <span>Open in Gmail</span>
                </button>

                <button
                  type="button"
                  (click)="onSubmitMailto()"
                  class="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <mat-icon class="!text-base !w-4 !h-4 leading-none text-blue-600 dark:text-blue-400">
                    outgoing_mail
                  </mat-icon>
                  <span>Default Mail App</span>
                </button>
              </div>

              <button
                type="button"
                (click)="onReset()"
                class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">restart_alt</mat-icon>
                <span>Reset</span>
              </button>
            </div>

            @if (generatedGmailUrl() && generatedMailtoUrl()) {
              <div
                role="status"
                class="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div class="flex items-center gap-2.5">
                  <mat-icon class="text-blue-600 dark:text-blue-400 !text-lg !w-5 !h-5 leading-none shrink-0">
                    check_circle
                  </mat-icon>
                  <span>
                    Message prepared for <strong>{{ contact().email }}</strong>:
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-4 shrink-0">
                  <a
                    [href]="generatedGmailUrl()"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>Open Gmail Tab</span>
                    <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">open_in_new</mat-icon>
                  </a>
                  <a
                    [href]="generatedMailtoUrl()"
                    class="inline-flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>Mailto Link</span>
                    <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">launch</mat-icon>
                  </a>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  `,
})
export class Contact {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly contact = input.required<ContactData>();

  readonly contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    subject: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true }),
  });

  readonly formState = signal({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  readonly submitted = signal(false);
  readonly generatedMailtoUrl = signal<string | null>(null);
  readonly generatedGmailUrl = signal<string | null>(null);
  readonly copiedField = signal<'email' | 'phone' | null>(null);

  readonly validationResult = computed(() => validateContactForm(this.formState()));

  syncFormSignal(): void {
    this.formState.set(this.contactForm.getRawValue());
  }

  private prepareUrls(): boolean {
    this.syncFormSignal();
    this.submitted.set(true);

    const validation = this.validationResult();
    if (!validation.valid) {
      this.generatedMailtoUrl.set(null);
      this.generatedGmailUrl.set(null);
      return false;
    }

    const payload = this.formState();
    this.generatedMailtoUrl.set(buildMailtoUrl(this.contact().email, payload));
    this.generatedGmailUrl.set(buildGmailComposeUrl(this.contact().email, payload));
    return true;
  }

  onSubmitGmail(): void {
    if (!this.prepareUrls()) {
      return;
    }

    const gmailUrl = this.generatedGmailUrl();
    if (this.isBrowser && gmailUrl) {
      const link = this.document.createElement('a');
      link.href = gmailUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    }
  }

  onSubmitMailto(): void {
    if (!this.prepareUrls()) {
      return;
    }

    const mailtoUrl = this.generatedMailtoUrl();
    if (this.isBrowser && mailtoUrl && typeof window !== 'undefined') {
      window.location.href = mailtoUrl;
    }
  }

  onReset(): void {
    this.contactForm.reset();
    this.syncFormSignal();
    this.submitted.set(false);
    this.generatedMailtoUrl.set(null);
    this.generatedGmailUrl.set(null);
  }

  copyText(value: string, field: 'email' | 'phone'): void {
    if (this.isBrowser && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {
        // Ignore clipboard errors in headless environments
      });
    }
    this.copiedField.set(field);
    if (this.isBrowser) {
      setTimeout(() => {
        if (this.copiedField() === field) {
          this.copiedField.set(null);
        }
      }, 2000);
    }
  }
}
