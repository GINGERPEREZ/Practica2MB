import { Usuario } from "../../domain/entities/Usuario";
import { IUsuarioRepository } from "../../domain/repositories/IUsuarioRepository";
import { ActualizarUsuarioData } from "../../presentation/dto/usuario/actualizar_usuario_dto";
import { CrearUsuarioData } from "../../presentation/dto/usuario/crear_usuario_dto";
import { CrearUsuarioUseCase } from "../usecases/CrearUsuarioUseCase";
import { ActualizarUsuarioUseCase } from "../usecases/ActualizarUsuarioUseCase";
import { ObtenerUsuarioPorIdUseCase } from "../usecases/ObtenerUsuarioPorIdUseCase";
import { ListarUsuariosActivosUseCase } from "../usecases/ListarUsuariosActivosUseCase";
import { EliminarUsuarioUseCase } from "../usecases/EliminarUsuarioUseCase";

// DEPRECADO: Mantenido por compatibilidad. Internamente delega en casos de uso.
export class UsuarioService {
  private readonly crearUC: CrearUsuarioUseCase;
  private readonly actualizarUC: ActualizarUsuarioUseCase;
  private readonly obtenerPorIdUC: ObtenerUsuarioPorIdUseCase;
  private readonly listarActivosUC: ListarUsuariosActivosUseCase;
  private readonly eliminarUC: EliminarUsuarioUseCase;

  constructor(private readonly usuarioRepository: IUsuarioRepository) {
    this.crearUC = new CrearUsuarioUseCase(usuarioRepository);
    this.actualizarUC = new ActualizarUsuarioUseCase(usuarioRepository);
    this.obtenerPorIdUC = new ObtenerUsuarioPorIdUseCase(usuarioRepository);
    this.listarActivosUC = new ListarUsuariosActivosUseCase(usuarioRepository);
    this.eliminarUC = new EliminarUsuarioUseCase(usuarioRepository);
  }

  // CREATE - Usando Callbacks
  crearUsuario(
    data: CrearUsuarioData,
    callback: (error: Error | null, resultado: Usuario | null) => void
  ): void {
    // delega al caso de uso (manteniendo callbacks)
    this.crearUC.execute(data, callback);
  }

  // UPDATE - Retornando Promise<Usuario>
  async actualizarUsuario(
    id: string,
    data: ActualizarUsuarioData
  ): Promise<Usuario> {
    // Validar existencia del registro
    return this.actualizarUC.execute(id, data);
  }

  // READ - Async functions
  async obtenerUsuarioPorId(id: string): Promise<Usuario | null> {
    return this.obtenerPorIdUC.execute(id);
  }

  async obtenerUsuariosActivos(): Promise<Usuario[]> {
    return this.listarActivosUC.execute();
  }

  // DELETE - Async function retornando Promise<boolean>
  async eliminarUsuario(
    id: string,
    eliminacionFisica: boolean = false
  ): Promise<boolean> {
    return this.eliminarUC.execute(id, eliminacionFisica);
  }
}
