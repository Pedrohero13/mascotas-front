import { Mascotas } from "./mascotas";

export interface Personas {
    id_persona: number,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    fechaNacimiento: string,
    direccion: string,
    telefono: string,
    email: string,
    mascotas: Mascotas []
}

export interface PersonasDTO {
   
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    fechaNacimiento: string,
    direccion: string,
    telefono: string,
    email: string,
}
