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
  selector: 'app-creadores',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent, MatPaginatorModule, CommonModule, PaginatorModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './creadores.component.html',
  styleUrl: './creadores.component.scss'
})
export class CreadoresComponent {

  private marvelService = inject(MarvelService);
  public loadingService = inject(LoadingService);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  creators: any[] = []; 
  currentPageIndex: number = 0;
  rows: number = 20;
  loadingText: string = this.loadingService.loadingText;
  name: string = '';
  searchByName: boolean = false;
  total: any;
  id: any;

  constructor(private router: Router) {}

  ngOnInit(){
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando creadores';
    });
    this.marvelService.getCreators(this.currentPageIndex, this.rows).subscribe(response => {
      this.creators = response.data.results;
      this.total = response.data.total;
      console.log(this.creators);
    });
  }

  changePage(event: any){
    this.currentPageIndex = event.page;
    console.log(this.currentPageIndex);
    if(this.searchByName){
      this.searchCreatorByName(event.page);
    }else{
      this.marvelService.getCreators(this.currentPageIndex, this.rows).subscribe(response => {
        this.creators = response.data.results;
        this.searchByName = false;
      });
    }
  }

  searchCreatorByName(page: number){
    this.marvelService.getCreatorsByName(page, this.rows, this.name).subscribe(response => {
      this.creators = response.data.results;
    });
  }

  firstCall(){
    if(this.name === ''){
      this.backToAllCreators();
    }else{
      this.currentPageIndex = 0;
      this.searchByName = true;
      this.marvelService.getCreatorsByName(this.currentPageIndex, this.rows, this.name).subscribe(response => {
        this.creators = response.data.results;
      });
    }
  }

  backToAllCreators(){
    this.searchByName = false;
    this.currentPageIndex = 0;
    this.marvelService.getCreators(this.currentPageIndex, this.rows).subscribe(response => {
      this.creators = response.data.results;
      this.searchByName = false;
    });
  }

  goToCreator(id: number): void {
    this.router.navigate(['/creadores', id]);
  }
} 