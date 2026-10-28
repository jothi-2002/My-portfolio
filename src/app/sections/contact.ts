import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactData } from '../data/portfolio.models';
import { IconName } from '../shared/icons';
import { FormField } from '../shared/ui/form-field';
import { Reveal } from '../shared/ui/reveal';
import { SectionHeader } from '../shared/ui/section-header';
import { buildGmailComposeUrl, buildMailtoUrl, validateContactForm } from '../utils/portfolio.utils';
import { Icon } from '../shared/ui/icon';

type CopyableField = 'email' | 'phone';

interface ContactChannel {
  readonly id: string;
  readonly label: string;
  readonly icon: IconName;
  readonly text: string;
  readonly href?: string;
  readonly external?: boolean;
  readonly mono?: boolean;
  readonly copyField?: CopyableField;
  readonly copyValue?: string;
}

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SectionHeader, FormField, Reveal, Icon],
  template: `
    <div class="page-container space-y-12">
      <app-section-header
        index="07"
        eyebrow="Get in Touch"
        [title]="contact().heading"
        headingId="contact-heading"
        [intro]="contact().intro"
      />

      <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <!-- Direct channels -->
        <div class="space-y-8 lg:col-span-5">
          @if (primary(); as channel) {
            <div appReveal class="space-y-4">
              <p class="eyebrow">{{ channel.label }}</p>
              <a
                [href]="channel.href"
                target="_blank"
                rel="noopener noreferrer"
                class="link-underline block break-all font-display text-2xl font-bold tracking-[-0.02em] text-ink transition-colors hover:text-brand sm:text-3xl"
              >
                {{ channel.text }}
              </a>
              <button
                type="button"
                (click)="copyText(channel.copyValue!, 'email')"
                [attr.aria-label]="'Copy ' + channel.label.toLowerCase() + ' ' + channel.copyValue"
                class="btn-small"
              >
                <app-icon [name]="copiedField() === 'email' ? 'check' : 'content_copy'" [size]="14" />
                <span>{{ copiedField() === 'email' ? 'Copied' : 'Copy' }}</span>
              </button>
            </div>
          }

          <ul>
            @for (channel of others(); track channel.id; let i = $index) {
              <li [appReveal]="i * 70" class="flex items-center justify-between gap-4 border-b border-line py-4 first:border-t">
                <div class="flex min-w-0 items-center gap-3.5">
                  <app-icon [name]="channel.icon" [size]="20" class="text-brand" />
                  <div class="min-w-0">
                    <div class="text-xs font-medium text-mute">{{ channel.label }}</div>
                    @if (channel.href) {
                      <a
                        [href]="channel.href"
                        [attr.target]="channel.external ? '_blank' : null"
                        [attr.rel]="channel.external ? 'noopener noreferrer' : null"
                        class="block truncate text-sm font-semibold text-ink transition-colors hover:text-brand"
                        [class.font-mono]="channel.mono"
                      >
                        {{ channel.text }}
                      </a>
                    } @else {
                      <div class="text-sm font-semibold text-ink">{{ channel.text }}</div>
                    }
                  </div>
                </div>

                @if (channel.copyField && channel.copyValue) {
                  <button
                    type="button"
                    (click)="copyText(channel.copyValue, channel.copyField)"
                    [attr.aria-label]="'Copy ' + channel.label.toLowerCase() + ' ' + channel.copyValue"
                    class="btn-small"
                  >
                    <app-icon [name]="copiedField() === channel.copyField ? 'check' : 'content_copy'" [size]="14" />
                    <span>{{ copiedField() === channel.copyField ? 'Copied' : 'Copy' }}</span>
                  </button>
                } @else if (channel.external && channel.href) {
                  <a
                    [href]="channel.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    [attr.aria-label]="'Visit ' + channel.label + ' profile (opens in new tab)'"
                    class="btn-small"
                  >
                    <span>Visit</span>
                    <app-icon name="open_in_new" [size]="14" />
                  </a>
                }
              </li>
            }
          </ul>
        </div>

        <!-- Message composer -->
        <div appReveal="120" class="lg:col-span-7">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmitGmail()" novalidate class="card space-y-5 p-6 sm:p-8">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <app-form-field controlId="contact-name" label="Your Name" [error]="errorFor('name')">
                <input
                  id="contact-name"
                  type="text"
                  formControlName="name"
                  (input)="syncFormSignal()"
                  placeholder="e.g. Priya Sharma"
                  autocomplete="name"
                  [attr.aria-invalid]="!!errorFor('name')"
                  [attr.aria-describedby]="errorFor('name') ? 'contact-name-error' : null"
                  class="field-input"
                />
              </app-form-field>

              <app-form-field controlId="contact-email" label="Your Email" [error]="errorFor('email')">
                <input
                  id="contact-email"
                  type="email"
                  formControlName="email"
                  (input)="syncFormSignal()"
                  placeholder="name@company.com"
                  autocomplete="email"
                  [attr.aria-invalid]="!!errorFor('email')"
                  [attr.aria-describedby]="errorFor('email') ? 'contact-email-error' : null"
                  class="field-input"
                />
              </app-form-field>
            </div>

            <app-form-field controlId="contact-subject" label="Subject" [error]="errorFor('subject')">
              <input
                id="contact-subject"
                type="text"
                formControlName="subject"
                (input)="syncFormSignal()"
                placeholder="Full Stack Developer Opportunity (.NET / Angular)"
                [attr.aria-invalid]="!!errorFor('subject')"
                [attr.aria-describedby]="errorFor('subject') ? 'contact-subject-error' : null"
                class="field-input"
              />
            </app-form-field>

            <app-form-field controlId="contact-message" label="Message" [error]="errorFor('message')">
              <textarea
                id="contact-message"
                rows="4"
                formControlName="message"
                (input)="syncFormSignal()"
                placeholder="Hello Jothi, I came across your portfolio and would like to connect..."
                [attr.aria-invalid]="!!errorFor('message')"
                [attr.aria-describedby]="errorFor('message') ? 'contact-message-error' : null"
                class="field-input resize-y"
              ></textarea>
            </app-form-field>

            <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div class="flex flex-wrap items-center gap-3">
                <button type="submit" class="btn-primary">
                  <app-icon name="mail" [size]="20" />
                  <span>Open in Gmail</span>
                </button>
                <button type="button" (click)="onSubmitMailto()" class="btn-secondary">
                  <app-icon name="outgoing_mail" [size]="20" class="text-brand" />
                  <span>Default Mail App</span>
                </button>
              </div>

              <button type="button" (click)="onReset()" class="btn-small">
                <app-icon name="restart_alt" [size]="14" />
                <span>Reset</span>
              </button>
            </div>

            @if (generatedGmailUrl() && generatedMailtoUrl()) {
              <div
                role="status"
                class="flex flex-col justify-between gap-3 rounded-xl border border-brand/30 bg-brand/10 p-4 text-sm text-ink sm:flex-row sm:items-center"
              >
                <div class="flex items-center gap-2.5">
                  <app-icon name="check_circle" [size]="20" class="shrink-0 text-brand" />
                  <span>Message prepared for <strong>{{ contact().email }}</strong>:</span>
                </div>
                <div class="flex shrink-0 flex-wrap items-center gap-4">
                  <a
                    [href]="generatedGmailUrl()"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
                  >
                    <span>Open Gmail Tab</span>
                    <app-icon name="open_in_new" [size]="14" />
                  </a>
                  <a [href]="generatedMailtoUrl()" class="inline-flex items-center gap-1 font-medium text-soft hover:text-brand hover:underline">
                    <span>Mailto Link</span>
                    <app-icon name="launch" [size]="14" />
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
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly contact = input.required<ContactData>();

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer));
  }

  readonly contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    subject: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true }),
  });

  readonly formState = signal(this.contactForm.getRawValue());
  readonly submitted = signal(false);
  readonly generatedMailtoUrl = signal<string | null>(null);
  readonly generatedGmailUrl = signal<string | null>(null);
  readonly copiedField = signal<CopyableField | null>(null);

  readonly validationResult = computed(() => validateContactForm(this.formState()));

  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly channels = computed<readonly ContactChannel[]>(() => {
    const c = this.contact();
    return [
      {
        id: 'email',
        label: 'Email',
        icon: 'mail_outline',
        text: c.email,
        href: `https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}`,
        external: true,
        copyField: 'email',
        copyValue: c.email,
      },
      {
        id: 'phone',
        label: 'Phone',
        icon: 'call',
        text: c.phone,
        href: `tel:${c.phone}`,
        mono: true,
        copyField: 'phone',
        copyValue: c.phone,
      },
      { id: 'linkedin', label: 'LinkedIn', icon: 'work_outline', text: c.linkedinLabel, href: c.linkedinUrl, external: true },
      { id: 'github', label: 'GitHub', icon: 'code', text: c.githubLabel, href: c.githubUrl, external: true },
      { id: 'location', label: 'Location', icon: 'place', text: c.location },
    ];
  });

  protected readonly primary = computed(() => this.channels()[0]);
  protected readonly others = computed(() => this.channels().slice(1));

  /** Validation message for a field, shown only after the first submit attempt. */
  protected errorFor(field: keyof ReturnType<typeof validateContactForm>['errors']): string | undefined {
    return this.submitted() ? this.validationResult().errors[field] : undefined;
  }

  syncFormSignal(): void {
    this.formState.set(this.contactForm.getRawValue());
  }

  private prepareUrls(): boolean {
    this.syncFormSignal();
    this.submitted.set(true);

    if (!this.validationResult().valid) {
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
    if (this.isBrowser && mailtoUrl) {
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

  copyText(value: string, field: CopyableField): void {
    if (!this.isBrowser) {
      return;
    }

    navigator.clipboard?.writeText(value).catch(() => {
      // Clipboard can be unavailable (insecure context, headless browsers)
    });

    this.copiedField.set(field);
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copiedField.set(null), 2000);
  }
}
