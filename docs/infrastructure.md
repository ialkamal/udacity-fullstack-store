# Infrastructure Description

This document describes the cloud infrastructure used to host the Udacity Fullstack Store application.

## Overview

The application is deployed on Amazon Web Services (AWS) using a multi-tier architecture that separates the frontend, backend, and database layers.

---

## AWS Services Used

### 1. Amazon S3 (Simple Storage Service)

**Purpose:** Frontend Hosting

- **Service Type:** Object Storage
- **Usage:** Hosts the compiled Angular application as static files
- **Configuration:**
  - Bucket configured for static website hosting
  - Public read access enabled for web content
  - Files served directly to end users via HTTP/HTTPS
- **Content:**
  - HTML, CSS, JavaScript files
  - Images and other static assets
  - Angular compiled bundles

**Benefits:**

- High availability and durability
- Scalable storage
- Cost-effective for static content
- Fast content delivery

---

### 2. AWS Elastic Beanstalk

**Purpose:** Backend API Hosting

- **Service Type:** Platform as a Service (PaaS)
- **Usage:** Hosts the Node.js/Express backend application
- **Configuration:**
  - Platform: Node.js 20.x
  - Environment: Single instance or Load Balanced
  - Auto-scaling capabilities (if configured)
  - Health monitoring and auto-recovery
- **Components Managed:**
  - EC2 instances
  - Load balancer (if multi-instance)
  - Auto Scaling groups
  - CloudWatch monitoring

**Environment Variables:**

```
POSTGRES_HOST
POSTGRES_PORT
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
JWT_SECRET
PEPPER
SALT
```

**Benefits:**

- Automatic capacity provisioning
- Load balancing
- Health monitoring
- Easy deployment and updates
- Automatic platform updates

---

### 3. Amazon RDS for PostgreSQL

**Purpose:** Database Hosting

- **Service Type:** Managed Relational Database Service
- **Database Engine:** PostgreSQL
- **Usage:** Stores application data (users, products, orders)
- **Configuration:**
  - Instance class: (e.g., db.t3.micro for development)
  - Storage: General Purpose (SSD)
  - Multi-AZ deployment (optional for production)
  - Automated backups enabled
  - Encryption at rest (optional)

**Database Schema:**

- Users table
- Products table
- Orders table
- Products_Orders join table

**Security:**

- VPC security groups restrict access
- Only Elastic Beanstalk instances can connect
- SSL/TLS connections enforced
- Master password stored securely

**Benefits:**

- Automated backups
- Point-in-time recovery
- Automatic software patching
- High availability with Multi-AZ
- Read replicas support

---

## Network Architecture

### Virtual Private Cloud (VPC)

- Custom VPC for the application (optional)
- Public and private subnets
- Security groups for access control

### Security Groups

**Frontend (S3):**

- Public HTTP/HTTPS access

**Backend (Elastic Beanstalk):**

- Inbound: HTTP/HTTPS from anywhere
- Outbound: PostgreSQL port to RDS

**Database (RDS):**

- Inbound: PostgreSQL (5432) from Elastic Beanstalk only
- Outbound: None required

---

## Regions and Availability

**Primary Region:** `us-east-1` (or as configured)

**Availability Zones:**

- Multi-AZ deployment for RDS (production)
- Single AZ for development/testing

---

## Scalability

### Horizontal Scaling

- **Frontend:** S3 automatically scales
- **Backend:** Elastic Beanstalk can use Auto Scaling groups
- **Database:** RDS read replicas for read-heavy workloads

### Vertical Scaling

- Elastic Beanstalk instance types can be upgraded
- RDS instance class can be modified

---

## Monitoring and Logging

### CloudWatch

- Application logs from Elastic Beanstalk
- RDS performance metrics
- S3 access logs (if enabled)

### Elastic Beanstalk Health Dashboard

- Environment health status
- Enhanced health reporting
- Request metrics

---

## Cost Optimization

### Development Environment

- Single instance Elastic Beanstalk
- Smallest RDS instance (db.t3.micro)
- Standard S3 storage

### Production Environment

- Load-balanced Elastic Beanstalk with auto-scaling
- Appropriately sized RDS instance
- Multi-AZ for high availability
- S3 with CloudFront CDN (optional)

---

## Backup and Disaster Recovery

### Database Backups

- Automated daily backups (RDS)
- Retention period: 7-35 days
- Point-in-time recovery enabled

### Application Backups

- Source code in GitHub
- Application versions stored in S3 by Elastic Beanstalk
- Frontend assets in S3 with versioning enabled

---

## Security Best Practices

1. **Encryption:**

   - SSL/TLS for data in transit
   - Encryption at rest for RDS (optional)

2. **Access Control:**

   - IAM roles for service access
   - Security groups for network isolation
   - No hardcoded credentials

3. **Secrets Management:**

   - Environment variables in Elastic Beanstalk
   - AWS Secrets Manager (recommended for production)

4. **Updates:**
   - Regular platform updates via Elastic Beanstalk
   - Database patches via RDS maintenance windows

---

## Infrastructure as Code

The infrastructure can be provisioned using:

- AWS Console (manual setup)
- AWS CLI commands
- Elastic Beanstalk CLI (`eb` commands)
- CloudFormation templates (future enhancement)
- Terraform (future enhancement)

---

## Connection Flow

```
User Request
     ↓
[S3 - Frontend]
     ↓
[Elastic Beanstalk - Backend API]
     ↓
[RDS - PostgreSQL Database]
     ↓
Response to User
```

---

## Resource Naming Convention

- **S3 Bucket:** `udacity-store-frontend`
- **EB Application:** `udacity-store-api`
- **EB Environment:** `udacity-store-api-prod`
- **RDS Instance:** `udacity-store-db`

---

## Maintenance Windows

- **RDS:** Weekly maintenance window (configurable)
- **Elastic Beanstalk:** Rolling updates (no downtime)
- **S3:** No maintenance required (fully managed)
