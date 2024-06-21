# stage 1 building the code

FROM node:18-alpine as builder

WORKDIR /usr/app

COPY . .

RUN npm install --quit --no-option --no-fund --loglevel=error

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]