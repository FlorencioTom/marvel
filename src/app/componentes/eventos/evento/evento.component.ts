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
  selector: 'app-evento',
  standalone: true,
  imports: [DropdownModule, FloatLabelModule, CommonModule, MatProgressSpinnerModule,
    MatRippleModule, MatButtonToggleModule, MatIconModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatButtonModule, AtrasComponent],
  templateUrl: './evento.component.html',
  // styleUrl: './evento.component.scss',
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
export class EventoComponent {
  id!: any; 
  characters: any = [];
  comics: any = [];
  event: any;
  arrComics: any = [];
  arrSeries: any = [];
  arrCharacters: any = [];
  series: any = [];
  error:boolean = false;
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number = 20;
  color: string = '#d7e3ff85';
  toggleDate: boolean = true;
  comicValue: string = '';
  serieValue: string = '';
  characterValue: string = '';
  loadingComics: boolean = true;
  loadingSeries: boolean = true;
  loadingCharacters: boolean = true;
  showScrollTop: boolean = false;
  threshold: number = 100;
  atras:any = [];
  public toggleOrder: { [key: string]: boolean } = {
    comics: true, // Para los cómics
    series: true, // Para las series
    characters: true  // Para los eventos (si es necesario)
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
    this.marvelService.getEventsById(this.id).subscribe(
      response => {
        this.event = response.data.results[0];
        console.log(this.event);
        this.event.modified = this.formatDate(this.event.modified);
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

  get isCharacterEmpty(): boolean {
    return this.arrCharacters.length === 0;
  }

  public getUriResults(){
    this.marvelService.getUriInfo(this.event.comics.collectionURI);
  }

  public async handleComics() {
    this.loadingService.loadingText = 'Cargando comics relacionados con ' + this.event?.title;
    this.comics = this.event.comics.items;
  
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
          this._snackBar.open('La api de marvel no da comics para este evento', 'OK', {
            duration: 3000
          });
        } 
      }
    }
  }

  public async handleSeries() {
    this.loadingService.loadingText = 'Cargando series relacionadas con ' + this.event?.title;
    this.series = this.event.series.items;
  
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
          this._snackBar.open('La api de marvel no da series para este evento', 'OK', {
            duration: 3000
          });
        } 
      }
    }
  }

  public async handleCharacters() {
    this.loadingService.loadingText = 'Cargando personajes relacionados con ' + this.event?.title;
    this.characters = this.event.characters.items;
    //console.log(this.characters);
    if (this.arrCharacters.length === 0) {
      const charactersRequests = this.characters.map((x: { resourceURI: string }) =>
        firstValueFrom(this.marvelService.getUriInfo(x.resourceURI))
      );
      try {
        const responses = await Promise.all(charactersRequests);
        this.arrCharacters = responses.map(response => response.data.results[0]);
        this.reordenar(this.arrCharacters, 'name');
        this.loadingService.loadingText = '';
      } catch (error) {
        console.error('Error al cargar los personajes:', error);
        this.loadingService.loadingText = 'Error al cargar los personajes';
      } finally {
        this.loadingCharacters = false; 
        if(this.arrCharacters.length === 0){
          this._snackBar.open('La api de marvel no da personajes para este comic', 'OK', {
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
    if(campo === 'name'){
      if(!this.toggleOrder[seccion]){
        this.reordenar(arr, 'name');
      }else{
        this.reordenar(arr, 'name', true);
      }
      this.toggleOrder[seccion] = !this.toggleOrder[seccion];
    }
    if(campo === 'fullName'){
      if(!this.toggleOrder[seccion]){
        this.reordenar(arr, 'fullName');
      }else{
        this.reordenar(arr, 'fullName', true);
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
      case uri.includes('public/characters'):
        this.router.navigate(['/personajes', id]);
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