import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { MapDataService } from '../map-data.service';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

interface CustomMarker {
  color: string;
  name_de: string;
  name_en: string;
  marker: L.Marker;
}

interface Point {
  color: string;
  title_en: string;
  title_de: string;
  coordinates: [number, number];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [TranslateModule],
  standalone: true
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  markers: CustomMarker[] = [];

  constructor(
    private httpClient: HttpClient,
    private mapDataService: MapDataService,
    private translate: TranslateService,
  ) {}


  async ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.updateTooltips();
    });
    await this.loadMarkersFromJson('assets/points.json');

    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }

  ngAfterViewInit() {}

  private loadMarkersFromJson(jsonPath: string): Promise<void> {
    console.log('Loading markers from:', jsonPath);

    return new Promise<void>((resolve, reject) => {
      this.httpClient.get<{ points: Point[] }>(jsonPath).subscribe({
        next: (jsonData) => {
          const points = jsonData.points;

          // Map the points to markers
          this.markers = points.map((point) => ({
            color: point.color,
            name_de: point.title_de,
            name_en: point.title_en,
            marker: L.marker(point.coordinates),
          }));

          console.log('Markers loaded');
          resolve();
        },
        error: (error) => {
          console.error('Error loading markers:', error);
          reject(error);
        },
      });
    });
  }

  private initializeMap() {
    const baseMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map').setView([0, 0], 2); // Set initial view
    L.tileLayer(baseMapUrl).addTo(this.map);
  }

  private addMarkers(): void {
    this.markers.forEach((customMarker, index) => {
      const marker = customMarker.marker;

      // Set tooltip content dynamically based on the current language
      const getTooltipContent = () => `
      <div class="custom-tooltip">
        <div>
          ${
        this.translate.currentLang === 'en'
          ? customMarker.name_en
          : customMarker.name_de
      }
        </div>
      </div>
    `;

      marker.bindTooltip(getTooltipContent(), {
        permanent: false,
        direction: 'top',
        className: 'custom-tooltip-container',
      });

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
    console.log('Centering map on markers:', this.markers);
    const latLngArray = this.markers.map((customMarker) => {
      const latLng = customMarker.marker.getLatLng();
      return latLng;
    });

    const bounds = L.latLngBounds(latLngArray);

    this.map.fitBounds(bounds);
  }




  private handleMarkerClick = (markerId: number) => {
    // Send the selected marker ID to the MapDataService
    this.mapDataService.setSelectedMarkerId(markerId);
    console.log('Clicked marker ID:', markerId);
  };

  private updateTooltips(): void {
    this.markers.forEach((customMarker) => {
      const marker = customMarker.marker;

      // Update tooltip content dynamically
      const newTooltipContent = `
      <div class="custom-tooltip">
          ${
        this.translate.currentLang === 'en'
          ? customMarker.name_en
          : customMarker.name_de
      }
        </div>
      </div>
    `;

      marker.unbindTooltip();
      marker.bindTooltip(newTooltipContent, {
        permanent: false,
        direction: 'top',
        className: 'custom-tooltip-container',
      });
    })
  }

}

