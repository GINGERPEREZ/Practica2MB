import { PaymentService } from "./application/services/paymentService";
import { PaymentRepositoryMemory } from "./infrastructure/database/in_memory/paymentRepositoryInMemory";

async function main() {
  try {
    console.log("🚀 Iniciando Sistema de Gestión de Pagos...\n");

    // Configurar la aplicación con Clean Architecture
    const paymentRepository = new PaymentRepositoryMemory();
    const paymentService = new PaymentService(paymentRepository);

    console.log("=".repeat(60));
    console.log("           DEMOSTRACIÓN DEL SISTEMA DE PAGOS");
    console.log("=".repeat(60));

    // 1. Crear varios pagos
    console.log("\n📝 1. CREANDO PAGOS...\n");

    const createResult1 = await paymentService.createPayment({
      payerId: "USER001",
      paymentType: "RESERVATION",
      targetId: "RES001",
      amount: 150.5,
    });

    console.log("✅ Resultado creación pago 1:");
    console.log(`   Éxito: ${createResult1.success}`);
    console.log(`   Mensaje: ${createResult1.message}`);
    if (createResult1.data) {
      console.log(`   ID Pago: ${createResult1.data.paymentId}`);
      console.log(`   Monto: $${createResult1.data.amount}`);
      console.log(`   Estado: ${createResult1.data.paymentStatus}\n`);
    }

    const createResult2 = await paymentService.createPayment({
      payerId: "USER002",
      paymentType: "SUBSCRIPTION",
      targetId: "SUB001",
      amount: 29.99,
    });

    console.log("✅ Resultado creación pago 2:");
    console.log(`   Éxito: ${createResult2.success}`);
    console.log(`   Mensaje: ${createResult2.message}`);
    if (createResult2.data) {
      console.log(`   ID Pago: ${createResult2.data.paymentId}`);
      console.log(`   Monto: $${createResult2.data.amount}`);
      console.log(`   Estado: ${createResult2.data.paymentStatus}\n`);
    }

    // 2. Listar todos los pagos
    console.log("� 2. LISTANDO TODOS LOS PAGOS...\n");

    const listResult = await paymentService.getAllPayments();
    console.log("✅ Resultado listado:");
    console.log(`   Éxito: ${listResult.success}`);
    console.log(`   Mensaje: ${listResult.message}`);
    console.log(`   Total pagos: ${listResult.data?.length || 0}`);

    if (listResult.data && listResult.data.length > 0) {
      listResult.data.forEach((payment, index) => {
        console.log(`   Pago ${index + 1}:`);
        console.log(`     - ID: ${payment.paymentId}`);
        console.log(`     - Pagador: ${payment.payerId}`);
        console.log(`     - Tipo: ${payment.paymentType}`);
        console.log(`     - Monto: $${payment.amount}`);
        console.log(`     - Estado: ${payment.paymentStatus}`);
      });
    }

    // 3. Buscar un pago específico
    console.log("\n🔍 3. BUSCANDO PAGO ESPECÍFICO...\n");

    if (createResult1.data) {
      const searchResult = await paymentService.getPaymentById({
        paymentId: createResult1.data.paymentId,
      });

      console.log("✅ Resultado búsqueda:");
      console.log(`   Éxito: ${searchResult.success}`);
      console.log(`   Mensaje: ${searchResult.message}`);
      if (searchResult.data) {
        console.log(`   Pago encontrado:`);
        console.log(`     - ID: ${searchResult.data.paymentId}`);
        console.log(`     - Pagador: ${searchResult.data.payerId}`);
        console.log(`     - Monto: $${searchResult.data.amount}`);
        console.log(`     - Estado actual: ${searchResult.data.paymentStatus}`);
      }
    }

    // 4. Actualizar estado de pago
    console.log("\n🔄 4. ACTUALIZANDO ESTADO DE PAGO...\n");

    if (createResult1.data) {
      const updateResult = await paymentService.updatePaymentStatus({
        paymentId: createResult1.data.paymentId,
        status: "COMPLETED",
      });

      console.log("✅ Resultado actualización:");
      console.log(`   Éxito: ${updateResult.success}`);
      console.log(`   Mensaje: ${updateResult.message}`);
      if (updateResult.data) {
        console.log(
          `   Estado actualizado a: ${updateResult.data.paymentStatus}`
        );
      }
    }

    // 5. Intentar crear un pago con datos inválidos
    console.log("\n❌ 5. PROBANDO VALIDACIONES (Datos inválidos)...\n");

    const invalidResult = await paymentService.createPayment({
      payerId: "",
      paymentType: "INVALID_TYPE",
      targetId: "TARGET001",
      amount: -50,
    });

    console.log("❌ Resultado pago inválido:");
    console.log(`   Éxito: ${invalidResult.success}`);
    console.log(`   Mensaje: ${invalidResult.message}`);

    // 6. Eliminar un pago
    console.log("\n🗑️ 6. ELIMINANDO PAGO...\n");

    if (createResult2.data) {
      const deleteResult = await paymentService.deletePayment({
        paymentId: createResult2.data.paymentId,
      });

      console.log("✅ Resultado eliminación:");
      console.log(`   Éxito: ${deleteResult.success}`);
      console.log(`   Mensaje: ${deleteResult.message}`);
    }

    // 7. Verificar lista final
    console.log("\n📋 7. LISTA FINAL DE PAGOS...\n");

    const finalListResult = await paymentService.getAllPayments();
    console.log("✅ Lista final:");
    console.log(
      `   Total pagos restantes: ${finalListResult.data?.length || 0}`
    );

    if (finalListResult.data && finalListResult.data.length > 0) {
      finalListResult.data.forEach((payment, index) => {
        console.log(
          `   Pago ${index + 1}: ${payment.paymentId} - Estado: ${
            payment.paymentStatus
          }`
        );
      });
    }

    console.log("\n" + "=".repeat(60));
    console.log("           DEMOSTRACIÓN COMPLETADA ✅");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("❌ Error al ejecutar la demostración:", error);
  }
}

// Ejecutar la aplicación
main();
