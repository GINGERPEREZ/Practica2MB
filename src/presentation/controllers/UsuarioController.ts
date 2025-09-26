import { UsuarioService } from "../../application/services/UsuarioService";
import { Usuario } from "../../domain/entities/Usuario";
import { ActualizarUsuarioData } from "../dto/usuario/actualizar_usuario_dto";
import { CrearUsuarioData } from "../dto/usuario/crear_usuario_dto";

export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // CREATE - Usando Callbacks
  crearUsuario(data: CrearUsuarioData): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      this.usuarioService.crearUsuario(data, (error, resultado) => {
        if (error) {
          reject(error);
        } else {
          resolve(resultado!);
        }
      });
    });
  }

  // UPDATE - Usando Promises
  actualizarUsuario(id: string, data: ActualizarUsuarioData): Promise<Usuario> {
    return this.usuarioService.actualizarUsuario(id, data);
  }

  // READ - Usando Async/Await
  async obtenerUsuarioPorId(id: string): Promise<Usuario | null> {
    try {
      return await this.usuarioService.obtenerUsuarioPorId(id);
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      throw error;
    }
  }

  async obtenerUsuariosActivos(): Promise<Usuario[]> {
    try {
      return await this.usuarioService.obtenerUsuariosActivos();
    } catch (error) {
      console.error("Error al obtener usuarios activos:", error);
      throw error;
    }
  }

  // DELETE - Usando Async/Await
  async eliminarUsuario(
    id: string,
    eliminacionFisica: boolean = false
  ): Promise<boolean> {
    try {
      return await this.usuarioService.eliminarUsuario(id, eliminacionFisica);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  }
}
