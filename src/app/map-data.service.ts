import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapDataService {
  private selectedMarkerDetails = new BehaviorSubject<any>(null);
  selectedMarkerDetails$ = this.selectedMarkerDetails.asObservable();

  setSelectedMarkerDetails(details: any): void {
    this.selectedMarkerDetails.next(details);
  }
}
