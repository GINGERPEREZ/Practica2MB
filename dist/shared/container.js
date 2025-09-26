"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const UsuarioRepositoryInMemory_1 = require("../infrastructure/repositories/UsuarioRepositoryInMemory");
const UsuarioService_1 = require("../application/services/UsuarioService");
const UsuarioController_1 = require("../presentation/controllers/UsuarioController");
class Container {
    constructor() {
        // Infrastructure Layer
        this.usuarioRepository = new UsuarioRepositoryInMemory_1.UsuarioRepositoryInMemory();
        // Application Layer
        this.usuarioService = new UsuarioService_1.UsuarioService(this.usuarioRepository);
        // Presentation Layer
        this.usuarioController = new UsuarioController_1.UsuarioController(this.usuarioService);
    }
    static getInstance() {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }
    // Getters para acceder a las instancias
    getUsuarioRepository() {
        return this.usuarioRepository;
    }
    getUsuarioService() {
        return this.usuarioService;
    }
    getUsuarioController() {
        return this.usuarioController;
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map