import { Reserva } from "../../domain/entities/Reserva";
import {
  IReservaRepository,
  ReservaCreate,
  ReservaUpdate,
} from "../../domain/repositories/IReservaRepository";

export class ReservaRepositoryInMemory implements IReservaRepository {
  private readonly reservas: Map<string, Reserva> = new Map();

  constructor() {
    this.inicializarDatosDePrueba();
  }

  private inicializarDatosDePrueba(): void {
    const reservasDePrueba: Reserva[] = [
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        usuarioId: "550e8400-e29b-41d4-a716-446655440001", // Juan Pérez
        restauranteId: "770e8400-e29b-41d4-a716-446655440001",
        fechaHora: new Date("2025-10-15T19:00:00Z"),
        numeroPersonas: 4,
        estado: "confirmada",
        notas: "Cumpleaños de María",
        fechaCreacion: new Date("2025-09-20T10:00:00Z"),
        fechaActualizacion: new Date("2025-09-20T10:00:00Z"),
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440002",
        usuarioId: "550e8400-e29b-41d4-a716-446655440002", // María García
        restauranteId: "770e8400-e29b-41d4-a716-446655440002",
        fechaHora: new Date("2025-10-16T20:30:00Z"),
        numeroPersonas: 2,
        estado: "pendiente",
        notas: "Cena romántica",
        fechaCreacion: new Date("2025-09-21T14:30:00Z"),
        fechaActualizacion: new Date("2025-09-21T14:30:00Z"),
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440003",
        usuarioId: "550e8400-e29b-41d4-a716-446655440003", // Carlos López
        restauranteId: "770e8400-e29b-41d4-a716-446655440001",
        fechaHora: new Date("2025-10-17T18:00:00Z"),
        numeroPersonas: 6,
        estado: "confirmada",
        notas: "Reunión familiar",
        fechaCreacion: new Date("2025-09-22T09:15:00Z"),
        fechaActualizacion: new Date("2025-09-22T09:15:00Z"),
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440004",
        usuarioId: "550e8400-e29b-41d4-a716-446655440004", // Ana Martínez
        restauranteId: "770e8400-e29b-41d4-a716-446655440003",
        fechaHora: new Date("2025-10-18T19:30:00Z"),
        numeroPersonas: 3,
        estado: "cancelada",
        notas: "Cena de negocios",
        fechaCreacion: new Date("2025-09-23T16:45:00Z"),
        fechaActualizacion: new Date("2025-09-25T11:20:00Z"),
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440005",
        usuarioId: "550e8400-e29b-41d4-a716-446655440006", // Lucía Fernández
        restauranteId: "770e8400-e29b-41d4-a716-446655440002",
        fechaHora: new Date("2025-10-19T21:00:00Z"),
        numeroPersonas: 8,
        estado: "confirmada",
        notas: "Evento corporativo",
        fechaCreacion: new Date("2025-09-24T13:00:00Z"),
        fechaActualizacion: new Date("2025-09-24T13:00:00Z"),
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440006",
        usuarioId: "550e8400-e29b-41d4-a716-446655440007", // Miguel Torres
        restauranteId: "770e8400-e29b-41d4-a716-446655440001",
        fechaHora: new Date("2025-10-20T17:30:00Z"),
        numeroPersonas: 2,
        estado: "pendiente",
        fechaCreacion: new Date("2025-09-25T08:30:00Z"),
        fechaActualizacion: new Date("2025-09-25T08:30:00Z"),
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440007",
        usuarioId: "550e8400-e29b-41d4-a716-446655440008", // Sofía Herrera
        restauranteId: "770e8400-e29b-41d4-a716-446655440003",
        fechaHora: new Date("2025-09-30T20:00:00Z"), // Reserva para hoy
        numeroPersonas: 4,
        estado: "completada",
        notas: "Cena con amigos",
        fechaCreacion: new Date("2025-09-15T12:00:00Z"),
        fechaActualizacion: new Date("2025-09-30T22:00:00Z"),
      },
    ];

    reservasDePrueba.forEach((reserva) => {
      this.reservas.set(reserva.id, reserva);
    });
  }

  private generarId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // CREATE - Usando Callbacks
  crear(
    data: ReservaCreate,
    callback: (error: Error | null, resultado: Reserva | null) => void
  ): void {
    try {
      const id = this.generarId();
      const reserva: Reserva = {
        id,
        usuarioId: data.usuarioId,
        restauranteId: data.restauranteId,
        fechaHora: data.fechaHora,
        numeroPersonas: data.numeroPersonas,
        estado: "pendiente",
        notas: data.notas,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      };

      this.reservas.set(id, reserva);
      callback(null, reserva);
    } catch (error) {
      callback(error as Error, null);
    }
  }

  // UPDATE - Retornando Promise<Reserva>
  async actualizar(id: string, data: ReservaUpdate): Promise<Reserva> {
    const reservaExistente = this.reservas.get(id);
    if (!reservaExistente) {
      throw new Error(`Reserva con ID ${id} no encontrada`);
    }

    const reservaActualizada: Reserva = {
      ...reservaExistente,
      ...data,
      fechaActualizacion: new Date(),
    };

    this.reservas.set(id, reservaActualizada);
    return reservaActualizada;
  }

  // READ - Async functions
  async obtenerPorId(id: string): Promise<Reserva | null> {
    return this.reservas.get(id) || null;
  }

  async obtenerTodas(): Promise<Reserva[]> {
    return Array.from(this.reservas.values());
  }

  async obtenerPorUsuarioId(usuarioId: string): Promise<Reserva[]> {
    return Array.from(this.reservas.values()).filter(
      (reserva) => reserva.usuarioId === usuarioId
    );
  }

  async obtenerPorRestauranteId(restauranteId: string): Promise<Reserva[]> {
    return Array.from(this.reservas.values()).filter(
      (reserva) => reserva.restauranteId === restauranteId
    );
  }

  async obtenerActivas(): Promise<Reserva[]> {
    return Array.from(this.reservas.values()).filter(
      (reserva) => reserva.estado !== "cancelada" && reserva.estado !== "completada"
    );
  }

  // DELETE - Async function retornando Promise<boolean>
  async eliminar(
    id: string,
    eliminacionFisica: boolean = false
  ): Promise<boolean> {
    const reserva = this.reservas.get(id);
    if (!reserva) {
      return false;
    }

    if (eliminacionFisica) {
      // Eliminación física
      this.reservas.delete(id);
    } else {
      // Eliminación lógica - marcar como cancelada
      reserva.estado = "cancelada";
      reserva.fechaActualizacion = new Date();
      this.reservas.set(id, reserva);
    }

    return true;
  }
}

