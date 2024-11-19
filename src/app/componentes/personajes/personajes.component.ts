import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent, MatPaginatorModule, CommonModule, PaginatorModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.scss'
})
export class PersonajesComponent implements OnInit {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  characters: any[] = []; // Aquí puedes almacenar los personajes
  currentPageIndex: number = 0;
  rows: number = 20;
  loadingText: string = this.loadingService.loadingText;
  name: string = '';
  searchByName: boolean = false;
  total: any;

  constructor(private router: Router) {}
  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando personajes';
    });
    this.marvelService.getCharacters(this.currentPageIndex, this.rows).subscribe(response => {
      this.characters = response.data.results;
      this.total = response.data.total;
      console.log(this.characters);
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
      this.searCharacterByName(event.page);
    }else{
      this.marvelService.getCharacters(this.currentPageIndex, this.rows).subscribe(response => {
        this.characters = response.data.results;
        this.searchByName = false;
      });
    }
  }

  searCharacterByName(page: number){
      this.marvelService.getCharactersByName(page, this.rows, this.name).subscribe(response => {
        this.characters = response.data.results;
      });
  }

  firstCall(){
    if(this.name === ''){
      this.backToAllCharacters();
    }else{
      this.currentPageIndex = 0;
      this.searchByName = true;
      this.marvelService.getCharactersByName(this.currentPageIndex, this.rows, this.name).subscribe(response => {
        this.characters = response.data.results;
      });
    }
  }

  backToAllCharacters(){
    this.searchByName = false;
    this.currentPageIndex = 0;
    this.marvelService.getCharacters(this.currentPageIndex, this.rows).subscribe(response => {
      this.characters = response.data.results;
      this.searchByName = false;
    });
  }

  goToCharcater(id: number): void {
    this.router.navigate(['/personajes', id]);
  }

} 

/**Si la pagina actual tiene mesnos de 20 personajes desabilitar siguientes paginas */
 