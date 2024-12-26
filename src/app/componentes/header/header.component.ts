import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router'; 
import { AtrasService } from '../../servicios/atras.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule,MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  atrasService = inject(AtrasService);
  setAtras(){
    this.atrasService.reset();
  }
}
