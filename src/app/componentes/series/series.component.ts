import { Component, inject } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  Series: any[] = []; 
  serie: any;
  
  loadingText: string = this.loadingService.loadingText;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando series';
    });
    this.marvelService.getSeries().subscribe(response => {
      this.Series = response.data.results;
    });
  }
} 