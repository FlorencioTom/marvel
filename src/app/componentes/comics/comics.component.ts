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
  selector: 'app-comics',
  standalone: true,
  imports: [SpinnerModule, MatPaginatorModule, CommonModule, PaginatorModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss'
})
export class ComicsComponent {

  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;


  comics: any[] = []; // Aquí puedes almacenar los personajes
  currentPageIndex: number = 0;
  rows: number = 20;
  loadingText: string = this.loadingService.loadingText;
  name: string = '';
  searchByName: boolean = false;
  total: any;
  id: any;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando comics';
    });
    this.marvelService.getComics(this.currentPageIndex, this.rows).subscribe({
      next: response => {
        this.comics = response.data.results;
        this.total = response.data.total;
      },
      error: error => {
        if(error.status === 429){
          this.router.navigate(['/limite']);
        }
      }
    });
  }

  changePage(event: any){
    this.currentPageIndex = event.page;
    //console.log(this.currentPageIndex);
    if(this.searchByName){
      this.searchComicByName(event.page);
    }else{
      this.marvelService.getComics(this.currentPageIndex, this.rows).subscribe(response => {
        this.comics = response.data.results;
        this.searchByName = false;
      });
    }
  }

  searchComicByName(page: number){
      this.marvelService.getComicsByTitle(page, this.rows, this.name).subscribe(response => {
        this.comics = response.data.results;
      });
  }
 
  firstCall(){
    if(this.name === ''){
      this.backToAllComics();
    }else{
      this.currentPageIndex = 0;
      this.searchByName = true;
      this.marvelService.getComicsByTitle(this.currentPageIndex, this.rows, this.name).subscribe(response => {
        this.comics = response.data.results;
      });
    }
  }

  backToAllComics(){
    this.searchByName = false;
    this.currentPageIndex = 0;
    this.marvelService.getComics(this.currentPageIndex, this.rows).subscribe(response => {
      this.comics = response.data.results;
      this.searchByName = false;
    });
  }

  goToComic(id: number): void {
    this.router.navigate(['/comics', id]);
  }
} 
 