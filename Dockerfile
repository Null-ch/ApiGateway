FROM node:14-alpine
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force && \
    npm install --production

COPY . .

RUN mkdir -p logs && \
    chown -R node:node /app

USER node
EXPOSE 3005
CMD ["npm", "start"] 