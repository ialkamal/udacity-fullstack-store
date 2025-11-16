# Udacity Fullstack Store

A full-stack e-commerce application built with Angular frontend and Node.js/Express backend, deployed on AWS using CircleCI for continuous integration and deployment.

## Frontend URL

http://udacity-store-project-987654321.s3-website-us-east-1.amazonaws.com

## Backend URL

http://backend-dev.us-east-1.elasticbeanstalk.com

## Project Overview

This is a complete online store application featuring:

- **Frontend**: Angular application for the storefront UI
- **Backend**: RESTful API built with Node.js, Express, and PostgreSQL
- **Authentication**: JWT-based user authentication
- **Database**: PostgreSQL for data persistence
- **CI/CD**: Automated deployment pipeline with CircleCI
- **Cloud Hosting**: AWS Elastic Beanstalk and S3

---

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│  Angular App    │────────>│  Express API     │────────>│   PostgreSQL    │
│  (AWS S3)       │         │  (AWS EB)        │         │   Database      │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

---

## Tech Stack

### Frontend

- Angular 20.3.8
- TypeScript
- CSS3

### Backend

- Node.js 20.19
- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing

### DevOps

- CircleCI for CI/CD
- AWS Elastic Beanstalk (Backend)
- AWS S3 (Frontend)
- Docker (Local Development)

---

## Prerequisites

- Node.js v20.19 or higher
- npm
- Docker and Docker Compose
- AWS CLI (for deployment)
- EB CLI (for Elastic Beanstalk)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ialkamal/udacity-fullstack-store.git
cd udacity-fullstack-store
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
npm run frontend:install
npm run backend:install
```

### 3. Environment Configuration

Create a `.env` file in the `Backend` directory:

```env
ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5433
POSTGRES_DB=store
POSTGRES_DB_TEST=test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
SALT=10
PEPPER=your-pepper-string
JWT_SECRET=your-jwt-secret
```

### 4. Start PostgreSQL Database

```bash
cd Backend
docker-compose up -d
```

### 5. Run Database Migrations

```bash
npm run backend:install
cd Backend
npm run db:migrate
npm run db:seed
```

### 6. Start Development Servers

**Backend (runs on port 3000):**

```bash
cd Backend
npm run server
```

**Frontend (runs on port 4200):**

```bash
cd Frontend
ng serve
```

Visit `http://localhost:4200` to view the application.

---

## Available Scripts

### Root Level Scripts

| Script                     | Description                   |
| -------------------------- | ----------------------------- |
| `npm run frontend:install` | Install frontend dependencies |
| `npm run frontend:build`   | Build frontend for production |
| `npm run frontend:deploy`  | Deploy frontend to AWS S3     |
| `npm run backend:install`  | Install backend dependencies  |
| `npm run backend:build`    | Build backend TypeScript      |
| `npm run backend:deploy`   | Deploy backend to AWS EB      |

### Backend Scripts

| Script               | Description                    |
| -------------------- | ------------------------------ |
| `npm run server`     | Start development server       |
| `npm start`          | Start production server        |
| `npm test`           | Run test suite                 |
| `npm run build`      | Compile TypeScript             |
| `npm run db:migrate` | Run database migrations        |
| `npm run db:seed`    | Seed database with sample data |

### Frontend Scripts

| Script     | Description              |
| ---------- | ------------------------ |
| `ng serve` | Start development server |
| `ng build` | Build for production     |
| `ng test`  | Run unit tests           |

---

## Project Structure

```
udacity-fullstack-store/
├── Backend/
│   ├── src/
│   │   ├── api/              # Route handlers
│   │   ├── data/             # Database models
│   │   ├── middleware/       # Authentication middleware
│   │   ├── tests/            # Test files
│   │   └── server.ts         # Application entry
│   ├── migrations/           # Database migrations
│   ├── .ebextensions/        # EB configuration
│   ├── docker-compose.yml    # PostgreSQL container
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── app/              # Angular components
│   │   ├── index.html
│   │   └── main.ts
│   ├── angular.json
│   └── package.json
├── .circleci/
│   └── config.yml            # CI/CD pipeline
└── README.md
```

---

## Testing

### Backend Tests

```bash
cd Backend
npm test
```

Tests include:

- User authentication
- Product management
- Order processing
- API endpoint validation

### Frontend Tests

```bash
cd Frontend
ng test
```

---

## Deployment

### Automated Deployment (CircleCI)

Pushes to the `master` branch automatically trigger the CI/CD pipeline:

1. Install dependencies
2. Run tests
3. Build frontend and backend
4. Deploy frontend to AWS S3
5. Deploy backend to AWS Elastic Beanstalk

### Manual Deployment

**Backend:**

```bash
npm run backend:deploy
```

**Frontend:**

```bash
npm run frontend:deploy
```

---

## Environment Variables (CircleCI)

Configure these in your CircleCI project settings:

| Variable                | Description                   |
| ----------------------- | ----------------------------- |
| `AWS_ACCESS_KEY_ID`     | AWS access key                |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key                |
| `AWS_DEFAULT_REGION`    | AWS region (e.g., us-east-1)  |
| `EB_APP_NAME`           | Elastic Beanstalk app name    |
| `EB_ENV_NAME`           | Elastic Beanstalk environment |

---

## API Endpoints

### Users

- `POST /api/users` - Create user
- `POST /api/users/authenticate` - Login
- `GET /api/users` - Get all users (requires auth)
- `GET /api/users/:id` - Get user by ID (requires auth)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (requires auth)

### Orders

- `GET /api/orders` - Get all orders (requires auth)
- `GET /api/orders/:id` - Get order by ID (requires auth)
- `POST /api/orders` - Create order (requires auth)

For detailed API documentation, see [Backend/REQUIREMENTS.md](Backend/REQUIREMENTS.md).

---

## Database Schema

### Users

- id (serial primary key)
- username (varchar)
- password (varchar, hashed)

### Products

- id (serial primary key)
- name (varchar)
- price (decimal)
- category (varchar)

### Orders

- id (serial primary key)
- user_id (foreign key)
- status (varchar)

### Products_Orders (Join Table)

- id (serial primary key)
- order_id (foreign key)
- product_id (foreign key)
- quantity (integer)

---

## Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Infrastructure Description](docs/infrastructure.md)** - Detailed AWS infrastructure setup and architecture
- **[Application Dependencies](docs/dependencies.md)** - Complete list of frontend and backend dependencies
- **[Pipeline Process](docs/pipeline.md)** - CI/CD pipeline workflow and configuration
- **[Architecture Diagram](docs/architecture-diagram.md)** - High-level infrastructure diagram
- **[Pipeline Diagram](docs/pipeline-diagram.md)** - Deployment flow visualization

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Author

Udacity Fullstack Nanodegree Project

---

## Acknowledgments

- Udacity for the project requirements and starter code
- CircleCI for CI/CD infrastructure
- AWS for cloud hosting services
