import { Component, inject } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.scss'
})
export class PersonajesComponent {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  characters: any[] = []; // Aquí puedes almacenar los personajes
  character: any;
  
  loadingText: string = this.loadingService.loadingText;

  constructor() {}

  ngOnInit() {
    this.loadingService.setLoadingText('Cargando personajes');
    this.marvelService.getComics().subscribe(response => {
      this.character = response.data.results; // Almacena los personajes en la variable
      console.log('Personaje: ', this.character);
    });
  }
} 
 