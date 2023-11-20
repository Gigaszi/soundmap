import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([49.41032, 8.69707]),
    L.marker([49.41, 8.69]),
    L.marker([49.4092882, 8.6931570]),
    L.marker([49.4121420, 8.7092182]),
    L.marker([49.4035109, 8.7269402]),
    L.marker([49.4023483, 8.6855940]),
    L.marker([49.4046826, 8.6760974]),
    L.marker([49.4092882, 8.6931570]),
    L.marker([49.4281053, 8.6860676]),
    L.marker([49.4167849, 8.6676842]), // Zentralmensa
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private addMarkers() {
    // Define arrays for red and blue markers
    const redMarkers = [this.markers[0], this.markers[1], this.markers[2]];
    const blueMarkers = [this.markers[3], this.markers[4], this.markers[5], this.markers[6], this.markers[7], this.markers[8]];
    const greenMarkers = [this.markers[9]];

    // Add red markers with custom red icon
    redMarkers.forEach(marker => {
      const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
      });

      marker.setIcon(redIcon);
      marker.addTo(this.map);
    });

    // Add blue markers with custom blue icon
    blueMarkers.forEach(marker => {
      const blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
      });

      marker.setIcon(blueIcon);
      marker.addTo(this.map);
    });

    greenMarkers.forEach(marker => {
      const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
      });

      marker.setIcon(greenIcon);
      marker.addTo(this.map);
    });
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    this.map.fitBounds(bounds);
  }
}
