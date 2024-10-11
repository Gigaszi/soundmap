import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-link-page',
  templateUrl: './link-page.component.html',
  styleUrl: './link-page.component.css'
})
export class LinkPageComponent {
  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('de');
    // Use a language
    this.translate.use('de');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
