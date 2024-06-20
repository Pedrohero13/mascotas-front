import { Routes } from '@angular/router';
import { PersonasListComponent } from './personas-list/personas-list.component';
import { PersonasDetailComponent } from './personas-detail/personas-detail.component';
import { PersonasFromComponent } from './personas-from/personas-from.component';



export const PERSONAS_ROUTES: Routes = [
    { path: '', component: PersonasListComponent },
    { path: 'agregar', component: PersonasFromComponent },
    { path: 'agregar/:id_persona', component: PersonasFromComponent },
    { path: ':id_persona', component: PersonasDetailComponent }
];