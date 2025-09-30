import { UserContainer } from "./user/shared/container";
import { ReservaContainer } from "./reserva/shared/container";
import { PaymentService } from "./pagos/application/services/paymentService";
import { PaymentRepositoryMemory } from "./pagos/infrastructure/database/in_memory/paymentRepositoryInMemory";

/**
 * Demo integral: Usuario -> Reserva -> Pago
 * Relación entre módulos por IDs:
 * - payment.payerId = usuario.id
 * - payment.targetId = reserva.id (tipo: RESERVATION)
 * - Al completar el pago, se confirma la reserva.
 */
async function main() {
  console.log(
    "\n================ DEMO INTEGRAL (Usuario, Reserva y Pago) ================\n"
  );

  // Infraestructura de Pagos
  const paymentRepository = new PaymentRepositoryMemory();
  const paymentService = new PaymentService(paymentRepository);

  // Contenedores (Usuarios y Reservas)
  const userContainer = UserContainer.getInstance();
  const usuarioController = userContainer.getUsuarioController();

  const reservaContainer = ReservaContainer.getInstance();
  const reservaController = reservaContainer.getReservaController();

  // 1) Crear Usuario
  console.log("1) Creando usuario...");
  const usuario = await usuarioController.crearUsuario({
    nombre: "Cliente Demo",
    email: `cliente.demo+${Date.now()}@example.com`,
    rol: "visitante",
  });
  console.log("   ✅ Usuario creado:", usuario);

  // 2) Crear Reserva para ese usuario (fecha futura)
  console.log("\n2) Creando reserva para el usuario...");
  const fechaFutura = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 días
  const reserva = await reservaController.crearReserva({
    usuarioId: usuario.id,
    restauranteId: "resto-001",
    fechaHora: fechaFutura,
    numeroPersonas: 4,
    notas: "Reserva demo vinculada a pago",
  });
  console.log("   ✅ Reserva creada:", {
    id: reserva.id,
    usuarioId: reserva.usuarioId,
    restauranteId: reserva.restauranteId,
    fechaHora: reserva.fechaHora.toISOString(),
    numeroPersonas: reserva.numeroPersonas,
    estado: reserva.estado,
  });

  // 3) Crear Pago asociado a esa reserva (payerId = usuario.id, targetId = reserva.id)
  console.log("\n3) Creando pago de la reserva...");
  const pagoCreado = await paymentService.createPayment({
    payerId: usuario.id,
    paymentType: "RESERVATION",
    targetId: reserva.id,
    amount: 75.0,
  });
  if (!pagoCreado.success || !pagoCreado.data) {
    throw new Error("No se pudo crear el pago: " + pagoCreado.message);
  }
  console.log("   ✅ Pago creado:", pagoCreado.data);

  // 4) Completar el pago y confirmar la reserva
  console.log("\n4) Completando el pago y confirmando la reserva...");
  const pagoCompletado = await paymentService.updatePaymentStatus({
    paymentId: pagoCreado.data.paymentId,
    status: "COMPLETED",
  });
  if (!pagoCompletado.success) {
    throw new Error("No se pudo completar el pago: " + pagoCompletado.message);
  }
  console.log("   ✅ Estado de pago:", pagoCompletado.data?.paymentStatus);

  // Tras completar el pago, confirmamos la reserva
  const reservaConfirmada = await reservaController.actualizarReserva(
    reserva.id,
    {
      estado: "confirmada",
      notas: `Pago confirmado (${pagoCompletado.data?.paymentId})`,
    }
  );
  console.log("   ✅ Reserva confirmada:", {
    id: reservaConfirmada.id,
    estado: reservaConfirmada.estado,
    notas: reservaConfirmada.notas,
  });

  // 5) Consulta de consistencia: obtener pago y reserva por sus IDs
  console.log("\n5) Verificación de relación (por IDs)...");
  const verPago = await paymentService.getPaymentById({
    paymentId: pagoCreado.data.paymentId,
  });
  const verReserva = await reservaController.obtenerReservaPorId(reserva.id);

  console.log("   🔗 Relación:");
  console.log(
    `   - payment.payerId  = ${verPago.data?.payerId} (debe ser usuario.id = ${usuario.id})`
  );
  console.log(
    `   - payment.targetId = ${verPago.data?.targetId} (debe ser reserva.id = ${reserva.id})`
  );
  console.log(
    `   - reserva.estado   = ${verReserva?.estado} (debe ser 'confirmada')`
  );

  console.log(
    "\n======================== FIN DE LA DEMOSTRACIÓN ========================\n"
  );
}

main().catch((err) => {
  console.error("❌ Error en la demo integral:", err);
  process.exit(1);
});
