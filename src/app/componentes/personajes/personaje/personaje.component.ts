import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AtrasComponent } from '../../atras/atras.component';
import { AtrasService } from '../../../servicios/atras.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personaje',
  standalone: true,
  imports: [DropdownModule, FloatLabelModule, CommonModule, MatProgressSpinnerModule,
    MatRippleModule, MatButtonToggleModule, MatIconModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatButtonModule, AtrasComponent],
  templateUrl: './personaje.component.html',
  /*styleUrl: './personaje.component.scss',*/
    animations: [
      trigger('slideFade', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }), 
          animate('300ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          animate('500ms ease', style({ transform: 'translateX(100%)', opacity: 0 })) 
        ])
      ]),
    ]
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
  loadingComics: boolean = true;
  loadingSeries: boolean = true;
  loadingEvents: boolean = true;
  showScrollTop: boolean = false;
  threshold: number = 100;
  atras:any = [];
  public toggleOrder: { [key: string]: boolean } = {
    comics: true, // Para los cómics
    series: true, // Para las series
    events: true  // Para los eventos (si es necesario)
  };

  constructor(private route: ActivatedRoute, private marvelService: MarvelService, private router: Router, private location: Location) {}

  public loadingService = inject(LoadingService);
  public atrasService = inject(AtrasService);
  private _snackBar = inject(MatSnackBar);
  @ViewChild('charactercontainer', { static: false }) scrollContainer!: ElementRef<any>;

  ngAfterViewInit() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.addEventListener('scroll', () => this.checkScrollPosition());
    }
  }

  ngOnDestroy() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.removeEventListener('scroll', this.checkScrollPosition);
    }
  }

  scrollToTop() {
    this.scrollContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  checkScrollPosition() {
    const scrollTop = this.scrollContainer.nativeElement.scrollTop;
    this.showScrollTop = scrollTop > this.threshold;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.marvelService.getCharacterById(this.id).subscribe(
      response => {
        this.character = response.data.results[0];
        //console.log(this.character);
        this.stories = this.character.stories.items;
        this.character.modified = this.formatDate(this.character.modified);
      }, error => {
        this.error = true;
    })
    this.atras = [this.atrasService.pageNum, this.atrasService.filterText, this.atrasService.pageTitle];
    //console.log([this.atrasService.pageNum, this.atrasService.filterText, this.atrasService.pageTitle]);
 
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
      } finally {
        this.loadingComics = false;
        if(this.arrComics.length === 0){
          this._snackBar.open('La api de marvel no da comics para este personaje', 'OK', {
            duration: 3000
          });
        } 
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
      } finally {
        this.loadingSeries = false; 
        if(this.arrSeries.length === 0){
          this._snackBar.open('La api de marvel no da series para este personaje', 'OK', {
            duration: 3000
          });
        } 
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
      } finally {
        this.loadingEvents = false; 
        if(this.arrEvents.length === 0){
          this._snackBar.open('La api de marvel no da eventos para este personaje', 'OK', {
            duration: 3000
          });
        } 
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
    //console.log(arr);
  }

  public goToUri(uri:string){
    const id = uri.substring(uri.lastIndexOf("/") + 1);
    switch (true) {
      case uri.includes('public/comics'):
        this.router.navigate(['/comics', id]);
        break;
      case uri.includes('public/series'):
        this.router.navigate(['/series', id]);
        break;
      case uri.includes('public/events'):
        this.router.navigate(['/eventos', id]);
        break;
      default:
        //console.log('No coincide con ningún caso');
    }
  }

  goBack(buscador?: string, pagina?:number){
    //Este metodo te lleva a la pagina anterior. 
    //con el nombre del puscador y con su pagina
    this.location.back();
  }
  
}
