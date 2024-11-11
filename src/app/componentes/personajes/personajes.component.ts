import { Component, inject, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { MarvelService } from '../../servicios/marvel.service';
import { MatPaginatorModule, PageEvent, MatPaginator} from '@angular/material/paginator';
import { LoadingService } from '../../servicios/texto-spinner.service';
import { SpinnerModule } from '../../spinner.module';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { PaginatorModule } from 'primeng/paginator';
import SimpleBar from 'simplebar'; // Importa SimpleBar

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [SpinnerModule, NgxSpinnerComponent, MatPaginatorModule, CommonModule, PaginatorModule],
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

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.loadingText = 'Cargando personajes';
    });
    this.marvelService.getCharacters(this.currentPageIndex, this.rows).subscribe(response => {
      this.characters = response.data.results;
    });
  }

  changePage(event: any){
    this.currentPageIndex = event.page;
    console.log(this.currentPageIndex);
    this.marvelService.getCharacters(this.currentPageIndex, this.rows).subscribe(response => {
      this.characters = response.data.results;
    });
  }
} 
 