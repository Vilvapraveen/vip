# Jaya's Organics Admin Workspace

![Build](https://img.shields.io/badge/build-Maven-blue)
![Java 17](https://img.shields.io/badge/java-17-important)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-none-lightgrey)

## 🚀 Project Overview

**Jaya's Organics Admin Workspace** is a production-style ecommerce administration dashboard built for an organic foods and wellness brand. It provides secure management of products, orders, users, and operational metrics.

This repository contains a full-stack monolithic application with a Java Spring Boot backend and a lightweight HTML/CSS frontend. It is designed for the Jaya's Organics operations team to manage wellness catalogue data, track low-stock products, process order status updates, and review customer activity.

### Why this project matters

- Centralizes Jaya's Organics ecommerce administration in a single dashboard.
- Reduces manual database operations and ad-hoc SQL access.
- Enforces role-based security for all management endpoints.
- Supports both local development and production-ready deployments.

### Use-case scenarios

- Admins reviewing sales metrics, featured products, and low-stock alerts.
- Product managers creating, updating, or deleting organic catalog items.
- Operations staff updating order status from `PENDING` to `PROCESSING`, `SHIPPED`, or `DELIVERED`.
- Support teams correcting customer contact records or removing inactive user accounts.
- Merchandising leads reviewing category mix, top sellers, and replenishment priorities from the reports screen.

## 🧠 Problem & Solution

### Problem statement

Many ecommerce systems lack a dedicated administrative interface. Without a purpose-built admin panel, teams often rely on direct database access, spreadsheets, or general-purpose CMS tools that do not match ecommerce workflows.

### Solution approach

This project solves the problem by delivering:

- A secure login flow using JWT authentication.
- A REST API protected by Spring Security and role-based access controls.
- A focused frontend for dashboard metrics, catalog intelligence, fulfillment reporting, and user administration.
- A MySQL-only backend setup that is ready to launch from a single folder.

### Improvement over existing approaches

- Lightweight and easy to extend compared to enterprise admin frameworks.
- Custom ecommerce operations rather than generic CRUD scaffolding.
- Built-in security and session management with BCrypt password hashing.
- Launch-ready MySQL persistence with automatic database creation and seed data.

## 🏗️ System Architecture

### Architecture type

Monolithic MVC architecture with a single backend application that handles API requests, business logic, data persistence, and security.

### Data flow

1. Administrator authenticates using `/api/auth/login`.
2. Backend returns a JWT token.
3. Frontend stores the token in `localStorage`.
4. Authenticated requests to `/api/admin/**` include the bearer token.
5. Controllers validate requests, delegate to services, and persist changes via repositories.

### Component-level explanation

- `frontend/` — static HTML pages, CSS styling, Bootstrap layout, and Fetch-based API integration.
- `backend/src/main/java/com/example/adminpanel/controller/` — REST controllers exposing API endpoints.
- `backend/src/main/java/com/example/adminpanel/service/` — business logic and orchestration.
- `backend/src/main/java/com/example/adminpanel/repository/` — JPA repositories for data access.
- `backend/src/main/java/com/example/adminpanel/security/` — JWT filter, authentication entry point, and CORS configuration.
- `backend/src/main/resources/` — MySQL configuration and seed data.

### Diagram placeholder

![System Architecture](docs/system-design.png)

## ✨ Features (Detailed)

### Secure Authentication
- Title: JWT-based admin login
- Explanation: Administrators authenticate with username and password. The backend issues a signed JWT token that is required for all protected admin endpoints.
- Use-case: Admin opens `http://localhost:8080`, signs in, and moves through dashboard and management screens.

### Product Management
- Title: Product CRUD operations
- Explanation: Supports listing, filtering, creating, updating, and deleting products with category, stock, featured merchandising, and image details.
- Use-case: Product manager updates the stock quantity for a cold-pressed oil and marks it as featured.

### Order Management
- Title: Order state control
- Explanation: Fetches orders with pagination, supports status filtering, and allows status updates for each order.
- Use-case: Operations team filters only `PROCESSING` orders and moves one to `SHIPPED` after dispatch.

### User Administration
- Title: User lifecycle management
- Explanation: Lists registered users and supports removal of users from the admin interface.
- Use-case: Admin deletes a test account or a user with suspicious activity.

### Dashboard Metrics
- Title: Operational overview
- Explanation: Displays aggregate counts for products, orders, users, low-stock items, featured products, order-status distribution, and revenue in a single view.
- Use-case: Administrator reviews catalog health and fulfillment workload immediately after login.

### Insights & Reports
- Title: Business intelligence report screen
- Explanation: Aggregates category mix, revenue by status, top-performing products, low-stock watchlists, and recent orders into a dedicated decision-making view.
- Use-case: The Jaya's Organics team opens `frontend/reports.html` to plan replenishment and merchandising.

### CSV Export
- Title: One-click data export
- Explanation: Product lists, order lists, customer records, and report snapshots can be exported directly from the frontend as CSV files.
- Use-case: Operations downloads filtered orders or low-stock watchlists to share with packing, sourcing, or accounting teams.

### Launch-Ready MySQL Setup
- Title: Single-database deployment flow
- Explanation: The packaged app runs against MySQL only, auto-creates the `jayas_organics` database if needed, and serves the frontend from the Spring Boot jar.
- Use-case: Start MySQL, run `launch.bat`, and open the admin workspace in a browser.

## 🛠️ Tech Stack (Categorized)

### Frontend
- HTML, CSS, Bootstrap
- JavaScript Fetch API

Why chosen:
- Minimal static assets for fast loading.
- Bootstrap enables responsive admin layout without a full SPA framework.
- Fetch API keeps client-side logic simple and easy to maintain while still supporting filtering and dashboard updates.

### Backend
- Java 17
- Spring Boot 3.3.2
- Spring Security
- Spring Data JPA
- JWT (io.jsonwebtoken)

Why chosen:
- Spring Boot provides a mature Java ecosystem for REST APIs.
- Spring Security offers production-grade auth and JWT integration.
- JPA abstracts persistence for easier database migration.

### Database
- MySQL 8.x

Why chosen:
- MySQL is production-ready and widely adopted for ecommerce workloads.
- `createDatabaseIfNotExist=true` allows smooth first-time local startup.

### DevOps / Tools
- Maven build lifecycle
- Launch batch scripts
- CORS configuration for local frontend consumption

Why chosen:
- Maven is the standard Java build tool and simplifies dependency management.
- Launch scripts make the project usable directly from the `vx` folder.

## 📸 Demo / Screenshots

> Add real screenshots to `docs/screenshots/` and update the links below.

- ![Login screen](docs/screenshots/login.png)
- ![Dashboard overview](docs/screenshots/dashboard.png)
- ![Products management](docs/screenshots/products.png)
- ![Orders management](docs/screenshots/orders.png)
- ![Reports view](docs/screenshots/reports.png)

## ⚙️ Installation & Setup

### Prerequisites
- Java JDK 17
- Maven 3.8+
- MySQL 8.x
- Modern browser for frontend pages

### Step-by-step setup

```bash
# Clone repository
git clone <repository-url>
cd vx

# Build backend
cd backend
mvn clean package
```

### Default admin credentials
- Username: `admin`
- Password: `password`

### Run locally

```bash
launch.bat
```

Then open `http://localhost:8080`. The Spring Boot app serves the frontend automatically, and the executable artifact is created at `backend/release-build/jayas-organics-admin-1.0.0-exec.jar`.

### Environment variables

Create an `.env` file or export environment variables before running the app.

```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/jayas_organics?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=Vilva@123
APP_SEED_ENABLED=true
JWT_SECRET=your-secure-jwt-secret
APP_CORS_ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080
```

> Note: The backend loads `jwt.secret` from the `JWT_SECRET` environment variable.

### Common errors & fixes

- `Connection refused` / `Cannot connect to database`:
  - Verify MySQL is running and credentials are correct.
  - Confirm port `3306` is reachable, or override `SPRING_DATASOURCE_URL` for your MySQL instance.
- Seed data appears in a non-demo environment:
  - Set `APP_SEED_ENABLED=false` before starting the application.
- `401 Unauthorized`:
  - Ensure the frontend stores the JWT in `localStorage`.
  - Confirm the `Authorization: Bearer <token>` header is included.
- `CORS` errors:
  - Update `APP_CORS_ALLOWED_ORIGINS` if you host the frontend on another origin.

## ▶️ Usage Guide

### Run the project

```bash
launch.bat
```

Open the admin workspace:

```text
http://localhost:8080
```

### Default admin credentials (seeded)
- Username: `admin`
- Password: `password`

### Typical user journey
1. Open the login screen.
2. Authenticate with admin credentials.
3. Review dashboard metrics.
4. Manage products and inventory.
5. Update order statuses.
6. Maintain user accounts.
7. Open reports and export operational snapshots.

### Sample curl commands

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

```bash
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/admin/products
```

## 📁 Project Structure

- `launch.bat` — one-command MySQL launch script from the project root.
- `backend/`
  - `pom.xml` — Maven build configuration.
  - `src/main/java/com/example/adminpanel/` — Java source code.
    - `controller/` — REST endpoints.
    - `service/` — business logic.
    - `repository/` — JPA persistence layer.
    - `entity/` — data model definitions.
    - `dto/` — request and response payloads.
    - `security/` — authentication and JWT filters.
    - `exception/` — global error handling.
  - `src/main/resources/` — MySQL configuration and seeded content.
- `frontend/` — source HTML/CSS/JS that is bundled into the backend jar at build time.
  - `reports.html` — analytics, category mix, and replenishment insights.
- `docs/ARCHITECTURE.md` — architecture and folder-structure notes.
- `docs/CODE_REVIEW.md` — engineering audit summary and remaining gaps.
- `database-schema.sql` — schema reference.
- `postman-samples.md` — sample API requests.

## 🔌 API Documentation

### Authentication
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/login` | Authenticate admin and receive JWT token |

#### Request
```json
{
  "username": "admin",
  "password": "password"
}
```

#### Response
```json
{
  "token": "<jwt-token>",
  "type": "Bearer",
  "username": "admin"
}
```

### Dashboard
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/dashboard` | Retrieve product, order, and user metrics |

### Reports
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/reports/overview` | Retrieve category insights, revenue by status, top products, low-stock watchlists, and recent orders |

### Products
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/products` | List products with pagination, search, category, featured, and low-stock filters |
| POST | `/api/admin/products` | Create a new product |
| PUT | `/api/admin/products/{id}` | Update an existing product |
| DELETE | `/api/admin/products/{id}` | Delete a product |

#### Product payload
```json
{
  "name": "Moringa Wellness Powder",
  "category": "Superfood",
  "price": 420.00,
  "stockQuantity": 18,
  "featured": true,
  "description": "Nutrient-dense moringa powder for smoothies and wellness routines.",
  "imageUrl": "https://example.com/moringa.jpg"
}
```

### Orders
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/orders` | List orders with pagination and optional status filter |
| PUT | `/api/admin/orders/{id}/status` | Update order status |

#### Status update payload
```json
{
  "status": "PROCESSING"
}
```

### Users
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/admin/users` | List users with pagination and optional search |
| PUT | `/api/admin/users/{id}` | Update a user email or full name |
| DELETE | `/api/admin/users/{id}` | Delete a user |

### Authentication details
- All `/api/admin/**` endpoints require `Authorization: Bearer <token>`.
- The `admin` role is required for admin resources.

## 🔐 Configuration & Environment Variables

### Key variables
- `JWT_SECRET` — secret key for signing JWT tokens.
- `SPRING_DATASOURCE_URL` — JDBC URL for MySQL.
- `SPRING_DATASOURCE_USERNAME` — database username.
- `SPRING_DATASOURCE_PASSWORD` — database password.
- `APP_SEED_ENABLED` — enables or disables demo seed data on startup.
- `APP_CORS_ALLOWED_ORIGINS` — allowed origins for frontend requests.

## 🧪 Testing

- Focused unit tests are included for authentication and user-update flows.
- The default build keeps tests skipped for fast offline packaging, but you can enable them explicitly.

```bash
cd backend
mvn -o -DskipTests=false test
```

## 🚀 Deployment

### Local deployment

```bash
launch.bat
```

### Cloud deployment

- Deploy the generated JAR to a Java-compatible platform such as AWS Elastic Beanstalk, Azure App Service, or Google Cloud Run.
- Configure environment variables in the target environment.
- Serve the frontend as static content from a CDN or web server.

### Docker support

Docker is not included by default. To containerize, add a `Dockerfile` and build from `openjdk:17-jdk`.

## 🤝 Contributing Guidelines

- Fork the repository and create a new branch.
- Use branch names like `feature/<name>`, `bugfix/<name>`, or `hotfix/<name>`.
- Follow Java naming conventions and keep controller logic separated from service logic.
- Submit pull requests with clear descriptions and scope.
- Keep commits atomic and descriptive.

## 🛣️ Roadmap / Future Improvements

- Add automated unit and integration tests.
- Migrate frontend to a SPA framework such as React or Vue.
- Implement product image uploads and file storage.
- Add role management beyond the single `ADMIN` role.
- Introduce audit logs and activity history.
- Provide Docker and Kubernetes deployment manifests.

## ⚠️ Limitations

- No automated test coverage exists in the current repository.
- Frontend is static HTML/CSS and not implemented as a modern SPA.
- Production-grade monitoring, logging, and CI/CD are not included.
- Email notifications, audit history, and multi-tenant support are not present.

## 📜 License

This repository does not include a license file. Add a `LICENSE` file to define reuse terms (for example, `MIT` or `Apache-2.0`).

## 👨‍💻 Author & Credits

- Maintained by the project repository owner.
- Frontend and backend implementation authored as part of the Admin Panel project.
- Seed data and example MySQL configuration provided for launch-ready local use.
