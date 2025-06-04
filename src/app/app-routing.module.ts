import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { SoundmapComponent } from './soundmap/soundmap.component';
import { LinkPageComponent } from './link-page/link-page.component';
import {TechnicalInformationComponent} from "./technical-information/technical-information.component";

const routes: Routes = [
  { path: '', component: SoundmapComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: ImpressumComponent },
  { path: 'soundmap', component: SoundmapComponent },
  { path: 'link-page', component: LinkPageComponent },
  { path: 'technical-information', component: TechnicalInformationComponent },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
