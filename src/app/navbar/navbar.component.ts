import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule, TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TranslateModule],
})
export class NavbarComponent {
  public currentFlag: string = "assets/flags/uk.png";

  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('de');
    // Use a language
    this.translate.use('de');
  }

  switchLanguage() {
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    const newLang = currentLang === 'de' ? 'en' : 'de';
    this.translate.use(newLang);

    // Change the flag based on the language
    this.currentFlag = newLang === 'de' ? 'assets/flags/uk.png' : 'assets/flags/de.png';
  }
}
