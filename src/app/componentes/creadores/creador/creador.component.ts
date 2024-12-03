import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../../servicios/marvel.service';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common'; 
import { LoadingService } from '../../../servicios/texto-spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creador',
  standalone: true,
  imports: [DropdownModule, FloatLabelModule, CommonModule],
  templateUrl: './creador.component.html',
  styleUrl: './creador.component.scss'
})
export class CreadorComponent {

  public loadingService = inject(LoadingService);

  constructor(private route: ActivatedRoute, private marvelService: MarvelService, private router: Router) {}

  id!: any; 
  characters: any;
  comics: any = [];
  series: any = [];
  stories: any = [];
  events: any = [];
  creators: any = [];
  error:boolean = false;
  creador: any = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.marvelService.getCreatorById(this.id).subscribe(
      response => {
        console.log(response.data.results);
        this.creador = response.data.results[0];
        this.comics = this.creador.comics.items;
        this.series = this.creador.series.items;
        this.stories = this.creador.stories.items;
        this.events = this.creador.events.items;
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