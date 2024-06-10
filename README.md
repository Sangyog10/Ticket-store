# Ticketing App

Ticketing App is built on a microservice architecture leveraging various tools such as Docker, Kubernetes, Skaffold, Node.js, Redis,NATS streaming server.

## Requirements

Ensure the following prerequisites are met before running the application:

1. **Docker**: Install Docker to containerize and manage application dependencies.
2. **Minikube**: Install Minikube to facilitate local Kubernetes cluster setup.
3. **Skaffold**: Install Skaffold for automating Kubernetes resource deploymentcom.

## Getting Started

Follow these steps to set up and run the project:

### 1. Start Docker Daemon

Ensure Docker daemon is running using the following command:

```bash
sudo systemctl start docker
```

### 2. Start Minikube

Initialize Minikube with the following command:

```bash
minikube start
```

### 3. Enable Ingress

Enable Ingress for routing external traffic to Kubernetes services:

```bash
minikube addons enable ingress
```

### 4. Run the Project

To start the project, execute the following command:

```bash
skaffold dev
```

## Installation

### 1. Docker

If Docker is not installed, download and install it from the official Docker website: [Get Docker](https://www.docker.com/get-started).

### 2. Minikube

Install Minikube to set up a local Kubernetes cluster. Refer to the official Minikube documentation for installation instructions: [Minikube Documentation](https://minikube.sigs.k8s.io/docs/).

### 3. Skaffold

Install Skaffold to streamline the development workflow for Kubernetes applications. Refer to the Skaffold documentation for installation instructions: [Skaffold Documentation](https://skaffold.dev/docs/install/).

## Testing

To ensure the integrity of the project, comprehensive testing is essential. Follow these steps to run tests for individual components:

1. Navigate to each directory containing a microservice.
2. Run the following commands:

```bash
npm install
npm run test
```

## Conclusion

By following these steps, you'll have the Ticketing App up and running locally, ready for development, testing, and further enhancements.
