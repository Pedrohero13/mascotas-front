import { Component, Input, OnInit, inject } from '@angular/core';
import { Mascotas } from '../../core/models/mascotas';
import { MascotasService } from '../../core/services/mascotas.service';
import Swal from 'sweetalert2'
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mascotas-list',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './mascotas-list.component.html',
  styleUrl: './mascotas-list.component.css'
})
export class MascotasListComponent implements OnInit{
  @Input() mascotas?: Mascotas[];
  @Input() cliente: boolean= true;
  private readonly _mascotasService = inject(MascotasService)
  private readonly _router = inject(Router)

  ngOnInit(): void {
    if(this.cliente){
      this._mascotasService.obtenerMascotas().subscribe((response: Mascotas[]) =>{
        this.mascotas=response;
      });
    }
    
  }

  eliminar (id_mascota: number){
    Swal.fire({
      title: "Estas seguro que deseas eliminar la mascota?",
      text: "Esto no se podrá revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._mascotasService.eliminarMascota(id_mascota).subscribe((response:any)=>{
          console.log(response);
          Swal.fire({
            title: "Borrado!",
            text: response.mensaje,
            icon: "success"
          }).then((result)=>{
            this._router.navigate(["/"]).then(()=>{
              this._router.navigate (["/mascotas"])
            });
          });
        })
       
      }
    });
    
  }
}
