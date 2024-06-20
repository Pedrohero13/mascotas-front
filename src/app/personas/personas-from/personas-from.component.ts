import { Component, inject } from '@angular/core';
import { Personas, PersonasDTO } from '../../core/models/personas';
import { PersonasService } from '../../core/services/personas.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personas-from',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './personas-from.component.html',
  styleUrl: './personas-from.component.css'
})
export class PersonasFromComponent {
  nombre?: string
  apellidoPaterno?: string
  apellidoMaterno?: string
  email?: string
  direccion?: string
  telefono?: string
  fechaNacimiento?: string
  id_persona?: string

  private readonly _personaService = inject(PersonasService);
  private readonly _activedRouter = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this._activedRouter.params.subscribe(params => {
      this.id_persona = params['id_persona'];
      if (this.id_persona) {
        const id_num = parseInt(this.id_persona);
        this._personaService.obtenerPersona(id_num).subscribe((response: Personas) => {
          this.nombre = response.nombre;
          this.apellidoPaterno = response.apellidoPaterno;
          this.apellidoMaterno = response.apellidoMaterno;
          this.email = response.email;
          this.direccion = response.direccion;
          this.telefono = response.telefono;
          this.fechaNacimiento = response.fechaNacimiento;
        });
      }
    });
  }
  agregarPersona() {
    if (this.nombre && this.apellidoPaterno && this.apellidoMaterno && this.email && this.direccion && this.telefono && this.fechaNacimiento) {
      const personaPersis: PersonasDTO = {
        nombre: this.nombre,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno,
        email: this.email,
        direccion: this.direccion,
        telefono: this.telefono,
        fechaNacimiento: this.fechaNacimiento,

      }
      if (this.id_persona?.length==0 || this.id_persona=== undefined) {
        this._personaService.agregarPersona(personaPersis).subscribe((response: Personas) => {
          Swal.fire({
            title: "Cliente Guardado",
            text: "Se a guardado correctamente el cliente " + response.nombre,
            icon: "success"
          }).then(result =>{
            this._router.navigate(["/personas"])
          });
        })
      } else {
        if (this.id_persona)
          this._personaService.modificarPersona(parseInt(this.id_persona), personaPersis).subscribe((response: Personas) => {
            Swal.fire({
              title: "Cliente modificado",
              text: "Se a modificado correctamente el cliente " + response.id_persona,
              icon: "success"
            }).then(result =>{
              this._router.navigate(["/personas"])
            });
          })
      }

    }

  }

}

