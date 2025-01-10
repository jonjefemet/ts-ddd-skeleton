current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

# Ejecutar pnpm install en la imagen Docker
install-depenencies:
	docker run --rm -v $(current-dir):/app -w /app ts-ddd-skeleton-app sh -c "pnpm install"

build:
	docker compose build

test:
	docker run --rm -v $(current-dir):/app -w /app ts-ddd-skeleton-app sh -c "pnpm test"
