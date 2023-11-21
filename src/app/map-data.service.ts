// map-data.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapDataService {
  private selectedMarkerIdSubject = new Subject<number>();
  selectedMarkerId$ = this.selectedMarkerIdSubject.asObservable();

  setSelectedMarkerId(markerId: number) {
    this.selectedMarkerIdSubject.next(markerId);
  }
}
