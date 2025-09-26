import { Usuario } from '../../domain/entities/Usuario';
import { IUsuarioRepository, CrearUsuarioData, ActualizarUsuarioData } from '../../domain/repositories/IUsuarioRepository';
export declare class UsuarioRepositoryInMemory implements IUsuarioRepository {
    private usuarios;
    constructor();
    private inicializarDatosDePrueba;
    private generarId;
    crear(data: CrearUsuarioData, callback: (error: Error | null, resultado: Usuario | null) => void): void;
    actualizar(id: string, data: ActualizarUsuarioData): Promise<Usuario>;
    obtenerPorId(id: string): Promise<Usuario | null>;
    obtenerTodosActivos(): Promise<Usuario[]>;
    eliminar(id: string, eliminacionFisica?: boolean): Promise<boolean>;
}
//# sourceMappingURL=UsuarioRepositoryInMemory.d.ts.map