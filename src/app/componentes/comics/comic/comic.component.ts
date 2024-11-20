import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../../servicios/marvel.service';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common'; 
import { LoadingService } from '../../../servicios/texto-spinner.service';

@Component({
  selector: 'app-comic',
  standalone: true,
  imports: [DropdownModule, FloatLabelModule, CommonModule],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.scss'
})
export class ComicComponent {

  public loadingService = inject(LoadingService);

  constructor(private route: ActivatedRoute, private marvelService: MarvelService) {}

  id!: any; 
  characters: any;
  comic: any = [];
  series: any = [];
  stories: any = [];
  events: any = [];
  creators: any = [];
  error:boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.marvelService.getComicById(this.id).subscribe(
      response => {
        console.log(response.data.results);
        this.comic = response.data.results[0];

        this.characters = this.comic.characters.items;
        this.series = this.comic.series;
        this.stories = this.comic.stories.items;
        this.events = this.comic.events.items;
        this.creators = this.comic.creators.items;
      }, error => {
        //console.error('Error fetching character:');
        this.error = true;
    })
  }
}
