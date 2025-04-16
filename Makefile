.PHONY: build run stop clean logs test help

DOCKER_COMPOSE = docker-compose
DOCKER = docker
NPM = npm

GREEN = \033[0;32m
NC = \033[0m

help:
	@echo "Доступные команды:"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  ${GREEN}%-15s${NC} %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build:
	$(DOCKER_COMPOSE) build

run:
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) down

clean:
	$(DOCKER_COMPOSE) down -v
	$(DOCKER) rmi core-mobile-gateway

logs:
	$(DOCKER_COMPOSE) logs -f

test:
	$(NPM) test

install:
	$(NPM) install

dev:
	$(NPM) run dev

restart: stop run

rebuild: clean build run

shell:
	$(DOCKER_COMPOSE) exec api-gateway sh

status:
	$(DOCKER_COMPOSE) ps 