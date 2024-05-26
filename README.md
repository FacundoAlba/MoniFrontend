# Proyecto Frontend con Next.js

Este es un proyecto Frontend configurado para ejecutarse en un contenedor Docker utilizando Docker Compose.

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js y npm (si no están incluidos en tu contenedor Docker)

## Uso de Docker

### Construir la Imagen

   `docker compose run --rm node npm i`

### Acceder al Shell del Contenedor

Si necesitas acceder al shell del contenedor para realizar tareas específicas, ejecuta:

```bash
 docker compose run --rm --service-ports node bash
```

### Iniciar la Aplicación

Dentro del shell del contenedor, ejecuta:

```bash
npm run build
```

```bash
npm start
```

Esto levantará el servidor de desarrollo de Next.js y podrás acceder a la aplicación en `http://localhost:3000`.

### Iniciar la Aplicación en Producción

Para iniciar la aplicación en modo de producción, asegúrate de haber construido la imagen y luego ejecuta:

```bash
docker compose up
```

Esto levantará el servidor de producción de Next.js y podrás acceder a la aplicación en `http://localhost:3000`.

## Comandos Útiles

- Para detener todos los contenedores:
  ```bash
  docker compose down
  ```

- Para ver los logs de los contenedores:
  ```bash
  docker compose logs
  ```

- Para reconstruir la imagen sin cache:
  ```bash
  docker compose build --no-cache
  ```

## Notas Adicionales

- Asegúrate de tener configurado correctamente el archivo `docker-compose.yml` para este proyecto.
- Si necesitas realizar cambios en la configuración de Docker o en el código fuente, consulta la documentación de Docker Compose y Next.js para obtener más detalles.
- Si ves el error "Could not find a production build in the '.next' directory," asegúrate de que el comando `yarn build` o `npm run build` se haya ejecutado correctamente dura
