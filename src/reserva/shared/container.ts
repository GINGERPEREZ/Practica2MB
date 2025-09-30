import { ReservaRepositoryInMemory } from "../infrastructure/repositories/ReservaRepositoryInMemory";
import { ReservaController } from "../presentation/controllers/ReservaController";
import { CrearReservaUseCase } from "../application/usecases/CrearReservaUseCase";
import { ActualizarReservaUseCase } from "../application/usecases/ActualizarReservaUseCase";
import { ObtenerReservaPorIdUseCase } from "../application/usecases/ObtenerReservaPorIdUseCase";
import { ListarReservasUseCase } from "../application/usecases/ListarReservasUseCase";
import { EliminarReservaUseCase } from "../application/usecases/EliminarReservaUseCase";

export class ReservaContainer {
  private static instance: ReservaContainer;
  private readonly reservaRepository: ReservaRepositoryInMemory;
  private readonly reservaController: ReservaController;
  private readonly crearReservaUseCase: CrearReservaUseCase;
  private readonly actualizarReservaUseCase: ActualizarReservaUseCase;
  private readonly obtenerReservaPorIdUseCase: ObtenerReservaPorIdUseCase;
  private readonly listarReservasUseCase: ListarReservasUseCase;
  private readonly eliminarReservaUseCase: EliminarReservaUseCase;

  private constructor() {
    // Infrastructure Layer
    this.reservaRepository = new ReservaRepositoryInMemory();

    // Application Layer - Use cases
    this.crearReservaUseCase = new CrearReservaUseCase(this.reservaRepository);
    this.actualizarReservaUseCase = new ActualizarReservaUseCase(
      this.reservaRepository
    );
    this.obtenerReservaPorIdUseCase = new ObtenerReservaPorIdUseCase(
      this.reservaRepository
    );
    this.listarReservasUseCase = new ListarReservasUseCase(
      this.reservaRepository
    );
    this.eliminarReservaUseCase = new EliminarReservaUseCase(
      this.reservaRepository
    );

    // Presentation Layer
    this.reservaController = new ReservaController(
      this.crearReservaUseCase,
      this.actualizarReservaUseCase,
      this.obtenerReservaPorIdUseCase,
      this.listarReservasUseCase,
      this.eliminarReservaUseCase
    );
  }

  public static getInstance(): ReservaContainer {
    if (!ReservaContainer.instance) {
      ReservaContainer.instance = new ReservaContainer();
    }
    return ReservaContainer.instance;
  }

  // Getters para acceder a las instancias
  public getReservaRepository(): ReservaRepositoryInMemory {
    return this.reservaRepository;
  }

  public getReservaController(): ReservaController {
    return this.reservaController;
  }
}

