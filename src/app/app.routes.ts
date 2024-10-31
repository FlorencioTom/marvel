import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriasComponent } from './componentes/historias/historias.component';
import { CreadoresComponent } from './componentes/creadores/creadores.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { SeriesComponent } from './componentes/series/series.component';
import { ComicsComponent } from './componentes/comics/comics.component';
import { PersonajesComponent } from './componentes/personajes/personajes.component';

export const routes: Routes = [
    { path: 'personajes',  component: PersonajesComponent},
    { path: 'comics', component: ComicsComponent },
    { path: 'creadores', component: CreadoresComponent },
    { path: 'eventos', component:  EventosComponent},
    { path: 'series', component:  SeriesComponent},
    { path: 'historias', component: HistoriasComponent },
    { path: '', pathMatch: "prefix", redirectTo: 'comics' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
