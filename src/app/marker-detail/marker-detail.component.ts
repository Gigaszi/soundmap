import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Component, OnInit} from "@angular/core";
import {MapDataService} from "../map-data.service";

@Component({
  selector: 'app-marker-detail',
  templateUrl: './marker-detail.component.html',
  styleUrls: ['./marker-detail.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
})
export class MarkerDetailComponent implements OnInit {
  markerDetails: any = null;
  currentAudio: HTMLAudioElement | undefined;
  showInfo: boolean = false;
  startInfo: boolean = true;

  constructor(
    private translate: TranslateService,
    private mapDataService: MapDataService
  ) {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  ngOnInit() {
    this.mapDataService.selectedMarkerDetails$.subscribe((details) => {
      this.markerDetails = details;
      if (this.markerDetails) {
        this.startInfo = false;
        console.log('Marker Details Received:', this.markerDetails);
        this.playAudio(this.markerDetails.audio_path);
      }
    });
  }

  showText() {
    this.showInfo = !this.showInfo;
  }

  playAudio(audioPath: string) {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    if (audioPath) {
      this.currentAudio = new Audio(audioPath);
      this.currentAudio.play().catch((err) =>
        console.error('Error playing audio:', err)
      );
    }
  }

  getTranslatedTitle(): string {
    return this.translate.currentLang === 'en'
      ? this.markerDetails?.name_en
      : this.markerDetails?.name_de;
  }

  getTranslatedDescription(): string {
    return this.translate.currentLang === 'en'
      ? this.markerDetails?.description_en
      : this.markerDetails?.description_de;
  }
}
