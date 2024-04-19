import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerDetailComponent } from './marker-detail/marker-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MapDataService } from './map-data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { SoundmapComponent } from './soundmap/soundmap.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    ImpressumComponent,
    SoundmapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavbarComponent,
    MarkerDetailComponent,
    ScrollingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
