// marker-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../map-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-marker-detail',
  templateUrl: './marker-detail.component.html',
  styleUrls: ['./marker-detail.component.css'],
})
export class MarkerDetailComponent implements OnInit {
  selectedMarkerId: number | null = null;
  markerDetails: any; // Adjust the type based on your backend response
  currentAudio: HTMLAudioElement | undefined;

  constructor(
    private mapDataService: MapDataService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    // Subscribe to changes in the selected marker ID
    this.mapDataService.selectedMarkerId$.subscribe((markerId) => {
      this.selectedMarkerId = markerId;
      // Fetch data from the backend based on markerId and update the component
      if (this.selectedMarkerId !== null) {
        this.fetchMarkerDetails(this.selectedMarkerId);
      }
    });
  }

  fetchMarkerDetails(markerId: number): void {
    const apiUrl = `http://localhost:3000/api/images/${markerId}`;

    this.httpClient.get(apiUrl).subscribe(
      (data: any) => {
        // Handle the data received from the backend
        this.markerDetails = data;
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
    this.playAudio();
    console.log(this.markerDetails);
  }

  playAudio() {
    // Stop the previous audio if it exists
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    // Create a new Audio object and play the MP3 file
    this.currentAudio = new Audio('../../assets/audios/test1.mp3');
    this.currentAudio.play();
  }
}



