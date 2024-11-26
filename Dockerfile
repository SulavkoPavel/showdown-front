# Этап сборки
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы
COPY . .

# Сборка приложения
RUN npm run build

# Этап запуска
FROM node:16 AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только собранные файлы
COPY --from=build /app/dist ./dist

# Устанавливаем serve для раздачи статических файлов
RUN npm install -g serve

# Команда запуска (слушаем 0.0.0.0)
CMD ["serve", "-s", "dist", "-l", "0.0.0.0:8081", "-n"]

# Открываем порт 8081 для HTTP
EXPOSE 8081
