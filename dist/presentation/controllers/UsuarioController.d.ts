import { UsuarioService } from '../../application/services/UsuarioService';
import { CrearUsuarioData, ActualizarUsuarioData } from '../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    crearUsuario(data: CrearUsuarioData): Promise<Usuario>;
    actualizarUsuario(id: string, data: ActualizarUsuarioData): Promise<Usuario>;
    obtenerUsuarioPorId(id: string): Promise<Usuario | null>;
    obtenerUsuariosActivos(): Promise<Usuario[]>;
    eliminarUsuario(id: string, eliminacionFisica?: boolean): Promise<boolean>;
}
//# sourceMappingURL=UsuarioController.d.ts.map