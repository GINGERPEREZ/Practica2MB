export type EstadoReserva = "pendiente" | "confirmada" | "cancelada" | "completada";

export interface Reserva {
  id: string;
  usuarioId: string;
  restauranteId: string;
  fechaHora: Date;
  numeroPersonas: number;
  estado: EstadoReserva;
  notas?: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export class ReservaEntity {
  public readonly id: string;
  public usuarioId: string;
  public restauranteId: string;
  public fechaHora: Date;
  public numeroPersonas: number;
  public estado: EstadoReserva;
  public notas?: string;
  public readonly fechaCreacion: Date;
  public fechaActualizacion: Date;

  constructor(
    id: string,
    usuarioId: string,
    restauranteId: string,
    fechaHora: Date,
    numeroPersonas: number,
    estado: EstadoReserva = "pendiente",
    notas?: string,
    fechaCreacion?: Date,
    fechaActualizacion?: Date
  ) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.restauranteId = restauranteId;
    this.fechaHora = fechaHora;
    this.numeroPersonas = numeroPersonas;
    this.estado = estado;
    this.notas = notas;
    this.fechaCreacion = fechaCreacion || new Date();
    this.fechaActualizacion = fechaActualizacion || new Date();

    this.validar();
  }

  private validar(): void {
    if (!this.id) {
      throw new Error("El ID de la reserva es requerido");
    }

    if (!this.usuarioId) {
      throw new Error("El ID del usuario es requerido");
    }

    if (!this.restauranteId) {
      throw new Error("El ID del restaurante es requerido");
    }

    if (!this.fechaHora) {
      throw new Error("La fecha y hora de la reserva son requeridas");
    }

    if (this.fechaHora <= new Date()) {
      throw new Error("La fecha y hora de la reserva deben ser futuras");
    }

    if (!this.numeroPersonas || this.numeroPersonas <= 0 || this.numeroPersonas > 20) {
      throw new Error("El número de personas debe estar entre 1 y 20");
    }

    if (!["pendiente", "confirmada", "cancelada", "completada"].includes(this.estado)) {
      throw new Error("El estado debe ser pendiente, confirmada, cancelada o completada");
    }
  }

  public actualizarFechaHora(nuevaFechaHora: Date): void {
    if (!nuevaFechaHora) {
      throw new Error("La fecha y hora son requeridas");
    }

    if (nuevaFechaHora <= new Date()) {
      throw new Error("La fecha y hora deben ser futuras");
    }

    this.fechaHora = nuevaFechaHora;
    this.fechaActualizacion = new Date();
  }

  public actualizarNumeroPersonas(nuevoNumero: number): void {
    if (!nuevoNumero || nuevoNumero <= 0 || nuevoNumero > 20) {
      throw new Error("El número de personas debe estar entre 1 y 20");
    }

    this.numeroPersonas = nuevoNumero;
    this.fechaActualizacion = new Date();
  }

  public actualizarEstado(nuevoEstado: EstadoReserva): void {
    if (!["pendiente", "confirmada", "cancelada", "completada"].includes(nuevoEstado)) {
      throw new Error("El estado debe ser pendiente, confirmada, cancelada o completada");
    }

    this.estado = nuevoEstado;
    this.fechaActualizacion = new Date();
  }

  public actualizarNotas(nuevasNotas: string): void {
    this.notas = nuevasNotas;
    this.fechaActualizacion = new Date();
  }

  public confirmar(): void {
    this.estado = "confirmada";
    this.fechaActualizacion = new Date();
  }

  public cancelar(): void {
    this.estado = "cancelada";
    this.fechaActualizacion = new Date();
  }

  public completar(): void {
    this.estado = "completada";
    this.fechaActualizacion = new Date();
  }

  public toJSON(): Reserva {
    return {
      id: this.id,
      usuarioId: this.usuarioId,
      restauranteId: this.restauranteId,
      fechaHora: this.fechaHora,
      numeroPersonas: this.numeroPersonas,
      estado: this.estado,
      notas: this.notas,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion,
    };
  }
}

