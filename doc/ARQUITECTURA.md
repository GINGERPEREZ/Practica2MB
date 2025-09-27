# Arquitectura de la aplicación

Este proyecto implementa Clean Architecture y DDD con casos de uso, cumpliendo los paradigmas asíncronos requeridos por la práctica.

## Capas

- Domain: entidades y puertos (interfaces)
- Application: casos de uso
- Infrastructure: repositorios en memoria
- Presentation: controladores
- Shared: contenedor de dependencias

## Arquitectura Hexagonal (Ports & Adapters)

- Ports (puertos): Abstracciones que define el dominio para ser usadas desde la aplicación.
  - Puerto de salida (Outbound): `IUsuarioRepository` en `domain/repositories`.
- Adapters (adaptadores): Implementaciones concretas de puertos.
  - Adaptador de salida (Infraestructura): `UsuarioRepositoryInMemory` implementa `IUsuarioRepository`.
  - Adaptador de entrada (Presentación): `UsuarioController` expone los casos de uso.
- Application (Core): Casos de uso (interactors) que orquestan el flujo: Crear, Actualizar, Leer, Eliminar.

Dirección de dependencias:

Presentation -> Application -> Domain <- Infrastructure

## Paradigmas por operación CRUD

- CREATE: Callbacks con latencia simulada (CrearUsuarioUseCase)
- UPDATE: Promises (ActualizarUsuarioUseCase)
- READ: Async/Await (ObtenerUsuarioPorIdUseCase, ListarUsuariosActivosUseCase)
- DELETE: Async/Await (EliminarUsuarioUseCase)

## Validaciones

- Email regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- Roles permitidos: admin | editor | visitante
- Verificación de existencia en UPDATE y DELETE

## Datos de prueba

El repositorio en memoria inicia con 10 usuarios realistas.

## Inyección de dependencias

El archivo `src/shared/container.ts` crea e inyecta repositorio, casos de uso y controlador.

## Cómo ejecutar

Revisa `README.md` o usa el script de desarrollo para correr el `src/index.ts` que demuestra todas las operaciones con los paradigmas solicitados.

## Dónde van los DTOs según Clean Architecture

- Domain: define únicamente tipos de dominio y contratos (interfaces) que no dependen de frameworks ni de la capa de presentación.
  - Ejemplo: `Usuario`, `Rol`, y los tipos de entrada propios del puerto del repositorio: `UsuarioCreate` y `UsuarioUpdate` en `IUsuarioRepository`.
- Application: los casos de uso reciben estructuras de datos simples. Si necesitas DTOs específicos para orquestación, colócalos aquí. En este proyecto, los casos de uso usan los tipos del dominio (`UsuarioCreate`, `UsuarioUpdate`).
- Presentation: puede tener sus propios DTOs para parsing/validación de entrada de UI/API, pero deben mapearse a los tipos esperados por la capa de aplicación (o directamente a los del dominio).

En resumen, los “DTOs” de entrada/salida de la UI son de Presentation; los contratos con repositorios y tipos de entrada del dominio viven en Domain; y los casos de uso en Application trabajan con esos tipos sin conocer detalles de la UI.
