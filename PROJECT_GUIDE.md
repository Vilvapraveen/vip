# Jaya's Organic Project Guide

## Overview

Jaya's Organic is a two-interface full-stack ecommerce project:

- Customer storefront built in React + Bootstrap
- Admin workspace built in React and secured with JWT
- Spring Boot backend with MySQL persistence

## Main Folders

- `frontend/` : React source, Vite config, npm dependencies
- `backend/` : Spring Boot app, REST APIs, security, JPA entities
- `backend/src/main/resources/static/` : built frontend assets used by Spring Boot
- `database-schema.sql` : MySQL reference schema

## Customer Features

- Hero-based branded landing page
- Category highlights and testimonials
- Product grid with filters
- Add-to-cart flow
- Checkout flow with order creation
- Newsletter subscription

## Admin Features

- Login with seeded admin account
- Dashboard metrics
- Product create, edit, delete
- Order status updates
- User update and delete
- Insights for revenue and low-stock tracking

## Default Admin Login

- Username: `admin`
- Password: `ChangeMeAdmin123!` unless overridden by `APP_ADMIN_PASSWORD`

## Run Options

### Full production-style run

```bat
launch.bat
```

### Frontend development

```bash
cd frontend
npm install
npm run dev
```

### Backend development

```bash
cd backend
mvn spring-boot:run
```

## Verified Commands

```bash
cd frontend && npm run build
cd backend && mvn test
cd backend && mvn -DskipTests package
```

## Important URLs

- Storefront: `http://localhost:8080`
- Admin login: `http://localhost:8080/admin/login`
- Vite dev: `http://localhost:5173`

## Environment

Use these if you want to override defaults:

```env
SPRING_PROFILES_ACTIVE=dev
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/jayas_organics?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=
APP_SEED_ENABLED=true
JWT_SECRET=ChangeThisDevelopmentJwtSecretKeyToSomethingLongAndSecure12345
APP_CORS_ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080,http://localhost:5173,http://127.0.0.1:5173
```
