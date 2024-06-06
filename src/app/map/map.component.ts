import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapDataService } from '../map-data.service';

interface CustomMarker {
  color: string;
  name: string;
  marker: L.Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  markers: CustomMarker[] = [
    { color: 'red', name: 'Marker 1', marker: L.marker([49.41032, 8.69707]) },
    { color: 'red', name: 'Marker 2', marker: L.marker([49.4233, 8.69455]) },
    { color: 'red', name: 'Marker 3', marker: L.marker([49.4192882, 8.6931570]) },
    { color: 'blue', name: 'Marker 4', marker: L.marker([49.4121420, 8.7092182]) },
    { color: 'blue', name: 'Marker 5', marker: L.marker([49.4035109, 8.7269402]) },
    { color: 'blue', name: 'Marker 6', marker: L.marker([49.4023483, 8.6855940]) },
    { color: 'blue', name: 'Marker 7', marker: L.marker([49.4046826, 8.6760974]) },
    { color: 'blue', name: 'Marker 8', marker: L.marker([49.4092882, 8.6931570]) },
    { color: 'blue', name: 'Marker 9', marker: L.marker([49.4281053, 8.6860676]) },
    { color: 'green', name: 'Zentralmensa', marker: L.marker([49.4167849, 8.6676842]) }, // Zentralmensa
  ];

  constructor(private mapDataService: MapDataService) { }

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

  private addMarkers(): void {
    this.markers.forEach((customMarker, index) => {
      const marker = customMarker.marker;
      marker.on('click', () => this.handleMarkerClick(index));
      const iconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${customMarker.color}.png`;
      const customIcon = new L.Icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
      });
      marker.setIcon(customIcon);
      marker.addTo(this.map);
    });
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map(marker => marker.marker.getLatLng()));
    this.map.fitBounds(bounds);
  }

  private handleMarkerClick = (markerId: number) => {
    // Send the selected marker ID to the MapDataService
    this.mapDataService.setSelectedMarkerId(markerId);
    console.log(markerId);
  }
}
