FROM node:18.12

ENV PRJ_PATH /var/www/cms/loan

RUN mkdir -p ${PRJ_PATH}

COPY . ${PRJ_PATH}

RUN cd ${PRJ_PATH} && npm install

WORKDIR ${PRJ_PATH}

CMD ["npm", "run", "start"]