export type Rol = 'admin' | 'editor' | 'visitante';
export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: Rol;
    activo: boolean;
}
export declare class UsuarioEntity implements Usuario {
    readonly id: string;
    nombre: string;
    email: string;
    rol: Rol;
    activo: boolean;
    constructor(id: string, nombre: string, email: string, rol: Rol, activo?: boolean);
    private validar;
    private validarEmail;
    actualizarNombre(nuevoNombre: string): void;
    actualizarEmail(nuevoEmail: string): void;
    actualizarRol(nuevoRol: Rol): void;
    activar(): void;
    desactivar(): void;
    toJSON(): Usuario;
}
//# sourceMappingURL=Usuario.d.ts.map