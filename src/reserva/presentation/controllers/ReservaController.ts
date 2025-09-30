import { Reserva } from "../../domain/entities/Reserva";
import {
  ReservaCreate,
  ReservaUpdate,
} from "../../domain/repositories/IReservaRepository";
import { CrearReservaUseCase } from "../../application/usecases/CrearReservaUseCase";
import { ActualizarReservaUseCase } from "../../application/usecases/ActualizarReservaUseCase";
import { ObtenerReservaPorIdUseCase } from "../../application/usecases/ObtenerReservaPorIdUseCase";
import { ListarReservasUseCase } from "../../application/usecases/ListarReservasUseCase";
import { EliminarReservaUseCase } from "../../application/usecases/EliminarReservaUseCase";

export class ReservaController {
  constructor(
    private readonly crearReservaUseCase: CrearReservaUseCase,
    private readonly actualizarReservaUseCase: ActualizarReservaUseCase,
    private readonly obtenerReservaPorIdUseCase: ObtenerReservaPorIdUseCase,
    private readonly listarReservasUseCase: ListarReservasUseCase,
    private readonly eliminarReservaUseCase: EliminarReservaUseCase
  ) {}

  // CREATE - mantiene callbacks por requisito
  crearReserva(data: ReservaCreate): Promise<Reserva> {
    return new Promise((resolve, reject) => {
      this.crearReservaUseCase.execute(data, (error, resultado) => {
        if (error) return reject(error);
        resolve(resultado as Reserva);
      });
    });
  }

  // UPDATE - Promises
  actualizarReserva(id: string, data: ReservaUpdate): Promise<Reserva> {
    return this.actualizarReservaUseCase.execute(id, data);
  }

  // READ - Async/Await
  async obtenerReservaPorId(id: string): Promise<Reserva | null> {
    return this.obtenerReservaPorIdUseCase.execute(id);
  }

  async listarReservas(filtro?: {
    usuarioId?: string;
    restauranteId?: string;
    soloActivas?: boolean;
  }): Promise<Reserva[]> {
    return this.listarReservasUseCase.execute(filtro);
  }

  // DELETE - Async/Await
  async eliminarReserva(
    id: string,
    eliminacionFisica: boolean = false
  ): Promise<boolean> {
    return this.eliminarReservaUseCase.execute(id, eliminacionFisica);
  }
}

