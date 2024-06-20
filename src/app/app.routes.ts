import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    {
        path:"", 
        component: HomeComponent
    },
    {
        path:"personas", 
        loadChildren: () => import('./personas/personas.routes').then(m => m.PERSONAS_ROUTES)
    },
    {
        path:"mascotas",
        loadChildren: () => import('./mascotas/mascotas.routes').then(m => m.MASCOTAS_ROUTES)
    },
];
