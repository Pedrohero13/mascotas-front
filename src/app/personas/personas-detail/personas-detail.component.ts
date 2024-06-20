import { Component, inject } from '@angular/core';
import { Personas } from '../../core/models/personas';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PersonasService } from '../../core/services/personas.service';
import { MascotasListComponent } from '../../mascotas/mascotas-list/mascotas-list.component';
import { Mascotas } from '../../core/models/mascotas';

@Component({
  selector: 'app-personas-detail',
  standalone: true,
  imports: [MascotasListComponent, RouterLink],
  templateUrl: './personas-detail.component.html',
  styleUrl: './personas-detail.component.css'
})
export class PersonasDetailComponent {
  id_persona?: string;
  persona?: Personas ;
  mascotas : Mascotas []=[];
  private readonly _router = inject(ActivatedRoute);
  private readonly _personaService = inject(PersonasService);
  
  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.id_persona = params['id_persona'];
      if (this.id_persona){
        const id_num = parseInt(this.id_persona);
        this._personaService.obtenerPersona(id_num).subscribe((response: Personas)=>{
          this.persona=response;
          this.mascotas= response.mascotas;
        });
      }
  });
}
}
