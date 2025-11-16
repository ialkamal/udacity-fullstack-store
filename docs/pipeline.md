# Pipeline Process

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Udacity Fullstack Store application using CircleCI.

---

## Pipeline Overview

The CI/CD pipeline is triggered automatically on every push to the `master` branch and follows these stages:

1. **Environment Setup**
2. **Dependency Installation**
3. **Build Process**
4. **Testing** (if configured)
5. **Deployment to AWS**

---

## CircleCI Configuration

**Configuration File:** `.circleci/config.yml`

**Executor:** Docker container with Node.js 20.19

**Orbs Used:**

- `circleci/node@4.1.0` - Node.js utilities
- `circleci/aws-cli@1.3.1` - AWS CLI setup

---

## Pipeline Stages

### Stage 1: Code Checkout

```yaml
- checkout
```

**Purpose:** Clone the repository from GitHub

**Actions:**

- Fetches the latest code from the repository
- Checks out the branch that triggered the pipeline
- Prepares the workspace for subsequent steps

**Duration:** ~5-10 seconds

---

### Stage 2: AWS CLI Setup

```yaml
- aws-cli/setup:
    aws-access-key-id: AWS_ACCESS_KEY_ID
    aws-secret-access-key: AWS_SECRET_ACCESS_KEY
    aws-region: AWS_DEFAULT_REGION
```

**Purpose:** Configure AWS credentials for deployment

**Actions:**

- Installs AWS CLI
- Configures credentials from environment variables
- Sets the default AWS region

**Required Environment Variables:**

- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_DEFAULT_REGION` - Target AWS region (e.g., us-east-1)

**Duration:** ~10-15 seconds

---

### Stage 3: Install Elastic Beanstalk CLI

```yaml
- run:
    name: Install EB CLI
    command: |
      sudo apt-get update
      sudo apt-get install -y python3-pip python3-dev build-essential
      pip3 install awsebcli --upgrade --user --break-system-packages
      echo 'export PATH=$HOME/.local/bin:$PATH' >> $BASH_ENV
      source $BASH_ENV
```

**Purpose:** Install EB CLI for backend deployment

**Actions:**

- Updates package lists
- Installs Python and pip dependencies
- Installs AWS Elastic Beanstalk CLI
- Adds EB CLI to PATH

**Duration:** ~30-45 seconds

---

### Stage 4: Frontend Installation

```yaml
- run:
    name: Front-End Install
    command: |
      npm run frontend:install
```

**Purpose:** Install Angular application dependencies

**Actions:**

- Navigates to `Frontend/` directory
- Runs `npm install`
- Downloads all npm packages listed in `package.json`
- Creates `node_modules/` folder

**Dependencies Installed:**

- Angular framework (~20.3.8)
- TypeScript
- RxJS
- Development tools

**Duration:** ~60-90 seconds

---

### Stage 5: Backend Installation

```yaml
- run:
    name: Back-End Install
    command: |
      npm run backend:install
```

**Purpose:** Install Express API dependencies

**Actions:**

- Navigates to `Backend/` directory
- Runs `npm install`
- Downloads all npm packages
- May run postinstall scripts (database migrations)

**Dependencies Installed:**

- Express.js
- PostgreSQL client
- JWT and bcrypt
- TypeScript
- Testing frameworks

**Duration:** ~45-60 seconds

---

### Stage 6: Frontend Build

```yaml
- run:
    name: Front-End Build
    command: |
      npm run frontend:build
```

**Purpose:** Compile Angular application for production

**Actions:**

- Navigates to `Frontend/` directory
- Runs `ng build`
- Compiles TypeScript to JavaScript
- Optimizes and minifies code
- Generates production-ready static files in `dist/` folder

**Build Optimizations:**

- Tree shaking (removes unused code)
- Minification
- Bundle optimization
- AOT (Ahead of Time) compilation

**Output:** `Frontend/dist/` directory

**Duration:** ~60-120 seconds

---

### Stage 7: Backend Build

```yaml
- run:
    name: Back-End Build
    command: |
      npm run backend:build
```

**Purpose:** Compile TypeScript backend code

**Actions:**

- Navigates to `Backend/` directory
- Runs `tsc` (TypeScript compiler)
- Compiles `.ts` files to `.js` files
- Generates JavaScript code in `dist/` folder

**Output:** `Backend/dist/` directory containing compiled JavaScript

**Duration:** ~15-30 seconds

---

### Stage 8: Frontend Deployment

```yaml
- run:
    name: Deploy Frontend App
    command: |
      npm run frontend:deploy
```

**Purpose:** Deploy Angular app to AWS S3

**Actions:**

- Navigates to `Frontend/` directory
- Runs deployment script
- Uploads compiled files from `dist/` to S3 bucket
- Configures bucket for static website hosting

**AWS Resources:**

- S3 bucket with static website hosting enabled
- Public read access for web content

**Duration:** ~20-40 seconds

---

### Stage 9: Backend Deployment

```yaml
- run:
    name: Deploy Backend App
    command: |
      cd ./Backend
      eb init $EB_APP_NAME --region $AWS_DEFAULT_REGION --platform node.js
      eb use $EB_ENV_NAME
      eb deploy
```

**Purpose:** Deploy Express API to AWS Elastic Beanstalk

**Actions:**

- Navigates to `Backend/` directory
- Initializes EB application
- Selects EB environment
- Packages application code
- Uploads to Elastic Beanstalk
- Deploys new application version

**Required Environment Variables:**

- `EB_APP_NAME` - Elastic Beanstalk application name
- `EB_ENV_NAME` - Elastic Beanstalk environment name

**AWS Resources:**

- Elastic Beanstalk environment
- EC2 instance(s)
- Load balancer (if configured)

**Duration:** ~3-5 minutes

---

## Complete Pipeline Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Push to Master                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              CircleCI Pipeline Triggered                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │   1. Checkout Code      │
        └──────────┬──────────────┘
                   │
                   ▼
        ┌─────────────────────────┐
        │   2. Setup AWS CLI      │
        └──────────┬──────────────┘
                   │
                   ▼
        ┌─────────────────────────┐
        │   3. Install EB CLI     │
        └──────────┬──────────────┘
                   │
                   ▼
        ┌─────────────────────────┐
        │ 4. Frontend Install     │
        └──────────┬──────────────┘
                   │
                   ▼
        ┌─────────────────────────┐
        │ 5. Backend Install      │
        └──────────┬──────────────┘
                   │
                   ▼
        ┌─────────────────────────┐
        │ 6. Frontend Build       │
        └──────────┬──────────────┘
                   │
                   ▼
        ┌─────────────────────────┐
        │ 7. Backend Build        │
        └──────────┬──────────────┘
                   │
                   ▼
        ┌─────────────────────────┐
        │ 8. Deploy Frontend      │
        │    (to AWS S3)          │
        └──────────┬──────────────┘
                   │
                   ▼
        ┌─────────────────────────┐
        │ 9. Deploy Backend       │
        │ (to Elastic Beanstalk)  │
        └──────────┬──────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              Deployment Complete ✓                           │
│    Frontend: Live on S3  |  Backend: Live on EB             │
└─────────────────────────────────────────────────────────────┘
```

---

## Environment Variables Configuration

### Required CircleCI Project Variables

Set these in CircleCI Project Settings → Environment Variables:

| Variable                | Description         | Example                                    |
| ----------------------- | ------------------- | ------------------------------------------ |
| `AWS_ACCESS_KEY_ID`     | AWS IAM access key  | `AKIAIOSFODNN7EXAMPLE`                     |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key  | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_DEFAULT_REGION`    | AWS region          | `us-east-1`                                |
| `EB_APP_NAME`           | EB application name | `udacity-store-api`                        |
| `EB_ENV_NAME`           | EB environment name | `udacity-store-api-prod`                   |

---

## Pipeline Triggers

### Automatic Triggers

- **Push to Master:** Pipeline runs on every commit to `master` branch
- **Pull Request:** Can be configured to run on PR creation

### Manual Triggers

- Rerun failed workflows from CircleCI dashboard
- Trigger via CircleCI API

---

## Success Criteria

The pipeline is considered successful when:

1. ✓ All dependencies install without errors
2. ✓ Frontend builds successfully
3. ✓ Backend builds successfully
4. ✓ Frontend deploys to S3
5. ✓ Backend deploys to Elastic Beanstalk
6. ✓ Application is accessible via AWS URLs

---

## Failure Handling

### Common Failure Points

1. **Dependency Installation:**

   - Network issues
   - Package conflicts
   - Version incompatibilities

2. **Build Failures:**

   - TypeScript compilation errors
   - Missing environment variables
   - Syntax errors

3. **Deployment Failures:**
   - AWS credentials invalid
   - Insufficient permissions
   - Resource limits exceeded
   - EB environment not ready

### Failure Recovery

- CircleCI automatically fails the pipeline on error
- Developers are notified via email/Slack
- Failed builds can be rerun from the dashboard
- Logs are available for debugging

---

## Build Artifacts

### Frontend Artifacts

- Compiled Angular application in `Frontend/dist/`
- Uploaded to S3 bucket

### Backend Artifacts

- Compiled TypeScript in `Backend/dist/`
- Application bundle uploaded to Elastic Beanstalk

---

## Performance Metrics

### Average Pipeline Duration

| Stage            | Duration          |
| ---------------- | ----------------- |
| Checkout         | ~10s              |
| AWS Setup        | ~15s              |
| EB CLI Install   | ~40s              |
| Frontend Install | ~75s              |
| Backend Install  | ~50s              |
| Frontend Build   | ~90s              |
| Backend Build    | ~20s              |
| Frontend Deploy  | ~30s              |
| Backend Deploy   | ~240s             |
| **Total**        | **~8-10 minutes** |

---

## Rollback Strategy

### Manual Rollback

1. **Frontend (S3):**

   - S3 versioning allows reverting to previous version
   - Redeploy previous commit via CircleCI

2. **Backend (EB):**
   - Elastic Beanstalk keeps previous application versions
   - Use `eb deploy --version <version-label>` to rollback
   - Or use AWS Console to restore previous version

### Automated Rollback

Not currently configured, but can be added:

- Health checks after deployment
- Automatic rollback on failed health checks

---

## Monitoring and Notifications

### CircleCI Notifications

- Email notifications on build failure
- Slack integration (configurable)
- GitHub commit status updates

### AWS Monitoring

- CloudWatch logs for application errors
- Elastic Beanstalk health monitoring
- S3 access logs (if enabled)

---

## Security Considerations

1. **Secrets Management:**

   - All credentials stored as CircleCI environment variables
   - Never committed to repository
   - Encrypted at rest and in transit

2. **Access Control:**

   - IAM user with minimal required permissions
   - Separate credentials for CI/CD
   - Regular credential rotation

3. **Code Scanning:**
   - Can integrate SonarCloud or similar
   - Dependency vulnerability scanning with `npm audit`

---

## Pipeline Optimization

### Current Optimizations

- Caching dependencies (can be enabled)
- Parallel job execution (can be configured)
- Docker layer caching

### Future Improvements

- Add automated testing stage
- Implement caching for `node_modules`
- Add code quality checks
- Implement blue-green deployments
- Add smoke tests after deployment

---

## Workflow File

Location: `.circleci/config.yml`

Version: 2.1

Executor: Docker (cimg/node:20.19)

---

## Troubleshooting

### Common Issues

1. **Node version mismatch:**

   - Ensure CircleCI uses Node.js 20.19+

2. **AWS credentials invalid:**

   - Verify environment variables in CircleCI

3. **EB environment not initialized:**

   - Ensure `EB_APP_NAME` and `EB_ENV_NAME` are set

4. **Build timeout:**
   - Increase CircleCI timeout in config

### Debug Commands

```bash
# Check Node version
node --version

# Verify AWS credentials
aws sts get-caller-identity

# Check EB CLI
eb --version

# List EB environments
eb list
```

---

## Maintenance

### Regular Tasks

- **Weekly:** Review pipeline logs for warnings
- **Monthly:** Update dependencies
- **Quarterly:** Review and optimize pipeline performance
- **Annually:** Rotate AWS credentials

### Updates

- CircleCI orbs should be updated regularly
- Node.js version updates require testing
- AWS CLI version managed by orb
