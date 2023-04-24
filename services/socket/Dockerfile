FROM node:18

WORKDIR /socket/
COPY ./package.json /socket/
COPY ./yarn.lock /socket/
RUN yarn install

COPY . /socket/
CMD yarn start:dev