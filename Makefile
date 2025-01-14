current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

# Ejecutar pnpm install en la imagen Docker
install-dependencies:
	docker run --rm -v $(current-dir):/app -w /app ts-ddd-skeleton-app sh -c "pnpm install"

build:
	docker compose build

test:
	docker run --rm -v $(current-dir):/app -w /app ts-ddd-skeleton-app sh -c "pnpm test"

# Construir la aplicación Hono.js
build-hono:
	pnpm --filter hono-app run build

# Ejecutar la aplicación Hono.js
run-hono:
	pnpm --filter hono-app run start
