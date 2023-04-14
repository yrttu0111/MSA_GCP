FROM node:18

WORKDIR /myfolder/
COPY package.json /myfolder/
COPY yarn.lock /myfolder/
RUN yarn install

COPY . /myfolder/

RUN yarn build
CMD yarn start:prod