# php-playground

Provides a web interface for PHP code execution. (Like any other online code editor)

## Implementation

The web server runs using Node/Express.js inside of a docker container. This web server will start new, temporary containers to run the inputed PHP code.

## TODO:

* Remove all hard coding of the volume path (still hardcoded in docker-compose.yml, I believe I saw a way of configuring this thru a .env somewhere before)

* Unit tests?

## Demo

![Demo Gif](https://thumbs.gfycat.com/DeadlyForsakenDogwoodclubgall-max-1mb.gif)
