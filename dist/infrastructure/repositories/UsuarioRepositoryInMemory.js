"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepositoryInMemory = void 0;
class UsuarioRepositoryInMemory {
    constructor() {
        this.usuarios = new Map();
        this.inicializarDatosDePrueba();
    }
    inicializarDatosDePrueba() {
        const usuariosDePrueba = [
            {
                id: '550e8400-e29b-41d4-a716-446655440001',
                nombre: 'Juan Pérez',
                email: 'juan.perez@example.com',
                rol: 'admin',
                activo: true
            },
            {
                id: '550e8400-e29b-41d4-a716-446655440002',
                nombre: 'María García',
                email: 'maria.garcia@example.com',
                rol: 'editor',
                activo: true
            },
            {
                id: '550e8400-e29b-41d4-a716-446655440003',
                nombre: 'Carlos López',
                email: 'carlos.lopez@example.com',
                rol: 'editor',
                activo: true
            },
            {
                id: '550e8400-e29b-41d4-a716-446655440004',
                nombre: 'Ana Martínez',
                email: 'ana.martinez@example.com',
                rol: 'visitante',
                activo: true
            },
            {
                id: '550e8400-e29b-41d4-a716-446655440005',
                nombre: 'Pedro Sánchez',
                email: 'pedro.sanchez@example.com',
                rol: 'visitante',
                activo: false
            }
        ];
        usuariosDePrueba.forEach(usuario => {
            this.usuarios.set(usuario.id, usuario);
        });
    }
    generarId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    // CREATE - Usando Callbacks
    crear(data, callback) {
        try {
            const id = this.generarId();
            const usuario = {
                id,
                nombre: data.nombre,
                email: data.email,
                rol: data.rol,
                activo: true
            };
            this.usuarios.set(id, usuario);
            callback(null, usuario);
        }
        catch (error) {
            callback(error, null);
        }
    }
    // UPDATE - Retornando Promise<Usuario>
    async actualizar(id, data) {
        const usuarioExistente = this.usuarios.get(id);
        if (!usuarioExistente) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        const usuarioActualizado = {
            ...usuarioExistente,
            ...data
        };
        this.usuarios.set(id, usuarioActualizado);
        return usuarioActualizado;
    }
    // READ - Async functions
    async obtenerPorId(id) {
        return this.usuarios.get(id) || null;
    }
    async obtenerTodosActivos() {
        return Array.from(this.usuarios.values()).filter(usuario => usuario.activo);
    }
    // DELETE - Async function retornando Promise<boolean>
    async eliminar(id, eliminacionFisica = false) {
        const usuario = this.usuarios.get(id);
        if (!usuario) {
            return false;
        }
        if (eliminacionFisica) {
            // Eliminación física
            this.usuarios.delete(id);
        }
        else {
            // Eliminación lógica
            usuario.activo = false;
            this.usuarios.set(id, usuario);
        }
        return true;
    }
}
exports.UsuarioRepositoryInMemory = UsuarioRepositoryInMemory;
//# sourceMappingURL=UsuarioRepositoryInMemory.js.map