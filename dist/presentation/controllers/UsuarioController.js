"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    // CREATE - Usando Callbacks
    crearUsuario(data) {
        return new Promise((resolve, reject) => {
            this.usuarioService.crearUsuario(data, (error, resultado) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(resultado);
                }
            });
        });
    }
    // UPDATE - Usando Promises
    actualizarUsuario(id, data) {
        return this.usuarioService.actualizarUsuario(id, data);
    }
    // READ - Usando Async/Await
    async obtenerUsuarioPorId(id) {
        try {
            return await this.usuarioService.obtenerUsuarioPorId(id);
        }
        catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            throw error;
        }
    }
    async obtenerUsuariosActivos() {
        try {
            return await this.usuarioService.obtenerUsuariosActivos();
        }
        catch (error) {
            console.error('Error al obtener usuarios activos:', error);
            throw error;
        }
    }
    // DELETE - Usando Async/Await
    async eliminarUsuario(id, eliminacionFisica = false) {
        try {
            return await this.usuarioService.eliminarUsuario(id, eliminacionFisica);
        }
        catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
        }
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map