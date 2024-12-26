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
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { AtrasService } from '../../servicios/atras.service';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [SpinnerModule, MatPaginatorModule, CommonModule, PaginatorModule, IconFieldModule, InputIconModule, InputTextModule, MatButtonModule, MatIconModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.scss'
})

export class PersonajesComponent implements OnInit {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);
  public atrasService = inject(AtrasService);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  characters: any[] = []; 
  currentPageIndex: number = 0;
  rows: number = 20;
  loadingText: string = this.loadingService.loadingText;
  name: string = '';
  searchByName: boolean = false;
  total: any;
  pageInput: string = '';
  nameSearch: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando personajes';
    });
    if(this.atrasService.filterText != null && this.atrasService.filterText != ''){
      this.currentPageIndex = 0;
      this.searchByName = true;
      this.marvelService.getCharactersByName(this.currentPageIndex, this.rows, this.atrasService.filterText).subscribe(response => {
        this.characters = response.data.results;
        this.total = response.data.total;
        this.nameSearch = true;
      });
      this.name = this.atrasService.filterText;
    }else if(this.atrasService.pageNum != null){
      const simulatedEvent = { page: this.atrasService.pageNum };
      this.total = this.atrasService.totalPages;
      this.atrasService.filterText = '';
      this.changePage(simulatedEvent);      
    }else{
      this.marvelService.getCharacters(this.currentPageIndex, this.rows).subscribe({
        next: response => {
          this.characters = response.data.results;
          this.total = response.data.total;
        },
        error: error => {
          if(error.status === 429){
            this.router.navigate(['/limite']);
          }
        }
      });
    }
  }

  changePage(event: any){
    this.currentPageIndex = event.page;
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
      this.nameSearch = false;
      this.backToAllCharacters();
      
    }else{
      this.currentPageIndex = 0;
      this.searchByName = true;
      this.marvelService.getCharactersByName(this.currentPageIndex, this.rows, this.name).subscribe(response => {
        this.characters = response.data.results;
        this.total = response.data.total;
        this.nameSearch = true;
      });
    }
  }

  backToAllCharacters(){
    this.atrasService.filterText = '';
    this.name = '';
    this.searchByName = false;
    this.currentPageIndex = 0;
    this.marvelService.getCharacters(this.currentPageIndex, this.rows).subscribe(response => {
      this.characters = response.data.results;
      this.total = response.data.total;
      this.nameSearch = false;
    });

  }

  goToCharcater(id: number): void {
    this.atrasService.setBackInfo(this.currentPageIndex, 'personajes', this.name, this.total);
    this.router.navigate(['/personajes', id]);
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.rows);
  }

  goTo(): void {
    const pageIndex = Number(this.pageInput) - 1;
    if (pageIndex >= 0 && pageIndex < this.totalPages) {
      this.currentPageIndex = pageIndex;
      const firstRecordIndex = pageIndex * this.rows;
      this.marvelService.getCharacters(this.currentPageIndex, this.rows).subscribe(response => {
        this.characters = response.data.results;
        this.searchByName = false;
      });
    } else {
      console.error('Número de página inválido');
    }
  }

} 


 