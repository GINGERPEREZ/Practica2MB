"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
class UsuarioService {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    // CREATE - Usando Callbacks
    crearUsuario(data, callback) {
        try {
            // Validar datos antes de crear
            if (!data.nombre || data.nombre.trim().length === 0) {
                callback(new Error('El nombre es requerido'), null);
                return;
            }
            if (!data.email) {
                callback(new Error('El email es requerido'), null);
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                callback(new Error('El email debe tener un formato válido'), null);
                return;
            }
            if (!['admin', 'editor', 'visitante'].includes(data.rol)) {
                callback(new Error('El rol debe ser admin, editor o visitante'), null);
                return;
            }
            // Simular latencia de red con setTimeout
            setTimeout(() => {
                this.usuarioRepository.crear(data, callback);
            }, 100);
        }
        catch (error) {
            callback(error, null);
        }
    }
    // UPDATE - Retornando Promise<Usuario>
    async actualizarUsuario(id, data) {
        // Validar existencia del registro
        const usuarioExistente = await this.usuarioRepository.obtenerPorId(id);
        if (!usuarioExistente) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        // Aplicar validaciones a los campos que se van a actualizar
        if (data.nombre !== undefined && (!data.nombre || data.nombre.trim().length === 0)) {
            throw new Error('El nombre no puede estar vacío');
        }
        if (data.email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@@]+\.[^\s@]+$/;
            if (!data.email || !emailRegex.test(data.email)) {
                throw new Error('El email debe tener un formato válido');
            }
        }
        if (data.rol !== undefined && !['admin', 'editor', 'visitante'].includes(data.rol)) {
            throw new Error('El rol debe ser admin, editor o visitante');
        }
        return this.usuarioRepository.actualizar(id, data);
    }
    // READ - Async functions
    async obtenerUsuarioPorId(id) {
        return this.usuarioRepository.obtenerPorId(id);
    }
    async obtenerUsuariosActivos() {
        return this.usuarioRepository.obtenerTodosActivos();
    }
    // DELETE - Async function retornando Promise<boolean>
    async eliminarUsuario(id, eliminacionFisica = false) {
        // Validar existencia antes de eliminar
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        return this.usuarioRepository.eliminar(id, eliminacionFisica);
    }
}
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=UsuarioService.js.map