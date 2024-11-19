import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriasComponent } from './componentes/historias/historias.component';
import { CreadoresComponent } from './componentes/creadores/creadores.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { SeriesComponent } from './componentes/series/series.component';
import { ComicsComponent } from './componentes/comics/comics.component';
import { ComicComponent } from './componentes/comics/comic/comic.component';
import { PersonajesComponent } from './componentes/personajes/personajes.component';
import { PersonajeComponent } from './componentes/personajes/personaje/personaje.component';

export const routes: Routes = [
    { path: 'personajes',  component: PersonajesComponent},
    { path: 'personajes/:id',  component: PersonajeComponent},
    { path: 'comics', component: ComicsComponent },
    { path: 'comics/:id',  component: ComicComponent},
    { path: 'creadores', component: CreadoresComponent },
    { path: 'eventos', component:  EventosComponent},
    { path: 'series', component:  SeriesComponent},
    { path: 'historias', component: HistoriasComponent },
    { path: '**', component: PersonajesComponent },
    { path: '', pathMatch: "prefix", redirectTo: 'personajes' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
