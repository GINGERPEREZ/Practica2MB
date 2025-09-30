import { UserContainer } from "./user/shared/container";
import { ReservaContainer } from "./reserva/shared/container";

async function main() {
  console.log("🚀 Sistema de Gestión de Usuarios y Reservas");
  console.log("============================================\n");

  // Contenedor de usuarios
  const userContainer = UserContainer.getInstance();
  const usuarioController = userContainer.getUsuarioController();

  // Contenedor de reservas
  const reservaContainer = ReservaContainer.getInstance();
  const reservaController = reservaContainer.getReservaController();

  try {
    // 1. CREATE - Usando Callbacks
    console.log("1. 📝 CREATE - Creando nuevo usuario (Callbacks)");
    console.log("------------------------------------------------");

    const nuevoUsuario = await usuarioController.crearUsuario({
      nombre: "Laura Rodríguez",
      email: "laura.rodriguez@example.com",
      rol: "editor",
    });

    console.log("✅ Usuario creado:", nuevoUsuario);
    console.log();

    // 2. READ - Usando Async/Await
    console.log("2. 📖 READ - Consultando usuarios (Async/Await)");
    console.log("---------------------------------------------");

    console.log("Usuarios activos:");
    const usuariosActivos = await usuarioController.obtenerUsuariosActivos();
    usuariosActivos.forEach((usuario, index) => {
      console.log(
        `${index + 1}. ${usuario.nombre} (${usuario.email}) - ${usuario.rol}`
      );
    });
    console.log();

    console.log("Consultando usuario específico:");
    const usuarioEspecifico = await usuarioController.obtenerUsuarioPorId(
      nuevoUsuario.id
    );
    if (usuarioEspecifico) {
      console.log(
        `Usuario encontrado: ${usuarioEspecifico.nombre} (${usuarioEspecifico.email})`
      );
    }
    console.log();

    // 3. UPDATE - Usando Promises
    console.log("3. ✏️  UPDATE - Actualizando usuario (Promises)");
    console.log("---------------------------------------------");

    await usuarioController
      .actualizarUsuario(nuevoUsuario.id, {
        nombre: "Laura Rodríguez Gómez",
        rol: "admin",
      })
      .then((usuario) => {
        console.log("✅ Usuario actualizado:", usuario);
        return usuario;
      })
      .catch((error) => {
        console.error("❌ Error al actualizar usuario:", error.message);
        throw error;
      });

    console.log();

    // 4. DELETE - Usando Async/Await
    console.log("4. 🗑️  DELETE - Eliminando usuario (Async/Await)");
    console.log("----------------------------------------------");

    console.log("Eliminación lógica (desactivar):");
    const eliminadoLogicamente = await usuarioController.eliminarUsuario(
      nuevoUsuario.id,
      false
    );
    console.log(`✅ Usuario eliminado lógicamente: ${eliminadoLogicamente}`);

    // Verificar que el usuario está inactivo
    const usuarioInactivo = await usuarioController.obtenerUsuarioPorId(
      nuevoUsuario.id
    );
    if (usuarioInactivo) {
      console.log(
        `Usuario ahora está: ${usuarioInactivo.activo ? "activo" : "inactivo"}`
      );
    }
    console.log();

    // Crear otro usuario para demostrar eliminación física
    console.log("Creando otro usuario para eliminación física...");
    const otroUsuario = await usuarioController.crearUsuario({
      nombre: "Temporal User",
      email: "temporal@example.com",
      rol: "visitante",
    });

    console.log("Eliminación física (borrar completamente):");
    const eliminadoFisicamente = await usuarioController.eliminarUsuario(
      otroUsuario.id,
      true
    );
    console.log(`✅ Usuario eliminado físicamente: ${eliminadoFisicamente}`);

    // Verificar que el usuario ya no existe
    const usuarioNoEncontrado = await usuarioController.obtenerUsuarioPorId(
      otroUsuario.id
    );
    console.log(`Usuario aún existe: ${usuarioNoEncontrado !== null}`);
    console.log();

    // Verificación final de usuarios
    console.log("5. 🔍 VERIFICACIÓN FINAL - USUARIOS");
    console.log("-----------------------------------");
    const usuariosFinales = await usuarioController.obtenerUsuariosActivos();
    console.log(`Total de usuarios activos: ${usuariosFinales.length}`);
    usuariosFinales.forEach((usuario, index) => {
      console.log(
        `${index + 1}. ${usuario.nombre} (${usuario.email}) - ${usuario.rol}`
      );
    });

    console.log("\n" + "=".repeat(50));
    console.log("🏨 MÓDULO DE RESERVAS");
    console.log("=".repeat(50) + "\n");

    // 1. CREATE - Creando nueva reserva
    console.log("1. 📅 CREATE - Creando nueva reserva");
    console.log("------------------------------------");

    const nuevaReserva = await reservaController.crearReserva({
      usuarioId: "550e8400-e29b-41d4-a716-446655440001", // Juan Pérez
      restauranteId: "770e8400-e29b-41d4-a716-446655440001",
      fechaHora: new Date("2025-11-15T20:00:00Z"),
      numeroPersonas: 3,
      notas: "Cumpleaños sorpresa",
    });

    console.log("✅ Reserva creada:", {
      id: nuevaReserva.id,
      usuarioId: nuevaReserva.usuarioId,
      restauranteId: nuevaReserva.restauranteId,
      fechaHora: nuevaReserva.fechaHora.toISOString(),
      numeroPersonas: nuevaReserva.numeroPersonas,
      estado: nuevaReserva.estado,
      notas: nuevaReserva.notas,
    });
    console.log();

    // 2. READ - Consultando reservas
    console.log("2. 📖 READ - Consultando reservas");
    console.log("--------------------------------");

    console.log("Todas las reservas:");
    const todasLasReservas = await reservaController.listarReservas();
    todasLasReservas.slice(0, 3).forEach((reserva, index) => {
      console.log(
        `${index + 1}. Reserva ${reserva.id.slice(-8)} - ${reserva.numeroPersonas} personas - ${reserva.estado} (${reserva.fechaHora.toLocaleDateString()})`
      );
    });

    console.log("\nReservas activas:");
    const reservasActivas = await reservaController.listarReservas({ soloActivas: true });
    reservasActivas.slice(0, 3).forEach((reserva, index) => {
      console.log(
        `${index + 1}. Reserva ${reserva.id.slice(-8)} - ${reserva.numeroPersonas} personas (${reserva.fechaHora.toLocaleDateString()})`
      );
    });

    console.log("\nConsultando reserva específica:");
    const reservaEspecifica = await reservaController.obtenerReservaPorId(nuevaReserva.id);
    if (reservaEspecifica) {
      console.log(
        `Reserva encontrada: ${reservaEspecifica.numeroPersonas} personas para el ${reservaEspecifica.fechaHora.toLocaleDateString()} - Estado: ${reservaEspecifica.estado}`
      );
    }
    console.log();

    // 3. UPDATE - Actualizando reserva
    console.log("3. ✏️  UPDATE - Actualizando reserva");
    console.log("-----------------------------------");

    await reservaController
      .actualizarReserva(nuevaReserva.id, {
        numeroPersonas: 5,
        estado: "confirmada",
        notas: "Cumpleaños sorpresa - ¡Confirmada!",
      })
      .then((reserva) => {
        console.log("✅ Reserva actualizada:", {
          id: reserva.id,
          numeroPersonas: reserva.numeroPersonas,
          estado: reserva.estado,
          notas: reserva.notas,
        });
        return reserva;
      })
      .catch((error) => {
        console.error("❌ Error al actualizar reserva:", error.message);
        throw error;
      });

    console.log();

    // 4. DELETE - Eliminando reserva
    console.log("4. 🗑️  DELETE - Eliminando reserva");
    console.log("----------------------------------");

    console.log("Cancelando reserva (eliminación lógica):");
    const reservaCancelada = await reservaController.eliminarReserva(nuevaReserva.id, false);
    console.log(`✅ Reserva cancelada: ${reservaCancelada}`);

    // Verificar que la reserva está cancelada
    const reservaVerificada = await reservaController.obtenerReservaPorId(nuevaReserva.id);
    if (reservaVerificada) {
      console.log(`Estado de la reserva ahora: ${reservaVerificada.estado}`);
    }
    console.log();

    // Verificación final de reservas
    console.log("5. 🔍 VERIFICACIÓN FINAL - RESERVAS");
    console.log("-----------------------------------");
    const reservasFinales = await reservaController.listarReservas({ soloActivas: true });
    console.log(`Total de reservas activas: ${reservasFinales.length}`);

    console.log("\nPrimeras 5 reservas activas:");
    reservasFinales.slice(0, 5).forEach((reserva, index) => {
      console.log(
        `${index + 1}. ${reserva.numeroPersonas} personas - ${reserva.estado} (${reserva.fechaHora.toLocaleDateString()})`
      );
    });

  } catch (error) {
    console.error("❌ Error en la ejecución:", error);
  }
}

// Ejecutar el programa principal
main()
  .then(() => {
    console.log("\n🎉 Sistema de Usuarios y Reservas ejecutado exitosamente!");
  })
  .catch((error) => {
    console.error("\n💥 Error fatal:", error);
    process.exit(1);
  });
