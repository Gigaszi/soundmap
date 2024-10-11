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
    { color: 'red', name: 'Mühlbach', marker: L.marker([49.4315759,8.6961048]) },
    { color: 'red', name: 'Bienenstöcke am Gaiberg', marker: L.marker([49.370149,8.7228557]) },
    { color: 'red', name: 'Halfpipes Ernst-Walz-Brücke', marker: L.marker([49.4105862,8.6746469]) },
    { color: 'blue', name: 'Bonifatiuskirche Weststadt', marker: L.marker([49.4036774,8.6857582]) },
    { color: 'blue', name: 'Christuskirche', marker: L.marker([49.4018107,8.6860399]) },
    { color: 'blue', name: 'Mühltal (Sonnenaufgang)', marker: L.marker([49.4318874,8.7027183]) },
    { color: 'blue', name: 'Eisbahn am Karlsplatz', marker: L.marker([49.4123146,8.7129705]) },
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
