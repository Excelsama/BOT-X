FROM node:23-alpine
RUN apk add --no-cache git
WORKDIR /app
RUN git clone https://github.com/Excelsama/BOT-X .
COPY package*.json ./
RUN npm install --production
EXPOSE 8080
CMD ["npm", "start"]