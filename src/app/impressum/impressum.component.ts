import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.css'
})
export class ImpressumComponent {
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
