# SalesPulse CRM Deployment Guide

This document outlines the steps to deploy SalesPulse CRM to a production environment.

## Prerequisites

- A Linux server or Kubernetes cluster
- Docker and Docker Compose installed (for Docker Compose deployment)
- Domain name and SSL certificate (recommended)
- PostgreSQL, Redis, MinIO, Elasticsearch, RabbitMQ (can be deployed via Docker or managed services)
- Node.js installed (for building frontend/backend if not using Docker)

## Deployment Options

### 1. Docker Compose (Simple Deployment)

1. Clone the repository to your server.

2. Configure environment variables in a `.env` file or export them in your shell:

```
DATABASE_URL=postgresql://user:password@host:5432/salespulse_db
JWT_SECRET=your_jwt_secret
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
# Add other necessary env vars
```

3. Start backend services and dependencies:

```bash
docker-compose up -d
```

4. Build and start the frontend and backend (if separate):

```bash
cd src/app
npm install
npm run build
npm start
```

5. Configure a reverse proxy (e.g., Nginx) to route traffic to the frontend and backend services.

6. Set up SSL certificates (e.g., via Let's Encrypt).

### 2. Kubernetes (Production-Grade Deployment)

1. Prepare Kubernetes manifests or Helm charts for all services:

- Backend services (auth, leads, opportunities, quotes, invoices, payments)
- PostgreSQL, Redis, MinIO, Elasticsearch, RabbitMQ
- API Gateway and frontend deployment
- Ingress controller for routing and SSL termination

2. Apply manifests or Helm charts:

```bash
kubectl apply -f k8s/
```

3. Configure secrets and config maps for environment variables.

4. Monitor pods and services, ensure readiness and liveness probes are configured.

5. Set up horizontal pod autoscaling and resource limits.

## Additional Recommendations

- Use a CI/CD pipeline (GitHub Actions, GitLab CI) to automate testing, building, and deployment.

- Monitor logs and metrics using ELK stack or Loki + Grafana.

- Regularly backup PostgreSQL and MinIO data.

- Secure your deployment with firewalls and network policies.

## Summary

SalesPulse CRM can be deployed using Docker Compose for simplicity or Kubernetes for scalability and robustness. Proper environment configuration, reverse proxy setup, and monitoring are essential for a successful production deployment.

For detailed Kubernetes manifests and CI/CD pipeline examples, refer to the `k8s/` directory and `.github/workflows/` in the repository (to be added).

---
