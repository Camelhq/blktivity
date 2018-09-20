FROM node:8
# RUN npm install webpack -g
WORKDIR ./apps
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=8080
ENV mongodb://<dbuser>:<dbpassword>@ds125912.mlab.com:25912/Thisisatest
ENV DB_DEV=mongodb://localhost:27017/login_demo
ENV SECRET_OR_KEY=something@whatthehell@!
CMD npm run start
EXPOSE 8080
