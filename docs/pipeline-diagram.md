# CI/CD Pipeline Architecture Diagram

This diagram shows the continuous integration and deployment pipeline using CircleCI and AWS.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                         DEVELOPER WORKFLOW                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

        Developer writes code locally
                    │
                    ▼
        ┌───────────────────────┐
        │   Git Commit          │
        │   Git Push            │
        └──────────┬────────────┘
                   │
                   ▼
        ┌───────────────────────┐
        │   GitHub Repository   │
        │   (master branch)     │
        └──────────┬────────────┘
                   │
                   │ Webhook Trigger
                   │
                   ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                         CIRCLECI PIPELINE                                    │
│                       (Docker: cimg/node:20.19)                              │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                        STAGE 1: SETUP                                  │ │
│  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐    │ │
│  │  │   Checkout   │───▶│  AWS CLI     │───▶│  Install EB CLI      │    │ │
│  │  │     Code     │    │    Setup     │    │  (via pip3)          │    │ │
│  │  └──────────────┘    └──────────────┘    └──────────────────────┘    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                   STAGE 2: INSTALL DEPENDENCIES                        │ │
│  │                                                                        │ │
│  │         ┌─────────────────────┐         ┌─────────────────────┐      │ │
│  │         │  Frontend Install   │         │  Backend Install    │      │ │
│  │         │  (npm install)      │         │  (npm install)      │      │ │
│  │         │  - Angular deps     │         │  - Express deps     │      │ │
│  │         │  - TypeScript       │         │  - PostgreSQL       │      │ │
│  │         │  - RxJS             │         │  - JWT, bcrypt      │      │ │
│  │         └─────────────────────┘         └─────────────────────┘      │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                      STAGE 3: BUILD                                    │ │
│  │                                                                        │ │
│  │         ┌─────────────────────┐         ┌─────────────────────┐      │ │
│  │         │  Frontend Build     │         │  Backend Build      │      │ │
│  │         │  (ng build)         │         │  (tsc)              │      │ │
│  │         │                     │         │                     │      │ │
│  │         │  Output:            │         │  Output:            │      │ │
│  │         │  Frontend/dist/     │         │  Backend/dist/      │      │ │
│  │         │  - Optimized JS     │         │  - Compiled JS      │      │ │
│  │         │  - Minified CSS     │         │  - Type definitions │      │ │
│  │         │  - HTML             │         │                     │      │ │
│  │         └─────────────────────┘         └─────────────────────┘      │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                     STAGE 4: DEPLOYMENT                                │ │
│  │                                                                        │ │
│  │         ┌─────────────────────┐         ┌─────────────────────┐      │ │
│  │         │  Deploy Frontend    │         │  Deploy Backend     │      │ │
│  │         │  (to AWS S3)        │         │  (to AWS EB)        │      │ │
│  │         │                     │         │                     │      │ │
│  │         │  Commands:          │         │  Commands:          │      │ │
│  │         │  - Upload dist/     │         │  - eb init          │      │ │
│  │         │  - Sync to bucket   │         │  - eb use env       │      │ │
│  │         │  - Set permissions  │         │  - eb deploy        │      │ │
│  │         └──────────┬──────────┘         └──────────┬──────────┘      │ │
│  │                    │                               │                  │ │
│  └────────────────────┼───────────────────────────────┼──────────────────┘ │
│                       │                               │                    │
└───────────────────────┼───────────────────────────────┼────────────────────┘
                        │                               │
                        │                               │
                        ▼                               ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                            AWS INFRASTRUCTURE                                │
│                                                                              │
│                                                                              │
│  ┌────────────────────────────┐         ┌──────────────────────────────┐   │
│  │                            │         │                              │   │
│  │        AWS S3              │         │    AWS Elastic Beanstalk     │   │
│  │   (Frontend Hosting)       │         │      (Backend Hosting)       │   │
│  │                            │         │                              │   │
│  │  Files Uploaded:           │         │  Application Deployed:       │   │
│  │  ✓ index.html              │         │  ✓ Node.js application       │   │
│  │  ✓ JavaScript bundles      │         │  ✓ EC2 instance updated      │   │
│  │  ✓ CSS files               │         │  ✓ Environment variables set │   │
│  │  ✓ Assets                  │         │  ✓ Health check passed       │   │
│  │                            │         │                              │   │
│  │  Status: ✓ LIVE            │         │  Status: ✓ LIVE              │   │
│  │                            │         │                              │   │
│  └────────────────────────────┘         └──────────────┬───────────────┘   │
│                                                         │                   │
│                                                         │                   │
│                                                         ▼                   │
│                                          ┌──────────────────────────────┐   │
│                                          │                              │   │
│                                          │   AWS RDS PostgreSQL         │   │
│                                          │      (Database)              │   │
│                                          │                              │   │
│                                          │  Connected to Backend        │   │
│                                          │  Status: ✓ RUNNING           │   │
│                                          │                              │   │
│                                          └──────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │   Application is LIVE    │
                        │   Users can access app   │
                        └──────────────────────────┘
```

---

## Pipeline Flow Summary

### 1. Trigger
```
Developer Push → GitHub → CircleCI Webhook
```

### 2. Environment Setup (30 seconds)
```
Checkout Code → Configure AWS CLI → Install EB CLI
```

### 3. Install Dependencies (2-3 minutes)
```
Frontend: npm install (Angular packages)
Backend: npm install (Express packages)
```

### 4. Build (2-3 minutes)
```
Frontend: ng build → dist/ folder (optimized)
Backend: tsc → dist/ folder (compiled)
```

### 5. Deploy (3-5 minutes)
```
Frontend: Upload to S3 → Configure bucket → LIVE
Backend: EB deploy → EC2 update → Health check → LIVE
```

---

## Timeline Visualization

```
Time    Stage                Action
─────   ────────────────    ──────────────────────────────
0:00    Start               Git push to master
0:05    Setup               Checkout code
0:15    Setup               Configure AWS CLI
0:30    Setup               Install EB CLI
0:45    Install             Frontend dependencies
2:00    Install             Backend dependencies
2:45    Build               Frontend compilation
4:30    Build               Backend compilation
4:45    Deploy              Upload to S3
5:15    Deploy              Deploy to Elastic Beanstalk
8:30    Complete            Application LIVE ✓
```

---

## Key Components

### GitHub
- **Role:** Source code repository
- **Trigger:** Webhook on push to master
- **Output:** Code delivered to CircleCI

### CircleCI
- **Role:** CI/CD orchestrator
- **Executor:** Docker container (Node.js 20.19)
- **Steps:** Install → Build → Test → Deploy
- **Output:** Deployed application

### AWS S3
- **Role:** Frontend static hosting
- **Input:** Compiled Angular files
- **Output:** Live website accessible to users

### AWS Elastic Beanstalk
- **Role:** Backend application hosting
- **Input:** Node.js application bundle
- **Output:** Running API server
- **Manages:** EC2, Load Balancer, Auto Scaling

### AWS RDS
- **Role:** Database service
- **Engine:** PostgreSQL
- **Connection:** Only from Elastic Beanstalk

---

## Environment Variables Flow

```
CircleCI Environment Variables
        │
        ├─▶ AWS_ACCESS_KEY_ID ──────────┐
        ├─▶ AWS_SECRET_ACCESS_KEY ──────┤
        ├─▶ AWS_DEFAULT_REGION ─────────┼─▶ Used by AWS CLI
        ├─▶ EB_APP_NAME ────────────────┤
        └─▶ EB_ENV_NAME ────────────────┘
                                         │
                                         ▼
                            Elastic Beanstalk Environment
                                         │
                                         ├─▶ POSTGRES_HOST
                                         ├─▶ POSTGRES_PORT
                                         ├─▶ POSTGRES_DB
                                         ├─▶ POSTGRES_USER
                                         ├─▶ POSTGRES_PASSWORD
                                         ├─▶ JWT_SECRET
                                         └─▶ PEPPER
```

---

## Deployment Success Criteria

### Frontend Deployment Success
- ✓ All files uploaded to S3
- ✓ Bucket configured for static hosting
- ✓ Website accessible via S3 URL
- ✓ CORS headers configured

### Backend Deployment Success
- ✓ Application bundle uploaded to EB
- ✓ EC2 instance(s) updated
- ✓ Health check returns OK
- ✓ API endpoints responding
- ✓ Database connection established

---

## Rollback Process

```
Deployment Failure Detected
        │
        ▼
┌───────────────────┐
│ Frontend Rollback │──▶ Restore previous S3 version
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Backend Rollback  │──▶ EB: Deploy previous version
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Verify Rollback   │──▶ Health checks pass
└───────────────────┘
```

---

## Monitoring Points

```
┌────────────────┐
│  CircleCI      │──▶ Build logs, success/failure notifications
└────────────────┘

┌────────────────┐
│  AWS CloudWatch│──▶ Application logs, metrics, alarms
└────────────────┘

┌────────────────┐
│  EB Health     │──▶ Instance health, request metrics
└────────────────┘

┌────────────────┐
│  RDS Metrics   │──▶ Database performance, connections
└────────────────┘
```

---

## Security in Pipeline

```
Secrets Management:
    ├─▶ CircleCI encrypted environment variables
    ├─▶ AWS IAM credentials (limited permissions)
    ├─▶ No credentials in source code
    └─▶ EB environment variables (encrypted)

Access Control:
    ├─▶ GitHub repository permissions
    ├─▶ CircleCI project access
    ├─▶ AWS IAM policies
    └─▶ Security groups for AWS resources
```
