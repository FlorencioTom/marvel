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
  selector: 'app-eventos',
  standalone: true,
  imports: [SpinnerModule, MatPaginatorModule, CommonModule, PaginatorModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  events: any[] = []; // Aquí puedes almacenar los personajes
  currentPageIndex: number = 0;
  rows: number = 20;
  loadingText: string = this.loadingService.loadingText;
  name: string = '';
  searchByName: boolean = false;
  total: any;

  constructor(private router: Router) {}
  ngOnInit(){
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando Eventos';
    });
    this.marvelService.getEvents(this.currentPageIndex, this.rows).subscribe({
      next: response => {
        this.events = response.data.results;
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
    console.log(this.currentPageIndex);
    if(this.searchByName){
      this.searchEventsByName(event.page);
    }else{
      this.marvelService.getEvents(this.currentPageIndex, this.rows).subscribe(response => {
        this.events = response.data.results;
        this.searchByName = false;
      });
    }
  }

  searchEventsByName(page: number){
      this.marvelService.getEventsByName(page, this.rows, this.name).subscribe(response => {
        this.events = response.data.results;
      });
  }

  firstCall(){
    if(this.name === ''){
      this.backToAllCharacters();
    }else{
      this.currentPageIndex = 0;
      this.searchByName = true;
      this.marvelService.getEventsByName(this.currentPageIndex, this.rows, this.name).subscribe(response => {
        this.events = response.data.results;
      });
    }
  }

  backToAllCharacters(){
    this.searchByName = false;
    this.currentPageIndex = 0;
    this.marvelService.getEvents(this.currentPageIndex, this.rows).subscribe(response => {
      this.events = response.data.results;
      this.searchByName = false;
    });
  }

  goToEvent(id: number): void {
    this.router.navigate(['/eventos', id]);
  }

} 