FROM docker:20.10.14

RUN apk add --no-cache nodejs npm

COPY ./src /usr/src/app
EXPOSE 8080
WORKDIR /usr/src/app/
ENTRYPOINT ["node", "index.js"]
