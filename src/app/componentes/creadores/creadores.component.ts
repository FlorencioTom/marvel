import { Component, inject } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-creadores',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent],
  templateUrl: './creadores.component.html',
  styleUrl: './creadores.component.scss'
})
export class CreadoresComponent {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  Creators: any[] = []; 
  Creator: any;
  
  loadingText: string = this.loadingService.loadingText;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando creadores';
    });
    this.marvelService.getCreators().subscribe(response => {
      this.Creators = response.data.results;
    });
  }
} 