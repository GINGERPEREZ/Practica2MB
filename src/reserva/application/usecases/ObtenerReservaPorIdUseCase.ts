import { IReservaRepository } from "../../domain/repositories/IReservaRepository";
import { Reserva } from "../../domain/entities/Reserva";

export class ObtenerReservaPorIdUseCase {
  constructor(private readonly reservaRepository: IReservaRepository) {}

  async execute(id: string): Promise<Reserva | null> {
    if (!id) {
      throw new Error("El ID de la reserva es requerido");
    }

    return this.reservaRepository.obtenerPorId(id);
  }
}

