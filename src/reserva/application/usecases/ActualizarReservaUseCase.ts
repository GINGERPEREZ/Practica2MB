import {
  IReservaRepository,
  ReservaUpdate,
} from "../../domain/repositories/IReservaRepository";
import { Reserva } from "../../domain/entities/Reserva";

export class ActualizarReservaUseCase {
  constructor(private readonly reservaRepository: IReservaRepository) {}

  async execute(id: string, data: ReservaUpdate): Promise<Reserva> {
    const reservaExistente = await this.reservaRepository.obtenerPorId(id);
    if (!reservaExistente) {
      throw new Error(`Reserva con ID ${id} no encontrada`);
    }

    if (data.fechaHora !== undefined) {
      if (!data.fechaHora) {
        throw new Error("La fecha y hora son requeridas");
      }

      if (data.fechaHora <= new Date()) {
        throw new Error("La fecha y hora deben ser futuras");
      }
    }

    if (
      data.numeroPersonas !== undefined &&
      (!data.numeroPersonas || data.numeroPersonas <= 0 || data.numeroPersonas > 20)
    ) {
      throw new Error("El número de personas debe estar entre 1 y 20");
    }

    if (
      data.estado !== undefined &&
      !["pendiente", "confirmada", "cancelada", "completada"].includes(data.estado)
    ) {
      throw new Error("El estado debe ser pendiente, confirmada, cancelada o completada");
    }

    return this.reservaRepository.actualizar(id, data);
  }
}

