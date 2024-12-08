import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../map-data.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-marker-detail',
  templateUrl: './marker-detail.component.html',
  styleUrls: ['./marker-detail.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
})
export class MarkerDetailComponent implements OnInit {
  selectedMarkerId: number | null = null;
  markerDetails: any;
  currentAudio: HTMLAudioElement | undefined;
  showInfo: boolean = false;
  startInfo: boolean = true;
  markersData: any[] = [];

  showText() {
    this.showInfo = !this.showInfo;
  }

  constructor(
    private translate: TranslateService,
    private mapDataService: MapDataService,
    private httpClient: HttpClient
  ) {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  ngOnInit() {
    this.loadMarkersData();

    this.mapDataService.selectedMarkerId$.subscribe((markerId) => {
      this.selectedMarkerId = markerId;
      if (this.selectedMarkerId !== null) {
        console.log('Selected Marker ID:', this.startInfo);
        this.fetchMarkerDetails(this.selectedMarkerId);
        this.startInfo = false;
      }
    });
    console.log('MarkerDetailComponent initialized:', this.selectedMarkerId);
    console.log(this.startInfo);
  }

  loadMarkersData() {
    const jsonFilePath = 'assets/points.json';

    this.httpClient.get(jsonFilePath).subscribe(
      (data: any) => {
        this.markersData = data.points;
        console.log('Markers data loaded:', this.markersData);
      },
      (error) => {
        console.error('Error loading markers data:', error);
      }
    );
  }

  fetchMarkerDetails(markerId: number): void {
    this.markerDetails = this.markersData.find((marker) => marker.id === markerId);

    if (this.markerDetails) {
      console.log('Marker Details:', this.markerDetails);

      this.playAudio(this.markerDetails.audio_path);
    } else {
      console.error('Marker not found!');
    }
  }

  playAudio(audioPath: string) {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(audioPath);
    this.currentAudio.play().catch((err) => console.error('Error playing audio:', err));
  }
}
