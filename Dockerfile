# Используем официальный образ Node.js
FROM node:14-alpine

# Устанавливаем зависимости для сборки
RUN apk add --no-cache python3 make g++

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Очищаем кэш npm и устанавливаем зависимости
RUN npm cache clean --force && \
    npm install --production

# Копируем исходный код
COPY . .

# Создаем директорию для логов
RUN mkdir -p logs && \
    chown -R node:node /app

# Переключаемся на непривилегированного пользователя
USER node

# Открываем порт
EXPOSE 3005

# Запускаем приложение
CMD ["npm", "start"] 