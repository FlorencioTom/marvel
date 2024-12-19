import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../../servicios/marvel.service';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-personaje',
  standalone: true,
  imports: [DropdownModule, FloatLabelModule, CommonModule],
  templateUrl: './personaje.component.html',
  styleUrl: './personaje.component.scss'
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

  constructor(private route: ActivatedRoute, private marvelService: MarvelService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.marvelService.getCharacterById(this.id).subscribe(
      response => {
        this.character = response.data.results[0];
        this.handleComics();
        this.handleSeries();
        this.handleEvents();
        // this.handleStories();
        this.stories = this.character.stories.items;

        this.character.modified = this.formatDate(this.character.modified);
      }, error => {
        //console.error('Error fetching character:');
        this.error = true;
    })
  }

  public getUriResults(){
    this.marvelService.getUriInfo(this.character.comics.collectionURI).subscribe( response => {
      console.log(response);
    });
  }

  public handleComics(){
    this.comics = this.character.comics.items;
    this.comics.forEach( (x: { resourceURI: string; }) => {
      this.marvelService.getUriInfo(x.resourceURI).subscribe(response => {
        this.arrComics.push(response.data.results[0]);
      });
    })     
  }

  public handleSeries(){
    this.series = this.character.series.items;
    this.series.forEach( (x: { resourceURI: string; }) => {
      this.marvelService.getUriInfo(x.resourceURI).subscribe(response => {
        this.arrSeries.push(response.data.results[0]);
      });
    }); 
  }

  public handleEvents(){
    this.events = this.character.events.items;
    this.events.forEach( (x: { resourceURI: string; }) => {
      this.marvelService.getUriInfo(x.resourceURI).subscribe(response => {
        this.arrEvents.push(response.data.results[0]);
      });
    });
  }

  // public handleStories(){
  //   this.stories = this.character.stories.items;
  //   //console.log(this.stories);
  //   this.stories.forEach( (x: { resourceURI: string; }) => {
  //     console.log(x.resourceURI);
  //     this.marvelService.getUriInfo(x.resourceURI).subscribe(response => {
  //       console.log(response.data.results[0]);
  //       this.arrStories.push(response.data.results[0]);
  //     });
  //   }); 
    
  //   //console.log(this.arrStories);
  // }

  public formatDate(dateString:string) {
    const date = new Date(dateString); 
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  }

  public ordenar(){

  }

  public filtrar(){

  }

  
}
