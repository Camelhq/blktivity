FROM node:8
# RUN npm install webpack -g
WORKDIR ./apps
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=8080

CMD npm run start
EXPOSE 8080
