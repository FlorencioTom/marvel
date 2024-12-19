import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [SpinnerModule, MatPaginatorModule, CommonModule, PaginatorModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './historias.component.html',
  styleUrl: './historias.component.scss'
})
export class HistoriasComponent implements OnInit {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  stories: any[] = []; // Aquí puedes almacenar los personajes
  currentPageIndex: number = 0;
  rows: number = 20;
  loadingText: string = this.loadingService.loadingText;
  name: string = '';
  searchByName: boolean = false;
  total: any;

  constructor(private router: Router) {}
  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando historias';
    });
    this.marvelService.getStories(this.currentPageIndex, this.rows).subscribe(response => {
      this.stories = response.data.results;
      this.total = response.data.total;

      this.stories.forEach( x => {
        this.marvelService.getUriInfo(x.resourceURI).subscribe(response => {
          //console.log(response.data.results);
        });
      })
      //console.log(this.stories);
      /*this.characters.forEach(x => {
        if(x.thumbnail.path.includes('not_available')){
          x.thumbnail.path = 'https://placehold.co/729x729?text=Sorry,+we+have+no+image+of+this+hero'
        }
      })*/
    });
    
  }

  changePage(event: any){
    this.currentPageIndex = event.page;
    console.log(this.currentPageIndex);
    if(this.searchByName){
      this.searchStoriesByName(event.page);
    }else{
      this.marvelService.getStories(this.currentPageIndex, this.rows).subscribe(response => {
        this.stories = response.data.results;
        this.searchByName = false;
      });
    }
  }

  searchStoriesByName(page: number){
    this.marvelService.getStoriesByName(page, this.rows, this.name).subscribe(response => {
      this.stories = response.data.results;
    });
  }

  firstCall(){
    if(this.name === ''){
      this.backToAllStories();
    }else{
      this.currentPageIndex = 0;
      this.searchByName = true;
      this.marvelService.getCharactersByName(this.currentPageIndex, this.rows, this.name).subscribe(response => {
        this.stories = response.data.results;
      });
    }
  }

  backToAllStories(){
    this.searchByName = false;
    this.currentPageIndex = 0;
    this.marvelService.getStories(this.currentPageIndex, this.rows).subscribe(response => {
      this.stories = response.data.results;
      this.searchByName = false;
    });
  }

  goToStorie(id: number): void {
    this.router.navigate(['/personajes', id]);
  }

} 