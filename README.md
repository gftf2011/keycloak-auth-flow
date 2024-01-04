<div align="center">
  <h1>🔑 keycloak auth flow 🔑</h1>
</div>

<div align="center">
  <a href="#page_facing_up-about">About</a> • 
  <a href="#hammer_and_wrench-supported-os">Supported OS</a> •
  <a href="#clipboard-required-tools">Required Tools</a> •
  <a href="#racing_car-running-project">Running Project</a> •
  <a href="#memo-license">License</a>
</div>

## :page_facing_up: About

This is a project that shows how to integrate a keycloak client with a React.JS application and a Node.JS application

Here you'll find how to run a keycloak container with Docker and Docker-Compose and how to automate the Keycloak Realm and Clients creation !

<br />

## :hammer_and_wrench: Supported OS

- [x] Mac OS
- [x] Linux
- [x] Windows - WSL 

<br/>

## :clipboard: Required Tools

- [x] Node - [https://nodejs.org/](https://nodejs.org/)
  - Node version: 20.x.x
  - npm version: 10.x.x
- [x] Docker - [https://www.docker.com/](https://www.docker.com/)

<br/>

## :racing_car: Running Project
1 - Open the terminal and type:
```sh
  $ npm run docker:up:dev
```

2 - Go to the web APP and run the web app:
```sh
  $ nvm use
  $ npm i
  $ npm run start:dev
```

3 - Open a new terminal and run the backend app:
```sh
  $ nvm use
  $ npm i
  $ npm run start:dev
```

4 - Access the http://localhost:5173/ to enter in the home page

5 - Access the http://localhost:5173/sign-in to register a user or enter with login

<br/>

## :memo: License

This project is under MIT license. See the [LICENSE](https://github.com/gftf2011/keycloak-auth-flow/blob/main/LICENSE) file for more details.

---

Made with lots of :heart: by [Gabriel Ferrari Tarallo Ferraz](https://www.linkedin.com/in/gabriel-ferrari-tarallo-ferraz/)
