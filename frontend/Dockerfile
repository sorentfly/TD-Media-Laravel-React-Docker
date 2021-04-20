FROM node:14.16.1-alpine
WORKDIR /app/frontend

COPY . .

RUN rm -rvf node_modules
RUN npm install

EXPOSE 80 80
CMD npm start