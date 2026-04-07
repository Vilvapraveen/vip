FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM maven:3.9.9-eclipse-temurin-17 AS backend-build
WORKDIR /app

COPY backend/pom.xml backend/pom.xml
COPY backend/src backend/src
COPY --from=frontend-build /app/backend/src/main/resources/static backend/src/main/resources/static

RUN mvn -f backend/pom.xml -DskipTests package

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=backend-build /app/backend/release-build/jayas-organics-admin-1.0.0-exec.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
