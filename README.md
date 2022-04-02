# php-playground

Provides a web interface for PHP code execution. (Like any other online code editor)

## Implementation

The web server runs using Node/Express.js inside of a docker container. This web server will start new, temporary containers to run the inputed PHP code.

## TODO:

* Implement a safeguard against infinitely running code. Will have some max runtime and kill the PHP containers that run longer than the max allowed.

## Demo

![Demo Gif](https://thumbs.gfycat.com/DeadlyForsakenDogwoodclubgall-max-1mb.gif)
