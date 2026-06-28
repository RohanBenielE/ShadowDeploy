# 🚀 ShadowDeploy

> A production-inspired Machine Learning Shadow Deployment Platform built using **React, FastAPI, Docker, Docker Hub, and Kubernetes**.

---

## 📌 Overview

ShadowDeploy demonstrates how organizations can safely validate a new Machine Learning model in production without exposing it directly to users.

For every incoming prediction request:

* Model V1 (Production Model) generates the response shown to the user.
* Model V2 (Shadow Model) processes the same request in the background.
* The router compares both predictions.
* Differences are tracked for monitoring and future deployment decisions.

This approach allows new models to be evaluated on real production traffic without affecting users.

---

## ✨ Features

* Dual Machine Learning Models
* Shadow Deployment Architecture
* FastAPI Microservices
* React Dashboard
* Dockerized Services
* Docker Compose Support
* Kubernetes Deployments
* Kubernetes Services
* Horizontal Scaling
* Rolling Updates
* Docker Hub Image Registry
* REST API Endpoints

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* FastAPI
* Python

### Machine Learning

* Scikit-learn
* Logistic Regression
* Random Forest

### DevOps

* Docker
* Docker Compose
* Docker Hub
* Kubernetes

---

## 📂 Project Structure

```
ShadowDeploy
│
├── frontend/
├── model-v1/
├── model-v2/
├── router/
├── k8s/
├── docker-compose.yml
└── README.md
```

---

## 🐳 Docker

Each microservice is containerized using Docker.

Containers:

* Frontend
* Router
* Model V1
* Model V2

Docker Compose is used for local orchestration.

---

## ☸ Kubernetes

The project is deployed using Kubernetes with:

* Deployments
* Services
* Replica Scaling
* Rolling Updates

Current Deployment:

* Model V1 → 3 Replicas
* Model V2 → 1 Replica
* Router → 1 Replica

---

## 📈 Scaling

Model V1 can be scaled horizontally using:

```bash
kubectl scale deployment model-v1 --replicas=3
```

---

## 🔄 Rolling Update

Rolling updates are supported using:

```bash
kubectl rollout restart deployment model-v1
```

This updates pods gradually without downtime.

---

## 🚀 Future Improvements

* Prometheus Monitoring
* Grafana Dashboard
* CI/CD using GitHub Actions
* Helm Charts
* Istio Service Mesh
* AWS EKS Deployment

---

## 👨‍💻 Author

**Rohan Beniel E**

College of Engineering, Guindy (CEG)
