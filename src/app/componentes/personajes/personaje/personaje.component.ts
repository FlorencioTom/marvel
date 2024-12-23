import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../../servicios/marvel.service';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingService } from '../../../servicios/texto-spinner.service';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-personaje',
  standalone: true,
  imports: [DropdownModule, FloatLabelModule, CommonModule, MatProgressSpinnerModule,
     MatRippleModule, MatButtonToggleModule, MatIconModule, MatFormFieldModule, MatInputModule, 
     FormsModule, MatButtonModule],
  templateUrl: './personaje.component.html',
  styleUrl: './personaje.component.scss'
})
export class PersonajeComponent implements OnInit {
  id!: string; 
  character: any;
  comics: any = [];
  arrComics: any = [];
  arrSeries: any = [];
  arrEvents: any = [];
  arrStories: any = [];
  series: any = [];
  stories: any = [];
  events: any = [];
  error:boolean = false;
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number = 20;
  color: string = '#d7e3ff85';
  toggleDate: boolean = true;
  comicValue: string = '';
  serieValue: string = '';
  eventValue: string = '';
  public toggleOrder: { [key: string]: boolean } = {
    comics: true, // Para los cómics
    series: true, // Para las series
    events: true  // Para los eventos (si es necesario)
  };

  constructor(private route: ActivatedRoute, private marvelService: MarvelService) {}

  public loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.marvelService.getCharacterById(this.id).subscribe(
      response => {
        this.character = response.data.results[0];
        console.log(this.character);
        // this.handleComics();
        // this.handleSeries();
        // this.handleEvents();
        this.stories = this.character.stories.items;

        this.character.modified = this.formatDate(this.character.modified);
      }, error => {
        this.error = true;
    })
  }

  get isComicsEmpty(): boolean {
    return this.arrComics.length === 0;
  } 

  get isSeriesEmpty(): boolean {
    return this.arrSeries.length === 0;
  }

  get isEventsEmpty(): boolean {
    return this.arrEvents.length === 0;
  }

  public getUriResults(){
    this.marvelService.getUriInfo(this.character.comics.collectionURI);
  }

  public async handleComics() {
    this.loadingService.loadingText = 'Cargando comics relacionados con ' + this.character?.name;
    this.comics = this.character.comics.items;
  
    if (this.arrComics.length === 0) {
      const comicRequests = this.comics.map((x: { resourceURI: string }) =>
        firstValueFrom(this.marvelService.getUriInfo(x.resourceURI))
      );
      try {
        const responses = await Promise.all(comicRequests);
        this.arrComics = responses.map(response => response.data.results[0]);
        this.reordenar(this.arrComics, 'title');
        this.loadingService.loadingText = '';
      } catch (error) {
        console.error('Error al cargar los cómics:', error);
        this.loadingService.loadingText = 'Error al cargar los cómics';
      }
    }
  }

  public async handleSeries() {
    this.loadingService.loadingText = 'Cargando series relacionadas con ' + this.character?.name;
    this.series = this.character.series.items;
  
    if (this.arrSeries.length === 0) {
      const seriesRequests = this.series.map((x: { resourceURI: string }) =>
        firstValueFrom(this.marvelService.getUriInfo(x.resourceURI))
      );
      try {
        const responses = await Promise.all(seriesRequests);
        this.arrSeries = responses.map(response => response.data.results[0]);
        this.reordenar(this.arrSeries, 'title');
        this.loadingService.loadingText = '';
      } catch (error) {
        console.error('Error al cargar las series:', error);
        this.loadingService.loadingText = 'Error al cargar las series';
      }
    }
  }

  public async handleEvents() {
    this.loadingService.loadingText = 'Cargando eventos relacionados con ' + this.character?.name;
    this.events = this.character.events.items;
  
    if (this.arrEvents.length === 0) {
      // Creamos un array de promesas para obtener los eventos
      const eventRequests = this.events.map((x: { resourceURI: string }) =>
        firstValueFrom(this.marvelService.getUriInfo(x.resourceURI))
      );
      try {
        const responses = await Promise.all(eventRequests);
        this.arrEvents = responses.map(response => response.data.results[0]);
        this.reordenar(this.arrEvents, 'title');
        this.loadingService.loadingText = '';
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
        this.loadingService.loadingText = 'Error al cargar los eventos';
      }
    }
  }

  public formatDate(dateString:string) {
    const date = new Date(dateString); 
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  }

  public ordenar(arr:any ,campo:string, seccion:string){
    const key = campo;
    if(campo === 'date'){
      this.toggleDate = !this.toggleDate;
    }
    if(campo === 'title'){
      if(!this.toggleOrder[seccion]){
        this.reordenar(arr, 'title');
      }else{
        this.reordenar(arr, 'title', true);
      }
      this.toggleOrder[seccion] = !this.toggleOrder[seccion];
    }
  }

  public reordenar(arr: any[], campo: string, ordenInvertido: boolean = false) {
    arr.sort((a: any, b: any) => {
      const valorA = a[campo]?.toLowerCase() || ''; 
      const valorB = b[campo]?.toLowerCase() || '';
      return ordenInvertido
        ? valorB.localeCompare(valorA) 
        : valorA.localeCompare(valorB); 
    });
  }

  public filtro(e:any, arr:any, campo:string){
    let input = e.target.value.toLowerCase();
    arr.forEach( (x:any) => {
      if(x[campo].toLowerCase().includes(input)){
        x.visible = true;
      }else{
        x.visible = false;
      }
    });
    console.log(arr);
  }
  
}
