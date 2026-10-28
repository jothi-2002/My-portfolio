import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { SectionNavService } from './core/section-nav';
import { ThemeService } from './core/theme';
import { PORTFOLIO_DATA } from './data/portfolio.data';
import { Footer } from './layout/footer';
import { Navbar } from './layout/navbar';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { Education } from './sections/education';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero';
import { Impact } from './sections/impact';
import { Projects } from './sections/projects';
import { Skills } from './sections/skills';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [Navbar, Hero, About, Skills, Experience, Impact, Projects, Education, Contact, Footer],
  templateUrl: './app.html',
})
export class App {
  // Injected eagerly so the saved theme is applied at startup
  protected readonly themeService = inject(ThemeService);

  protected readonly data = signal(PORTFOLIO_DATA);

  constructor() {
    const sectionNav = inject(SectionNavService);
    afterNextRender(() => {
      sectionNav.observe(['hero', ...this.data().navItems.map((item) => item.id)]);
    });
  }
}
