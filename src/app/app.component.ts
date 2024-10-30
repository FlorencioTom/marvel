import { Component, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Importar el módulo aquí
import { MarvelService } from './servicios/marvel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, // Define que este componente es standalone
  imports: [CommonModule], // Importar HttpClientModule aquí
  providers: [
     // Provee el HttpClient en este nivel
    MarvelService // Proveedor del servicio Marvel
  ],
})
export class AppComponent {
  characters: any[] = []; // Aquí puedes almacenar los personajes

  private marvelService = inject(MarvelService);
  constructor() {}

  ngOnInit() {
    this.marvelService.getCharacters().subscribe(response => {
      this.characters = response.data.results; // Almacena los personajes en la variable
      console.log(this.characters);
    });
  }
}