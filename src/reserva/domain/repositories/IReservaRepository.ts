import { EstadoReserva, Reserva } from "../entities/Reserva";

export interface ReservaCreate {
  usuarioId: string;
  restauranteId: string;
  fechaHora: Date;
  numeroPersonas: number;
  notas?: string;
}

export interface ReservaUpdate {
  fechaHora?: Date;
  numeroPersonas?: number;
  estado?: EstadoReserva;
  notas?: string;
}

export interface IReservaRepository {
  // CREATE - Usando Callbacks (error, resultado)
  crear(
    data: ReservaCreate,
    callback: (error: Error | null, resultado: Reserva | null) => void
  ): void;

  // UPDATE - Retornando Promise<Reserva>
  actualizar(id: string, data: ReservaUpdate): Promise<Reserva>;

  // READ - Async functions retornando Promise
  obtenerPorId(id: string): Promise<Reserva | null>;
  obtenerTodas(): Promise<Reserva[]>;
  obtenerPorUsuarioId(usuarioId: string): Promise<Reserva[]>;
  obtenerPorRestauranteId(restauranteId: string): Promise<Reserva[]>;
  obtenerActivas(): Promise<Reserva[]>;

  // DELETE - Async function retornando Promise<boolean>
  eliminar(id: string, eliminacionFisica?: boolean): Promise<boolean>;
}

