import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelService } from './servicios/marvel.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, // Define que este componente es standalone
  imports: [RouterOutlet, TranslateModule, CommonModule, HeaderComponent, FooterComponent], // Importar HttpClientModule aquí
  providers: [
     // Provee el HttpClient en este nivel
    MarvelService // Proveedor del servicio Marvel
  ],
})
export class AppComponent {
  characters: any[] = []; // Aquí puedes almacenar los personajes
  character: any;

  private marvelService = inject(MarvelService);
  constructor() {}

  ngOnInit() {
    this.marvelService.getComics().subscribe(response => {
      this.character = response.data.results; // Almacena los personajes en la variable
      console.log('Personaje: ', this.character);
    });
  }
}