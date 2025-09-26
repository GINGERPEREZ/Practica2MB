import { Usuario } from '../../domain/entities/Usuario';
import { IUsuarioRepository, CrearUsuarioData, ActualizarUsuarioData } from '../../domain/repositories/IUsuarioRepository';
export declare class UsuarioService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: IUsuarioRepository);
    crearUsuario(data: CrearUsuarioData, callback: (error: Error | null, resultado: Usuario | null) => void): void;
    actualizarUsuario(id: string, data: ActualizarUsuarioData): Promise<Usuario>;
    obtenerUsuarioPorId(id: string): Promise<Usuario | null>;
    obtenerUsuariosActivos(): Promise<Usuario[]>;
    eliminarUsuario(id: string, eliminacionFisica?: boolean): Promise<boolean>;
}
//# sourceMappingURL=UsuarioService.d.ts.map