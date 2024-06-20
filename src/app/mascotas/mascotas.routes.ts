import { Routes } from '@angular/router';
import { MascotasListComponent } from './mascotas-list/mascotas-list.component';
import { MascotasDetailComponent } from './mascotas-detail/mascotas-detail.component';
import { MascotaFormComponent } from './mascota-form/mascota-form.component';


export const MASCOTAS_ROUTES: Routes = [
    { path: '', component: MascotasListComponent },
    { path: 'agregar', component: MascotaFormComponent },
    { path: 'agregar/:id_mascota', component: MascotaFormComponent },
    { path: ':id_mascota', component: MascotasDetailComponent },
    
];