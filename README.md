<h1 align="center">Sal's Personal Portfolio Website</h1>

<p align="center">
  <a href="http://sal-anvarov.com/" target="blank"><img src="./apps/personal-portfolio/public/assets/thumbnails/website.png" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A modern <a href="https://nextjs.org" target="blank" rel="noreferrer noopener">Next.js</a> portfolio website built with 💙 and ☕ by Sal Anvarov.</p>

Table of Contents:

1. [Description](#-description)
2. [Prerequisites](#%EF%B8%8F-prerequisites)
3. [Deployment](#-deployment)
4. [Testing](#-testing)

🔎 This repo was created with [Nx](https://nx.dev/).

### 📚 Description

This portfolio website was built with ease of extensibility in mind. It comes with **MDX** for case-studies and blog management and json files for general page content.

---

### 🛠️ Prerequisites

#### Non Docker

- Please make sure to have [Node.js](https://nodejs.org/en/download/) (16+) locally by downloading the Javascript runtime via `brew`, `choco`, or `apt-get`.

#### Docker 🐳

- Please make sure to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) operational to quickly compose the required dependencies. Then follow the docker procedure outlined below.

---

### 🚀 Deployment

#### Manual Deployment without Docker

- Clone the repo via `git clone https://github.com/msanvarov/personal-portfolio`.

- Navigate to the root directory of repo via `cd personal-portfolio`.

- Download dependencies via `npm i` or `yarn`.

- Start the app in development mode via `npm run start` (the app will be exposed on http://localhost:4200; not to conflict with the default React, Angular, or Vue ports).

> Remark: In the docker deployment, the UI is automatically started and served by the API.

#### Deploying with Docker 🐳

[Open in Docker Dev Environments <img src="assets/open-link.svg" alt="Open in Docker Dev Environments" align="top"/>](https://open.docker.com/dashboard/dev-envs?url=https://github.com/msanvarov/personal-portfolio/tree/master)

- Execute the following command in-app directory:

```bash
# creates and loads the docker container in detached mode with the required configuration
$ docker-compose up -d
```

- The following command will download dependencies and execute the web application on http://localhost:80 (deployed behind a Nginx reverse proxy).

---

### ✅ Testing

#### Docker 🐳

```bash
# Start the docker container if it's not running
$ docker start frontend

# unit tests
$ docker exec -it frontend npm run test

```

#### Non-Docker

```bash
# execute test
$ npm run test
```

---

### 🏗️ Progress

|                                                            Branches | Status |
| ------------------------------------------------------------------: | :----- |
|             [main](https://github.com/msanvarov/personal-portfolio) | ✅     |
| [feat/\*](https://github.com/msanvarov/personal-portfolio/branches) | 🚧     |

<!-- > Remark: This template was employed to create a [Real World example app](https://github.com/gothinkster/realworld) on [Github](). -->

---

### 👥 Support

PRs are appreciated, I fully rely on the passion ❤️ of the OS developers.

---

## License

This personal portfolio website is [MIT licensed](LICENSE).

[Author](https://sal-anvarov.com/)
