import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atras',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './atras.component.html',
  styleUrl: './atras.component.scss'
})
export class AtrasComponent {

  @Input() pagN:number | null = null;
  @Input() filter:string | null = null;
  @Input() pag:string | null = null;

  constructor(private router: Router) {}

  goBack(){
    console.log(this.pagN, this.filter, this.pag);
    this.router.navigate([`/${this.pag}`]);
  }

}
