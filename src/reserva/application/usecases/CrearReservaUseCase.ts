import {
  IReservaRepository,
  ReservaCreate,
} from "../../domain/repositories/IReservaRepository";

export class CrearReservaUseCase {
  constructor(private readonly reservaRepository: IReservaRepository) {}

  // Callbacks: (error, resultado) con simulación de latencia
  execute(
    data: ReservaCreate,
    callback: (error: Error | null, resultado: any | null) => void
  ): void {
    try {
      if (!data.usuarioId) {
        callback(new Error("El ID del usuario es requerido"), null);
        return;
      }

      if (!data.restauranteId) {
        callback(new Error("El ID del restaurante es requerido"), null);
        return;
      }

      if (!data.fechaHora) {
        callback(new Error("La fecha y hora de la reserva son requeridas"), null);
        return;
      }

      if (data.fechaHora <= new Date()) {
        callback(new Error("La fecha y hora de la reserva deben ser futuras"), null);
        return;
      }

      if (!data.numeroPersonas || data.numeroPersonas <= 0 || data.numeroPersonas > 20) {
        callback(new Error("El número de personas debe estar entre 1 y 20"), null);
        return;
      }

      // Simular latencia de red
      setTimeout(() => {
        this.reservaRepository.crear(
          {
            usuarioId: data.usuarioId,
            restauranteId: data.restauranteId,
            fechaHora: data.fechaHora,
            numeroPersonas: data.numeroPersonas,
            notas: data.notas,
          },
          callback
        );
      }, 100);
    } catch (error) {
      callback(error as Error, null);
    }
  }
}

