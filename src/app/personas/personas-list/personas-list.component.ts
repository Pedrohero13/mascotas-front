import { Component, inject } from '@angular/core';
import { Personas } from '../../core/models/personas';
import { PersonasService } from '../../core/services/personas.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personas-list.component.html',
  styleUrl: './personas-list.component.css'
})
export class PersonasListComponent {
  personas?: Personas[];
  private readonly _personasService = inject(PersonasService)
  private readonly _router = inject(Router)

  ngOnInit(): void {
    if(!this.personas){
      this._personasService.obtenerPersonas().subscribe((response: Personas[]) =>{ 
        this.personas=response;
      });
    }
    
  }

  eliminar (id_persona: number){
    Swal.fire({
      title: "Estas seguro que deseas eliminar la persona?",
      text: "Esto no se podrá revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._personasService.eliminarPersona(id_persona).subscribe((response:any)=>{
          Swal.fire({
            title: "Borrado!",
            text: response.mensaje,
            icon: "success"
          }).then((result)=>{
            this._router.navigate(["/"]).then(()=>{
              this._router.navigate (["/personas"])
            });
          });
        })
       
      }
    });
    
  }
  navegateForm(){
    this._router.navigate(["/personas/agregar"])
  }

}
