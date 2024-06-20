import { Component, OnInit, inject,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MascotasService } from '../../core/services/mascotas.service';
import { MascotaDTO, Mascotas } from '../../core/models/mascotas';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-mascota-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mascota-form.component.html',
  styleUrl: './mascota-form.component.css'
})
export class MascotaFormComponent implements OnInit{
  
  nombre?: string;
  fechaNacimiento?:string;
  emailPersona?:string;
  id_mascota?:string
  private readonly _mascotasService = inject(MascotasService);
  private readonly _router = inject(Router);
  private readonly _activedRouter = inject(ActivatedRoute);
  ngOnInit(): void {
    this._activedRouter.params.subscribe(params => {
      this.id_mascota = params['id_mascota'];
      if (this.id_mascota){
        const id_num = parseInt(this.id_mascota);
        this._mascotasService.obtenerMascota(id_num).subscribe((response: Mascotas)=>{
          this.nombre=response.nombre;
          this.fechaNacimiento=response.fechaNacimiento;
        });
      }
  });
  }

  agregarMascota (){
    if(this.nombre&& this.fechaNacimiento && this.emailPersona){
      const mascota: MascotaDTO={
        nombre: this.nombre,
        fechaNacimiento: this.fechaNacimiento,
        emailPersona: this.emailPersona
      }
      if (this.id_mascota?.length==0 || this.id_mascota=== undefined) {
      this._mascotasService.agregarMasctoa(mascota).subscribe((response: Mascotas)=>{
        Swal.fire({
          title: "Mascota Guardada",
          text: "Se a guardado correctamente la mascota " + response.nombre,
          icon: "success"
        }).then(result =>{
          this._router.navigate(["/mascotas"])
        });
      })
    }else {
      if (this.id_mascota)
        this._mascotasService.modificarMascota(parseInt(this.id_mascota), mascota).subscribe((response: Mascotas) => {
          Swal.fire({
            title: "Mascota modificada",
            text: "Se a modificado correctamente la mascota " + response.nombre,
            icon: "success"
          }).then(result =>{
            this._router.navigate(["/mascotas"])
          });
        })
    }
  }
    
  }

}
