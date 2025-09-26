import { Rol } from "../../../domain/entities/Usuario";

export interface ActualizarUsuarioData {
  nombre?: string;
  email?: string;
  rol?: Rol;
  activo?: boolean;
}