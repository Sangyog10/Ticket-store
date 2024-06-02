# Ticketing App
Ticketing App is built on microservice architecture with various tools like docker,kubernetes, skaffold, node , redis, etc.


## Requirements
1. Install Docker
2. Install minikube
3. Install skaffold


## To run the project
To run this project,

```bash
  skaffold dev
```

## Installation

Start docker daemon using the following command

```bash
  sudo systemctl start docker
```

Start minikube with following command

```bash
  minikube start
```

Enable ingress with following command

```bash
  minikube addons enable ingress
```

## To test the project
To test this project, change to each directory and run

```bash
  npm install
  npm run test
```
