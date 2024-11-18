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
  series: any = [];
  stories: any = [];
  events: any = [];

  constructor(private route: ActivatedRoute, private marvelService: MarvelService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.marvelService.getCharacterById(this.id).subscribe(response => {
      this.character = response.data.results[0];
      console.log(this.character);
      console.log(this.character.comics.collectionURI);
      this.comics = this.character.comics.items; 
      this.series = this.character.series.items;
      this.stories = this.character.stories.items;
      this.events = this.character.events.items;
      this.character.modified = this.formatDate(this.character.modified);
    })
  }

  public getUriResults(){
    this.marvelService.getUriInfo(this.character.comics.collectionURI).subscribe( response => {
      console.log(response);
    });
  }

  public formatDate(dateString:string) {
    const date = new Date(dateString); // Convierte la cadena de fecha a un objeto Date
    const year = date.getFullYear(); // Año (aaaa)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (mm) (sumamos 1 porque los meses en JS comienzan en 0)
    const day = String(date.getDate()).padStart(2, '0'); // Día (dd)

    return `${year}/${month}/${day}`; // Devuelve en el formato aaaa/mm/dd
  }

  
}
