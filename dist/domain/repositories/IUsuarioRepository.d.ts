import { Usuario, Rol } from '../entities/Usuario';
export interface CrearUsuarioData {
    nombre: string;
    email: string;
    rol: Rol;
}
export interface ActualizarUsuarioData {
    nombre?: string;
    email?: string;
    rol?: Rol;
    activo?: boolean;
}
export interface IUsuarioRepository {
    crear(data: CrearUsuarioData, callback: (error: Error | null, resultado: Usuario | null) => void): void;
    actualizar(id: string, data: ActualizarUsuarioData): Promise<Usuario>;
    obtenerPorId(id: string): Promise<Usuario | null>;
    obtenerTodosActivos(): Promise<Usuario[]>;
    eliminar(id: string, eliminacionFisica?: boolean): Promise<boolean>;
}
//# sourceMappingURL=IUsuarioRepository.d.ts.map