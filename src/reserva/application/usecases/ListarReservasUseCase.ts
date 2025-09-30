import { IReservaRepository } from "../../domain/repositories/IReservaRepository";
import { Reserva } from "../../domain/entities/Reserva";

export class ListarReservasUseCase {
  constructor(private readonly reservaRepository: IReservaRepository) {}

  async execute(filtro?: {
    usuarioId?: string;
    restauranteId?: string;
    soloActivas?: boolean;
  }): Promise<Reserva[]> {
    if (filtro?.usuarioId) {
      return this.reservaRepository.obtenerPorUsuarioId(filtro.usuarioId);
    }

    if (filtro?.restauranteId) {
      return this.reservaRepository.obtenerPorRestauranteId(filtro.restauranteId);
    }

    if (filtro?.soloActivas) {
      return this.reservaRepository.obtenerActivas();
    }

    return this.reservaRepository.obtenerTodas();
  }
}

