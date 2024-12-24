import { Component, inject } from '@angular/core';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { ViewChild, ElementRef, OnInit } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
@Component({
  selector: 'app-series',
  standalone: true,
  imports: [SpinnerModule, MatPaginatorModule, CommonModule, PaginatorModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent {
  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  series: any[] = []; // Aquí puedes almacenar los personajes
  currentPageIndex: number = 0;
  rows: number = 20;
  loadingText: string = this.loadingService.loadingText;
  name: string = '';
  searchByName: boolean = false;
  total: any;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando series';
    });
    this.marvelService.getSeries(this.currentPageIndex, this.rows).subscribe({
      next: response => {
        this.series = response.data.results;
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
      this.searchSeriesByName(event.page);
    }else{
      this.marvelService.getSeries(this.currentPageIndex, this.rows).subscribe(response => {
        this.series = response.data.results;
        this.searchByName = false;
      });
    }
  }

  searchSeriesByName(page: number){
    this.marvelService.getSeriesByName(page, this.rows, this.name).subscribe(response => {
      console.log(response);
      this.series = response.data.results;
    });
  }

  firstCall(){
    if(this.name === ''){
      this.backToAllSeries();
    }else{
      this.currentPageIndex = 0;
      this.searchByName = true;
      this.marvelService.getSeriesByName(this.currentPageIndex, this.rows, this.name).subscribe(response => {
        this.series = response.data.results;
      });
    }
  }

  backToAllSeries(){
    this.searchByName = false;
    this.currentPageIndex = 0;
    this.marvelService.getSeries(this.currentPageIndex, this.rows).subscribe(response => {
      this.series = response.data.results;
      this.searchByName = false;
    });
  }

  goToSerie(id: number): void {
    this.router.navigate(['/series', id]);
  }

} 