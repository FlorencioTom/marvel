import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../../servicios/marvel.service';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common'; 
import { LoadingService } from '../../../servicios/texto-spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serie',
  standalone: true,
  imports: [DropdownModule, FloatLabelModule, CommonModule],
  templateUrl: './serie.component.html',
  styleUrl: './serie.component.scss'
})
export class SerieComponent {

  public loadingService = inject(LoadingService);

  constructor(private route: ActivatedRoute, private marvelService: MarvelService, private router: Router) {}

  id!: any; 
  characters: any = [];
  comics: any = [];
  series: any = [];
  stories: any = [];
  events: any = [];
  creators: any = [];
  serie: any = [];
  error:boolean = false;
  creador: any = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.marvelService.getSeriesById(this.id).subscribe(
      response => {
        this.serie = response.data.results[0];
        this.comics = this.serie.comics.items;
        this.stories = this.serie.stories.items;
        this.events = this.serie.events.items;
        this.creators = this.serie.creators.items;
        this.characters = this.serie.characters.items;
        console.log(response.data.results, this.creators.length);
      }, error => {
        //console.error('Error fetching character:');
        this.error = true;
    })
  }

  goToCharacter(uri: string){ 
    const id = uri.substring(uri.lastIndexOf("/") + 1);
    this.router.navigate(['/personajes', id]);
  }
}