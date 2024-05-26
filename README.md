# Proyecto Frontend con Next.js

Este es un proyecto Frontend configurado para ejecutarse en un contenedor Docker utilizando Docker Compose.

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js y npm (si no están incluidos en tu contenedor Docker)

## Uso de Docker

### Construir la Imagen

Ejecuta el siguiente comando para construir la imagen Docker del proyecto:

```bash
docker build -t {$nombre-del-proyecto} .
```

### Levantar la aplicación en producción

Para levantar la aplicación en modo producción, ejecuta:

```bash
docker compose up
```

Esto levantará el servidor de producción de Next.js y podrás acceder a la aplicación en `http://localhost:3000`.

### Acceder al shell del contenedor

Si necesitas acceder al shell del contenedor para realizar tareas específicas, ejecuta:

```bash
docker compose run --rm --service-ports frontend bash
```

### Iniciar la aplicación

Para iniciar la aplicación en modo desarrollo, dentro del shell del contenedor, ejecuta:

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
