.PHONY: build run stop clean logs test help

# Переменные
DOCKER_COMPOSE = docker-compose
DOCKER = docker
NPM = npm

# Цвета для вывода
GREEN = \033[0;32m
NC = \033[0m

help: ## Показать справку
	@echo "Доступные команды:"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  ${GREEN}%-15s${NC} %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Собрать Docker образ
	$(DOCKER_COMPOSE) build

run: ## Запустить контейнеры
	$(DOCKER_COMPOSE) up -d

stop: ## Остановить контейнеры
	$(DOCKER_COMPOSE) down

clean: ## Очистить Docker (остановить контейнеры и удалить образы)
	$(DOCKER_COMPOSE) down -v
	$(DOCKER) rmi core-mobile-gateway

logs: ## Показать логи
	$(DOCKER_COMPOSE) logs -f

test: ## Запустить тесты
	$(NPM) test

install: ## Установить зависимости
	$(NPM) install

dev: ## Запустить в режиме разработки
	$(NPM) run dev

# Специальные команды для разработки
restart: stop run ## Перезапустить контейнеры

rebuild: clean build run ## Полная пересборка проекта

# Команды для работы с контейнером
shell: ## Войти в контейнер
	$(DOCKER_COMPOSE) exec api-gateway sh

status: ## Показать статус контейнеров
	$(DOCKER_COMPOSE) ps 