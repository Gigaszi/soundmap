// marker-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../map-data.service';

@Component({
  selector: 'app-marker-detail',
  templateUrl: './marker-detail.component.html',
  styleUrls: ['./marker-detail.component.css'],
})
export class MarkerDetailComponent implements OnInit {
  selectedMarkerId: number | null = null;

  constructor(private mapDataService: MapDataService) {}

  ngOnInit() {
    // Subscribe to changes in the selected marker ID
    this.mapDataService.selectedMarkerId$.subscribe((markerId) => {
      this.selectedMarkerId = markerId;
      // Fetch data from the backend based on markerId and update the component
      // You may want to make an HTTP request to the backend here
    });
  }
}
