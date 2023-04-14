FROM node:14

WORKDIR /socket-service/
COPY ./package.json /socket-service/
COPY ./yarn.lock /socket-service/
RUN yarn install

COPY . /socket-service/
CMD yarn start:dev