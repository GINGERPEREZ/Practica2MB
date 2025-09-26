"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
class UsuarioEntity {
    constructor(id, nombre, email, rol, activo = true) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.activo = activo;
        this.validar();
    }
    validar() {
        if (!this.id) {
            throw new Error('El ID del usuario es requerido');
        }
        if (!this.nombre || this.nombre.trim().length === 0) {
            throw new Error('El nombre del usuario es requerido');
        }
        if (!this.email || !this.validarEmail(this.email)) {
            throw new Error('El email del usuario debe ser válido');
        }
        if (!['admin', 'editor', 'visitante'].includes(this.rol)) {
            throw new Error('El rol debe ser admin, editor o visitante');
        }
    }
    validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    actualizarNombre(nuevoNombre) {
        if (!nuevoNombre || nuevoNombre.trim().length === 0) {
            throw new Error('El nombre no puede estar vacío');
        }
        this.nombre = nuevoNombre;
    }
    actualizarEmail(nuevoEmail) {
        if (!nuevoEmail || !this.validarEmail(nuevoEmail)) {
            throw new Error('El email debe ser válido');
        }
        this.email = nuevoEmail;
    }
    actualizarRol(nuevoRol) {
        if (!['admin', 'editor', 'visitante'].includes(nuevoRol)) {
            throw new Error('El rol debe ser admin, editor o visitante');
        }
        this.rol = nuevoRol;
    }
    activar() {
        this.activo = true;
    }
    desactivar() {
        this.activo = false;
    }
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            rol: this.rol,
            activo: this.activo
        };
    }
}
exports.UsuarioEntity = UsuarioEntity;
//# sourceMappingURL=Usuario.js.map