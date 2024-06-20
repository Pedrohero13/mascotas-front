import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MascotasService } from '../../core/services/mascotas.service';
import { Mascotas } from '../../core/models/mascotas';

@Component({
  selector: 'app-mascotas-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mascotas-detail.component.html',
  styleUrl: './mascotas-detail.component.css'
})
export class MascotasDetailComponent implements OnInit {
  id_mascota?: string;
  mascota?: Mascotas;
  private readonly _router = inject(ActivatedRoute);
  private readonly _mascotasService = inject(MascotasService);
  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.id_mascota = params['id_mascota'];
      if (this.id_mascota){
        const id_num = parseInt(this.id_mascota);
        this._mascotasService.obtenerMascota(id_num).subscribe((response: Mascotas)=>{
          this.mascota=response;
        });
      }
  });
}
}
