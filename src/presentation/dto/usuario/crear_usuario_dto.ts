import { Rol } from "../../../domain/entities/Usuario";

export interface CrearUsuarioData {
    nombre: string;
    email: string;
    rol: Rol;
  }
  