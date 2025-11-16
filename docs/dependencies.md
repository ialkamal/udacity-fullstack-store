# Application Dependencies

This document lists all dependencies required for the Udacity Fullstack Store application.

---

## Backend Dependencies

### Runtime Dependencies

| Package         | Version  | Purpose                                  |
| --------------- | -------- | ---------------------------------------- |
| `express`       | ^4.17.1  | Web application framework                |
| `pg`            | ^8.16.3  | PostgreSQL client for Node.js            |
| `bcrypt`        | ^5.1.1   | Password hashing library                 |
| `jsonwebtoken`  | ^9.0.2   | JWT token generation and verification    |
| `dotenv`        | ^17.2.3  | Environment variable management          |
| `cors`          | ^2.8.5   | Cross-Origin Resource Sharing middleware |
| `body-parser`   | ^1.19.0  | Request body parsing middleware          |
| `db-migrate`    | ^0.11.14 | Database migration tool                  |
| `db-migrate-pg` | ^1.5.2   | PostgreSQL driver for db-migrate         |
| `typescript`    | ^5.9.3   | TypeScript compiler                      |

### Development Dependencies

| Package                 | Version | Purpose                                 |
| ----------------------- | ------- | --------------------------------------- |
| `@types/express`        | ^4.17.9 | TypeScript definitions for Express      |
| `@types/pg`             | ^7.14.7 | TypeScript definitions for pg           |
| `@types/bcrypt`         | ^5.0.0  | TypeScript definitions for bcrypt       |
| `@types/jsonwebtoken`   | ^9.0.10 | TypeScript definitions for jsonwebtoken |
| `@types/cors`           | ^2.8.19 | TypeScript definitions for cors         |
| `@types/dotenv`         | ^8.2.3  | TypeScript definitions for dotenv       |
| `@types/jasmine`        | ^3.6.3  | TypeScript definitions for Jasmine      |
| `@types/supertest`      | ^6.0.3  | TypeScript definitions for supertest    |
| `jasmine`               | ^3.6.4  | Behavior-driven testing framework       |
| `jasmine-spec-reporter` | ^6.0.0  | Spec reporter for Jasmine               |
| `jasmine-ts`            | ^0.3.0  | TypeScript support for Jasmine          |
| `supertest`             | ^7.1.4  | HTTP assertion library for testing      |
| `ts-node`               | ^10.9.2 | TypeScript execution for Node.js        |
| `tsc-watch`             | ^4.2.9  | TypeScript compiler with watch mode     |
| `gitignore`             | ^0.7.0  | .gitignore file generator               |

---

## Frontend Dependencies

### Runtime Dependencies

| Package                             | Version | Purpose                                |
| ----------------------------------- | ------- | -------------------------------------- |
| `@angular/animations`               | ^20.3.8 | Angular animations library             |
| `@angular/common`                   | ^20.3.8 | Common Angular utilities               |
| `@angular/compiler`                 | ^20.3.8 | Angular template compiler              |
| `@angular/core`                     | ^20.3.8 | Angular core framework                 |
| `@angular/forms`                    | ^20.3.8 | Form handling in Angular               |
| `@angular/platform-browser`         | ^20.3.8 | Browser platform for Angular           |
| `@angular/platform-browser-dynamic` | ^20.3.8 | Dynamic platform for Angular           |
| `@angular/router`                   | ^20.3.8 | Angular routing library                |
| `rxjs`                              | ~7.8.0  | Reactive extensions for JavaScript     |
| `tslib`                             | ^2.3.0  | TypeScript runtime library             |
| `zone.js`                           | ~0.15.0 | Execution context for async operations |

### Development Dependencies

| Package                         | Version | Purpose                            |
| ------------------------------- | ------- | ---------------------------------- |
| `@angular-devkit/build-angular` | ^20.3.8 | Angular build tools                |
| `@angular/cli`                  | ^20.3.8 | Angular command-line interface     |
| `@angular/compiler-cli`         | ^20.3.8 | Angular compiler CLI               |
| `@types/jasmine`                | ~5.1.0  | TypeScript definitions for Jasmine |
| `jasmine-core`                  | ~5.5.0  | Jasmine testing framework core     |
| `karma`                         | ~6.4.0  | Test runner                        |
| `karma-chrome-launcher`         | ~3.2.0  | Chrome launcher for Karma          |
| `karma-coverage`                | ~2.2.0  | Code coverage for Karma            |
| `karma-jasmine`                 | ~5.1.0  | Jasmine adapter for Karma          |
| `karma-jasmine-html-reporter`   | ~2.1.0  | HTML reporter for Jasmine tests    |
| `typescript`                    | ~5.7.2  | TypeScript compiler                |

---

## System Dependencies

### Development Environment

| Tool               | Minimum Version | Purpose                           |
| ------------------ | --------------- | --------------------------------- |
| **Node.js**        | 20.19.0         | JavaScript runtime                |
| **npm**            | 10.0.0          | Package manager                   |
| **PostgreSQL**     | 12.0            | Database server                   |
| **Docker**         | 20.0            | Container platform (for local DB) |
| **Docker Compose** | 1.27            | Multi-container orchestration     |

### Production Environment (AWS)

| Service             | Configuration  | Purpose                    |
| ------------------- | -------------- | -------------------------- |
| **Node.js Runtime** | 20.x           | Elastic Beanstalk platform |
| **PostgreSQL**      | 12.x or higher | RDS database engine        |
| **AWS CLI**         | Latest         | AWS command-line interface |
| **EB CLI**          | Latest         | Elastic Beanstalk CLI      |

---

## CI/CD Pipeline Dependencies

### CircleCI Environment

| Tool                     | Version          | Purpose                       |
| ------------------------ | ---------------- | ----------------------------- |
| **Node.js Docker Image** | cimg/node:20.19  | Build environment             |
| **Python**               | 3.x              | For EB CLI installation       |
| **pip3**                 | Latest           | Python package manager        |
| **AWS CLI**              | Latest (via orb) | AWS operations                |
| **EB CLI**               | Latest (via pip) | Elastic Beanstalk deployments |

### CircleCI Orbs

| Orb                | Version | Purpose         |
| ------------------ | ------- | --------------- |
| `circleci/node`    | 4.1.0   | Node.js support |
| `circleci/aws-cli` | 1.3.1   | AWS CLI setup   |

---

## Database Dependencies

### PostgreSQL Extensions

None required for basic functionality. The application uses standard PostgreSQL features.

### Database Migrations

Managed by `db-migrate` package:

- Migration files in `Backend/migrations/`
- SQL files in `Backend/migrations/sqls/`

**Migration Dependencies:**

- Users table creation
- Products table creation
- Orders table creation
- Products_Orders join table creation
- Seed data (optional)

---

## Environment Variables

### Backend Required Variables

```bash
ENV=dev|test|prod
POSTGRES_HOST=database_host
POSTGRES_PORT=5432
POSTGRES_DB=database_name
POSTGRES_USER=database_user
POSTGRES_PASSWORD=database_password
SALT=10
PEPPER=your_pepper_string
JWT_SECRET=your_jwt_secret
```

### Frontend Environment Variables

No environment-specific variables required for basic setup. API endpoint can be configured in the Angular environment files.

---

## Installation Instructions

### Backend Setup

```bash
cd Backend
npm install
```

### Frontend Setup

```bash
cd Frontend
npm install
```

### Complete Project Setup

From the root directory:

```bash
npm run frontend:install
npm run backend:install
```

---

## Dependency Management

### Package Lock Files

- `package-lock.json` - Ensures consistent dependency versions
- Committed to version control
- Used by npm for reproducible builds

### Security Updates

Regularly update dependencies to patch security vulnerabilities:

```bash
npm audit
npm audit fix
```

### Version Compatibility

- **Node.js 20.19+** required for Angular 20
- **PostgreSQL 12+** recommended for backend
- TypeScript versions must be compatible between frontend and backend

---

## Browser Support (Frontend)

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Optional Dependencies

### Development Tools

- **Postman** - API testing (collection included in Backend/)
- **pgAdmin** - PostgreSQL GUI
- **VS Code** - Recommended IDE with extensions:
  - Angular Language Service
  - ESLint
  - Prettier

### Monitoring and Logging

- **AWS CloudWatch** - Application monitoring
- **AWS X-Ray** - Performance insights (optional)

---

## Dependency Update Strategy

1. **Minor updates:** Monthly
2. **Security patches:** Immediately
3. **Major versions:** Quarterly (with testing)
4. **Breaking changes:** During planned maintenance windows

---

## Known Issues and Limitations

1. **Angular Version:** Requires Node.js 20.19+
2. **bcrypt:** May require additional build tools on Windows
3. **PostgreSQL:** Docker Compose uses port 5433 (not default 5432)

---

## Future Enhancements

Potential dependencies to add:

- **Redis** - Session management and caching
- **winston** - Advanced logging
- **helmet** - Security headers
- **rate-limiter-flexible** - API rate limiting
- **swagger** - API documentation
- **jest** - Alternative testing framework
