# ApiGateway

API Gateway для мобильного приложения или иных целей, обеспечивающий единую точку входа для взаимодействия с различными сервисами.

## Описание

Core Mobile Gateway - это прокси-сервер, который:
- Обеспечивает единую точку входа для всех API-запросов
- Управляет аутентификацией и авторизацией
- Логирует все входящие и исходящие запросы
- Добавляет необходимые заголовки для каждого сервиса
- Обеспечивает безопасность и контроль доступа

## Архитектура

Проект построен с использованием принципов SOLID и следует современным практикам разработки:
- Модульная структура
- Четкое разделение ответственности
- Конфигурируемость через переменные окружения
- Подробное логирование

## Требования

- Node.js 14+
- npm 6+
- Docker (опционально)

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Null-ch/ApiGateway.git
cd ApiGateway
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

4. Настройте переменные окружения в файле `.env`:
```env
# Сервис 1
USER_SERVICE_URL=https://your-user-service.com
USER_SERVICE_TIMEOUT=5000
# Заголовки которые можно добавить к проксированному запросу
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret

# Сервис 2
SERVICE_URL=https://your-service.com
SERVICE_TIMEOUT=5000
# Заголовки которые можно добавить к проксированному запросу
APP_ID=your_app_id

# Настройки логирования
LOG_LEVEL=info
LOG_FILE_PATH=logs/gateway.log
```

## Запуск

### Разработка
```bash
npm run dev
```

### Продакшн
```bash
npm start
```

### Docker
```bash
docker build -t core-mobile-gateway .
docker run -p 3000:3000 --env-file .env core-mobile-gateway
```

## API Принцип работы
При запросе к сервису по адресу он перенаправляет запрос на указанный вами сервис
На данный момент в проекте 2 сервиса, User (/api/v1/user) и Service (/api/v1/service) соответственно
Эндпоинты можно изменить в proxy-service.js 

## Логирование

Сервис логирует:
- Входящие запросы
- Прокси-запросы к сервисам
- Ответы от сервисов
- Ошибки

Логи сохраняются в:
- Файл (указывается в `LOG_FILE_PATH`)
- Консоль

Уровень логирования настраивается через переменную `LOG_LEVEL`:
- `debug` - для отладки
- `info` - для продакшена
- `warn` - для предупреждений
- `error` - для ошибок

## Безопасность

Сервис обеспечивает:
- Добавление необходимых заголовков аутентификации
- Валидацию входящих запросов
- Защиту от распространенных атак (helmet)
- CORS-политики

## Мониторинг

Для мониторинга доступны:
- Логи запросов
- Статус сервисов
- Время ответа
- Коды ошибок

## Разработка

### Структура проекта
```
src/
├── config/         # Конфигурация приложения
├── controllers/    # Контроллеры для обработки запросов
├── middleware/     # Middleware для логирования и обработки
├── services/       # Сервисы для работы с API
├── utils/          # Вспомогательные функции
└── index.js        # Точка входа
```

### Добавление нового сервиса

1. Добавьте конфигурацию в `src/config/app.js`:
```javascript
services: {
  newService: {
    url: process.env.NEW_SERVICE_URL,
    timeout: parseInt(process.env.NEW_SERVICE_TIMEOUT),
    headers: {
      // специфичные заголовки
    }
  }
}
```

2. Добавьте обработчик в `src/controllers/proxy-controller.js`:
```javascript
handleNewServiceRequest(req, res) {
  return this.newService.proxyRequest(req, res);
}
```

3. Добавьте маршрут в `src/index.js`:
```javascript
app.use('/api/v1/new-service', proxyController.handleNewServiceRequest.bind(proxyController));
```

## Лицензия

MIT
