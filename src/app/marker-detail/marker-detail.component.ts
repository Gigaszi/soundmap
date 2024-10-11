// marker-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../map-data.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslateService} from "@ngx-translate/core";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-marker-detail',
  templateUrl: './marker-detail.component.html',
  styleUrls: ['./marker-detail.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
})
export class MarkerDetailComponent implements OnInit {
  selectedMarkerId: number | null = null;
  markerDetails: any; // Adjust the type based on your backend response
  currentAudio: HTMLAudioElement | undefined;
  audioData: any;
  showInfo: boolean = false;
  startInfo: boolean = true;

  showText() {
    this.showInfo = !this.showInfo;
  }

  constructor(private translate: TranslateService, private mapDataService: MapDataService,
              private httpClient: HttpClient) {
    // Set default language
    this.translate.setDefaultLang('de');
    // Use a language
    this.translate.use('de');
  }

  ngOnInit() {
    // Subscribe to changes in the selected marker ID
    this.mapDataService.selectedMarkerId$.subscribe((markerId) => {
      this.selectedMarkerId = markerId;
      // Fetch data from the backend based on markerId and update the component
      if (this.selectedMarkerId !== null) {
        this.fetchMarkerDetails(this.selectedMarkerId);
        this.startInfo = false;
      }
    });
  }

  fetchMarkerDetails(markerId: number): void {
    const apiUrlImage = `http://localhost:3000/api/images/${markerId}`;
    const apiUrlSound = `http://localhost:3000/api/audios/${markerId}`;

    this.httpClient.get(apiUrlImage).subscribe(
      (data: any) => {
        // Handle the data received from the backend
        this.markerDetails = data;

        // Fetch audio data after image data
        this.httpClient.get(apiUrlSound).subscribe(
          (audioData: any) => {
            // Handle the audio data received from the backend
            this.audioData = audioData;

            // Play audio after both image and audio data are fetched
            this.playAudio();
          },
          (audioError) => {
            console.error(audioError);
            // Handle audio error
          }
        );
      },
      (error) => {
        console.error(error);
        // Handle image error
      }
    );
  }

  playAudio() {
    // Stop the previous audio if it exists
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    // Create a new Audio object and play the MP3 file
    console.log(this.audioData);
    this.currentAudio = new Audio(this.audioData.file_path);
    console.log(this.currentAudio);
    this.currentAudio.play();
  }
}
