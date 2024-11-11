import { Component, inject } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss'
})
export class ComicsComponent {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  comics: any[] = []; // Aquí puedes almacenar los personajes
  comic: any;
  
  loadingText: string = this.loadingService.loadingText;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando comics';
    });
    this.marvelService.getComics().subscribe(response => {
      this.comic = response.data.results;
    });
  }
} 
 