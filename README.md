# Ticketing App

Ticketing App is built on microservice architecture with various tools like docker,kubernetes, skaffold, node , redis, etc.

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

## Deployment

To deploy this project run

```bash
  skaffold dev
```
