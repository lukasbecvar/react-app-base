# React app base
Base react app template repository with docker-env, tailwind, router base, vite server and electorn app builder.

# Base
Basic SPA app with simple router includes 2 components as examples of how to create them.

# Environment
The NPM/Node stack is running in Docker for development, and the app build is a basic React app & Docker image with Nginx web server or for a desktop Electron application.

# Build
## Simple web app
Using ``scripts/build.sh``, you can build a simple application that you can then deploy to a web server like Apache or Nginx. 
## Docker image 
Using Dockerfile included in the project, you can build a Docker image and automatically upload it to GitHub Packages after release using the preconfigured action: [workflow](.github/workflows/docker-build.yml).
## Electron app
Using ``scripts/build-electron.sh``, you can build a desktop application.

## Dependencies
* Electron
    * [Website](https://www.electronjs.org)
* Node.js
    * [Website](https://nodejs.org)
* React
    * [Website](https://reactjs.org)
* Tailwind CSS
    * [Website](https://tailwindcss.com)
* TsParticles
    * [Website](https://particles.js.org)

## License
This software is licensed under the [MIT license](LICENSE).
