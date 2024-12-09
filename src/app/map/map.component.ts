import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { MapDataService } from '../map-data.service';
import { TranslateService } from "@ngx-translate/core";

interface Marker {
  color: string;
  title_de: string;
  title_en: string;
  coordinates: [number, number];
  description_de: string;
  description_en: string;
  image_paths: string;
  audio_path: string;
  marker: L.Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  markers: Marker[] = [];

  constructor(
    private httpClient: HttpClient,
    private mapDataService: MapDataService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.updateTooltips();
    });

    this.loadMarkersFromJson('assets/points.json')
      .then(() => {
        this.initializeMap();
        this.addMarkers();
        this.centerMap();
      })
      .catch((error) => console.error('Error initializing map:', error));
  }

  ngAfterViewInit() {}

  private loadMarkersFromJson(jsonPath: string): Promise<void> {
    console.log('Loading markers from:', jsonPath);

    return this.httpClient.get<{ points: Marker[] }>(jsonPath).toPromise().then((jsonData) => {
      // Check if jsonData and jsonData.points are defined
      if (jsonData && Array.isArray(jsonData.points)) {
        this.markers = jsonData.points.map((point) => this.createMarker(point));
        console.log('Markers loaded', this.markers);
      } else {
        console.error('Invalid data format: points array is missing or not an array');
        throw new Error('Invalid data format');
      }
    }).catch((error) => {
      console.error('Error loading markers:', error);
      throw error;
    });
  }


  private createMarker(point: Marker): Marker {
    return {
      ...point,
      marker: L.marker(point.coordinates)
    };
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([0, 0], 2);

    var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    });

    CartoDB_Voyager.addTo(this.map);
  }


  private addMarkers(): void {
    this.markers.forEach((markerData, index) => {
      const marker = markerData.marker;
      this.bindTooltip(marker, markerData);
      this.setMarkerIcon(marker, markerData.color);
      marker.on('click', () => this.handleMarkerClick(index));
      marker.addTo(this.map);
    });
  }

  private bindTooltip(marker: L.Marker, markerData: Marker): void {
    const getTooltipContent = () => `
      <div class="custom-tooltip">
        <div>
          ${this.translate.currentLang === 'en' ? markerData.title_en : markerData.title_de}
        </div>
      </div>
    `;

    marker.bindTooltip(getTooltipContent(), {
      permanent: false,
      direction: 'top',
      className: 'custom-tooltip-container',
    });
  }

  private setMarkerIcon(marker: L.Marker, color: string): void {
    const iconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`;
    const customIcon = new L.Icon({
      iconUrl: iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
    });
    marker.setIcon(customIcon);
  }

  private centerMap(): void {
    console.log('Centering map on markers:', this.markers);
    const latLngArray = this.markers.map((markerData) => markerData.marker.getLatLng());
    const bounds = L.latLngBounds(latLngArray);
    this.map.fitBounds(bounds);
  }

  private handleMarkerClick = (markerId: number): void => {
    const selectedMarker = this.markers[markerId];
    this.mapDataService.setSelectedMarkerDetails({
      id: markerId,
      name_de: selectedMarker.title_de,
      name_en: selectedMarker.title_en,
      description_de: selectedMarker.description_de,
      description_en: selectedMarker.description_en,
      image_paths: selectedMarker.image_paths,
      audio_path: selectedMarker.audio_path,
    });
    console.log('Selected marker details sent to MarkerDetailComponent:', selectedMarker);
  };

  private updateTooltips(): void {
    this.markers.forEach((markerData) => {
      const marker = markerData.marker;
      const newTooltipContent = `
        <div class="custom-tooltip">
          ${this.translate.currentLang === 'en' ? markerData.title_en : markerData.title_de}
        </div>
      `;

      marker.unbindTooltip();
      marker.bindTooltip(newTooltipContent, {
        permanent: false,
        direction: 'top',
        className: 'custom-tooltip-container',
      });
    });
  }
}
