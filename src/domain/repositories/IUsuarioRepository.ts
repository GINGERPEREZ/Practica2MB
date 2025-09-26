import { ActualizarUsuarioData } from "../../presentation/dto/usuario/actualizar_usuario_dto";
import { CrearUsuarioData } from "../../presentation/dto/usuario/crear_usuario_dto";
import { UsuarioEntity, Rol, Usuario } from "../entities/Usuario";

export interface IUsuarioRepository {
  // CREATE - Usando Callbacks (error, resultado)
  crear(
    data: CrearUsuarioData,
    callback: (error: Error | null, resultado: Usuario | null) => void
  ): void;

  // UPDATE - Retornando Promise<Usuario>
  actualizar(id: string, data: ActualizarUsuarioData): Promise<Usuario>;

  // READ - Async functions retornando Promise
  obtenerPorId(id: string): Promise<Usuario | null>;
  obtenerTodosActivos(): Promise<Usuario[]>;

  // DELETE - Async function retornando Promise<boolean>
  eliminar(id: string, eliminacionFisica?: boolean): Promise<boolean>;
}
