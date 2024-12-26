import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelService } from './servicios/marvel.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { LoadingService } from './servicios/texto-spinner.service';
import { ScrollToTopComponent } from "./componentes/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, // Define que este componente es standalone
  imports: [RouterOutlet, TranslateModule, CommonModule, HeaderComponent, FooterComponent, NgxSpinnerModule, ScrollToTopComponent], // Importar HttpClientModule aquí
  providers: [
     // Provee el HttpClient en este nivel
    MarvelService // Proveedor del servicio Marvel
  ],
})
export class AppComponent{

  public spinner = inject(NgxSpinnerService);
  public loadingService = inject(LoadingService);

  textoCarga = this.loadingService.loadingText;

  constructor() {}

}