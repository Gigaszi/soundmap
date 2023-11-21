import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerDetailComponent } from './marker-detail/marker-detail.component';
import { MapDataService } from './map-data.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MarkerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
