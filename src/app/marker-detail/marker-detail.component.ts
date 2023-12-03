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
    console.log(this.markerDetails);
  }
}
