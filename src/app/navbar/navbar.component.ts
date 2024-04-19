import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
})
export class NavbarComponent {}
