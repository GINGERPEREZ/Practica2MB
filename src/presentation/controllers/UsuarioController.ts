import { Usuario } from "../../domain/entities/Usuario";
import { ActualizarUsuarioData } from "../dto/usuario/actualizar_usuario_dto";
import { CrearUsuarioData } from "../dto/usuario/crear_usuario_dto";
import { CrearUsuarioUseCase } from "../../application/usecases/CrearUsuarioUseCase";
import { ActualizarUsuarioUseCase } from "../../application/usecases/ActualizarUsuarioUseCase";
import { ObtenerUsuarioPorIdUseCase } from "../../application/usecases/ObtenerUsuarioPorIdUseCase";
import { ListarUsuariosActivosUseCase } from "../../application/usecases/ListarUsuariosActivosUseCase";
import { EliminarUsuarioUseCase } from "../../application/usecases/EliminarUsuarioUseCase";

export class UsuarioController {
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase,
    private readonly actualizarUsuarioUseCase: ActualizarUsuarioUseCase,
    private readonly obtenerUsuarioPorIdUseCase: ObtenerUsuarioPorIdUseCase,
    private readonly listarUsuariosActivosUseCase: ListarUsuariosActivosUseCase,
    private readonly eliminarUsuarioUseCase: EliminarUsuarioUseCase
  ) {}

  // CREATE - mantiene callbacks por requisito
  crearUsuario(data: CrearUsuarioData): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      this.crearUsuarioUseCase.execute(data, (error, resultado) => {
        if (error) return reject(error);
        resolve(resultado as Usuario);
      });
    });
  }

  // UPDATE - Promises
  actualizarUsuario(id: string, data: ActualizarUsuarioData): Promise<Usuario> {
    return this.actualizarUsuarioUseCase.execute(id, data);
  }

  // READ - Async/Await
  async obtenerUsuarioPorId(id: string): Promise<Usuario | null> {
    return this.obtenerUsuarioPorIdUseCase.execute(id);
  }

  async obtenerUsuariosActivos(): Promise<Usuario[]> {
    return this.listarUsuariosActivosUseCase.execute();
  }

  // DELETE - Async/Await
  async eliminarUsuario(
    id: string,
    eliminacionFisica: boolean = false
  ): Promise<boolean> {
    return this.eliminarUsuarioUseCase.execute(id, eliminacionFisica);
  }
}
