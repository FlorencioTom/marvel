import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router'; 
import { AtrasService } from '../../servicios/atras.service';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule,MatButtonModule, MatMenuModule, RouterModule, MatRippleModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  expand: boolean = false;
  atrasService = inject(AtrasService);

  setAtras(){
    this.atrasService.reset();
  }

  collapse(){
    this.expand = !this.expand;
  }
}
