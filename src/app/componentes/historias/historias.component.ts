import { Component, inject } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent],
  templateUrl: './historias.component.html',
  styleUrl: './historias.component.scss'
})
export class HistoriasComponent {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  Historias: any[] = []; 
  historia: any;
  
  loadingText: string = this.loadingService.loadingText;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando historias';
    });
    this.marvelService.getStories().subscribe(response => {
      this.Historias = response.data.results;
    });
  }
} 