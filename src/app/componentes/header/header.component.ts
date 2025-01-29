import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AtrasService } from '../../servicios/atras.service';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, MatButtonModule, MatMenuModule, RouterModule, MatRippleModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  expand: boolean = false;
  atrasService = inject(AtrasService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.onResize(); // Se ejecuta solo en el navegador
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  setAtras() {
    this.atrasService.reset();
  }

  collapse() {
    this.expand = !this.expand;
  }

  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth > 900) {
        this.expand = false;
      }
    }
  }
}
