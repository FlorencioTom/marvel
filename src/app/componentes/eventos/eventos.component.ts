import { Component, inject } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  Events: any[] = []; 
  event: any;
  
  loadingText: string = this.loadingService.loadingText;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando eventos';
    });
    this.marvelService.getEvents().subscribe(response => {
      this.Events = response.data.results;
    });
  }
} 