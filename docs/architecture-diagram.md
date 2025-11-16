# Infrastructure Architecture Diagram

This diagram shows the high-level overview of the infrastructure and AWS services used in the Udacity Fullstack Store application.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              END USERS                                       │
│                         (Web Browsers)                                       │
└────────────────┬────────────────────────────────┬───────────────────────────┘
                 │                                 │
                 │ HTTP/HTTPS                      │ HTTP/HTTPS
                 │ Requests                        │ Requests
                 │                                 │
                 ▼                                 ▼
┌─────────────────────────────────┐    ┌──────────────────────────────────────┐
│                                 │    │                                      │
│        AWS S3 BUCKET            │    │   AWS ELASTIC BEANSTALK              │
│      (Static Website)           │    │     (Backend API)                    │
│                                 │    │                                      │
│  ┌───────────────────────────┐ │    │  ┌────────────────────────────────┐  │
│  │   Angular Frontend        │ │    │  │  Node.js/Express API          │  │
│  │   - HTML/CSS/JS           │ │    │  │  - RESTful Endpoints          │  │
│  │   - Compiled Bundles      │ │    │  │  - JWT Authentication         │  │
│  │   - Static Assets         │ │    │  │  - Business Logic             │  │
│  └───────────────────────────┘ │    │  └──────────┬─────────────────────┘  │
│                                 │    │             │                        │
│  Region: us-east-1              │    │  ┌──────────▼─────────────────────┐  │
│  Port: 80/443                   │    │  │   EC2 Instance(s)             │  │
│                                 │    │  │   - Node.js Runtime           │  │
└─────────────────────────────────┘    │  │   - Application Code          │  │
                                       │  │   - Environment Variables     │  │
                                       │  └───────────────────────────────┘  │
                                       │                                      │
                                       │  Region: us-east-1                   │
                                       │  Port: 3000                          │
                                       └──────────────┬───────────────────────┘
                                                      │
                                                      │ PostgreSQL
                                                      │ Connection
                                                      │ Port: 5432
                                                      │
                                                      ▼
                                       ┌──────────────────────────────────────┐
                                       │                                      │
                                       │   AWS RDS for PostgreSQL             │
                                       │     (Database)                       │
                                       │                                      │
                                       │  ┌────────────────────────────────┐  │
                                       │  │   PostgreSQL Database         │  │
                                       │  │   - Users Table               │  │
                                       │  │   - Products Table            │  │
                                       │  │   - Orders Table              │  │
                                       │  │   - Products_Orders Table     │  │
                                       │  └────────────────────────────────┘  │
                                       │                                      │
                                       │  Instance: db.t3.micro               │
                                       │  Engine: PostgreSQL 12+              │
                                       │  Region: us-east-1                   │
                                       │  Port: 5432                          │
                                       │                                      │
                                       └──────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                         SECURITY & NETWORKING                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌────────────────────┐         ┌────────────────────┐         ┌──────────────┐
│   S3 Bucket        │         │ Elastic Beanstalk  │         │     RDS      │
│   Security         │         │   Security Group   │         │  Security    │
│                    │         │                    │         │    Group     │
│ - Public Read      │         │ - HTTP/HTTPS       │         │              │
│ - Bucket Policy    │         │   from Internet    │         │ - PostgreSQL │
│ - CORS Enabled     │         │ - Outbound to RDS  │         │   from EB    │
└────────────────────┘         └────────────────────┘         │   only       │
                                                               └──────────────┘
```

---

## Component Details

### 1. Frontend Layer (AWS S3)
- **Purpose:** Hosts the Angular single-page application
- **Access:** Public HTTP/HTTPS
- **Content:** Static HTML, CSS, JavaScript files
- **Features:**
  - Static website hosting enabled
  - CORS configuration for API calls
  - Low latency content delivery

### 2. Backend Layer (AWS Elastic Beanstalk)
- **Purpose:** Hosts the Node.js/Express REST API
- **Components:**
  - EC2 instance(s) running Node.js
  - Load balancer (optional)
  - Auto-scaling group (optional)
- **Features:**
  - Automatic health monitoring
  - Rolling deployments
  - Environment variable management

### 3. Database Layer (AWS RDS)
- **Purpose:** Persistent data storage
- **Engine:** PostgreSQL
- **Features:**
  - Automated backups
  - Multi-AZ deployment (production)
  - Encryption at rest (optional)
  - Point-in-time recovery

---

## Data Flow

```
1. User → S3 Frontend
   User loads Angular app from S3

2. Frontend → Backend API
   Angular makes HTTP requests to Elastic Beanstalk

3. Backend → Database
   Express API queries PostgreSQL database

4. Database → Backend
   PostgreSQL returns query results

5. Backend → Frontend
   API sends JSON response

6. Frontend → User
   Angular displays data to user
```

---

## Network Communication

### User to Frontend (S3)
- Protocol: HTTP/HTTPS
- Port: 80/443
- Direction: Inbound
- Security: Public access allowed

### Frontend to Backend (S3 → EB)
- Protocol: HTTP/HTTPS
- Port: 3000 (or configured port)
- Direction: Outbound from browser
- Security: CORS enabled on backend

### Backend to Database (EB → RDS)
- Protocol: PostgreSQL
- Port: 5432
- Direction: Outbound from EB, Inbound to RDS
- Security: Security group restricts to EB only

---

## AWS Services Summary

| Service | Purpose | Region | Availability |
|---------|---------|--------|--------------|
| **S3** | Frontend hosting | us-east-1 | 99.99% |
| **Elastic Beanstalk** | Backend hosting | us-east-1 | 99.99% |
| **RDS** | Database | us-east-1 | 99.95% |
| **EC2** | Compute (via EB) | us-east-1 | 99.99% |

---

## Scalability Architecture

```
                    ┌─────────────────┐
                    │  Load Balancer  │
                    │   (Optional)    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌─────────┐    ┌─────────┐    ┌─────────┐
        │ EC2 #1  │    │ EC2 #2  │    │ EC2 #3  │
        │ Backend │    │ Backend │    │ Backend │
        └────┬────┘    └────┬────┘    └────┬────┘
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │      RDS      │
                    │  PostgreSQL   │
                    └───────────────┘
```

*Note: Multi-instance setup is optional for production environments*

---

## Deployment Architecture

See [pipeline-diagram.md](./pipeline-diagram.md) for CI/CD pipeline flow.
