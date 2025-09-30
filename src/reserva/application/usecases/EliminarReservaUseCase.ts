import { IReservaRepository } from "../../domain/repositories/IReservaRepository";

export class EliminarReservaUseCase {
  constructor(private readonly reservaRepository: IReservaRepository) {}

  async execute(
    id: string,
    eliminacionFisica: boolean = false
  ): Promise<boolean> {
    if (!id) {
      throw new Error("El ID de la reserva es requerido");
    }

    return this.reservaRepository.eliminar(id, eliminacionFisica);
  }
}

