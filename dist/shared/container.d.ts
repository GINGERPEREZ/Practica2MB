import { UsuarioRepositoryInMemory } from '../infrastructure/repositories/UsuarioRepositoryInMemory';
import { UsuarioService } from '../application/services/UsuarioService';
import { UsuarioController } from '../presentation/controllers/UsuarioController';
export declare class Container {
    private static instance;
    private usuarioRepository;
    private usuarioService;
    private usuarioController;
    private constructor();
    static getInstance(): Container;
    getUsuarioRepository(): UsuarioRepositoryInMemory;
    getUsuarioService(): UsuarioService;
    getUsuarioController(): UsuarioController;
}
//# sourceMappingURL=container.d.ts.map