FROM mongo:3.4.18-jessie

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD secret
ENV MONGO_INITDB_DATABASE earth

EXPOSE 27017

ADD mongo-init.js /docker-entrypoint-initdb.d/
