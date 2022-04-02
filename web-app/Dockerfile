FROM docker:20.10.14

RUN apk add --no-cache nodejs npm

COPY ./src /usr/src/app
EXPOSE 8080
ENTRYPOINT ["node", "/usr/src/app/index.js"]
