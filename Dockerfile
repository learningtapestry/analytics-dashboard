FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 3000
RUN npm install
RUN npm run build
CMD ["npm", "run", "server"]
