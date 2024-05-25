# Proyecto Frontend con Next.js

Este es un proyecto Frontend configurado para ejecutarse en un contenedor Docker utilizando Docker Compose.

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js y npm (si no están incluidos en tu contenedor Docker)

## Uso de Docker

### Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
docker compose run --rm node npm i
```

### Acceder al shell del contenedor

Si necesitas acceder al shell del contenedor para realizar tareas específicas, ejecuta:

```bash
docker compose run --rm --service-ports node bash
```

### Iniciar la aplicación

Para iniciar la aplicación, dentro del shell del contenedor, ejecuta:

```bash
npm start
```

Esto levantará el servidor de desarrollo de Next.js y podrás acceder a la aplicación en `http://localhost:3000`.

## Comandos útiles

- Para detener todos los contenedores:
  ```bash
  docker compose down
  ```

- Para ver los logs de los contenedores:
  ```bash
  docker compose logs
  ```

## Notas adicionales

- Asegúrate de tener configurado correctamente el archivo `docker-compose.yml` para este proyecto.
- Si necesitas realizar cambios en la configuración de Docker o en el código fuente, consulta la documentación de Docker Compose y Next.js para obtener más detalles.

¡Gracias por utilizar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en contactar al mantenedor del proyecto.
