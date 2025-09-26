import { UsuarioRepositoryInMemory } from "../infrastructure/repositories/UsuarioRepositoryInMemory";
import { UsuarioService } from "../application/services/UsuarioService";
import { UsuarioController } from "../presentation/controllers/UsuarioController";

export class Container {
  private static instance: Container;
  private usuarioRepository: UsuarioRepositoryInMemory;
  private usuarioService: UsuarioService;
  private usuarioController: UsuarioController;

  private constructor() {
    // Infrastructure Layer
    this.usuarioRepository = new UsuarioRepositoryInMemory();

    // Application Layer
    this.usuarioService = new UsuarioService(this.usuarioRepository);

    // Presentation Layer
    this.usuarioController = new UsuarioController(this.usuarioService);
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  // Getters para acceder a las instancias
  public getUsuarioRepository(): UsuarioRepositoryInMemory {
    return this.usuarioRepository;
  }

  public getUsuarioService(): UsuarioService {
    return this.usuarioService;
  }

  public getUsuarioController(): UsuarioController {
    return this.usuarioController;
  }
}
