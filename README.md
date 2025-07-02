# Pong Game

A simple Pong web game with CI/CD pipeline for build, test, SonarQube analysis, Docker image build, and push.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [SonarQube](https://www.sonarqube.org/) or [SonarCloud](https://sonarcloud.io/)

## Running locally

```bash
npm install
npm start
```
Visit [http://localhost:8080](http://localhost:8080).

## CI/CD

- GitHub Actions pipeline for build, test, SonarQube scan, Docker image build and push.
- Update `.sonarcloud.properties` with your project/organization details.
- Set `SONAR_TOKEN` and `SONAR_HOST_URL` as GitHub repository secrets.
- Uses GitHub Container Registry (`ghcr.io`). Update `REGISTRY` in workflow if using another registry.

## Docker

```bash
docker build -t pong-game .
docker run -p 8080:8080 pong-game
```