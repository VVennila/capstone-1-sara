![image](https://github.com/user-attachments/assets/cfa42cfd-e115-4649-bd40-b08577984c74)


To execute the project described, I will outline the architecture and a sample application, along with the CI/CD pipeline structure. This will ensure the development-to-production process is automated and efficient, meeting the demands of the team's growth.

### **1. Application Overview**

You can use a simple web application like a Node.js-based Express app for this purpose, as it is lightweight and easy to set up. Here's the basic structure:

**Application Architecture**:
- **Backend**: Node.js with Express framework
- **Database**: MongoDB (as it's fast and easy to deploy)
- **Frontend**: Basic HTML with some JavaScript (optional)
- **Environment**: 
  - Dev (development)
  - Stage (staging)
  - Prod (production)

### **2. Architecture Diagram**

1. **Version Control System (GitHub)**:
   - **Branching Strategy**:
     - `dev`: Primary development branch.
     - `feature branches`: Derived from `dev`, used for new features.
     - `stage`: Pre-production environment for final testing.
     - `prod`: Production-ready environment.
   - **Pull Requests (PR)**: Engineers create PRs from feature branches to `dev`. Once merged into `dev`, further testing happens in the `stage` branch, followed by the `prod` branch.

2. **CI/CD Pipeline**:
   - **Dev Branch**: When code is merged into `dev`, the pipeline triggers the deployment to the **dev** environment.
   - **Stage Branch**: Once ready, the `stage` branch merges from `dev` and automatically deploys to the **staging** environment.
   - **Prod Branch**: After testing in staging, the `prod` branch merges from `stage`, and the final deployment happens in **production**.

### **3. Branching Strategy Setup in GitHub**

1. **Branch Permissions**:
   - Set branch protection rules for `prod`, `stage`, and `dev` branches in GitHub.
   - Require pull request reviews and status checks (CI must pass) before merging.

2. **Git Commands for Branching**:
   - Create a feature branch from `dev`:
     ```bash
     git checkout dev
     git checkout -b feature/new-feature
     ```
   - After making changes, push and create a PR for `dev`:
     ```bash
     git add .
     git commit -m "new feature"
     git push origin feature/new-feature
     ```
   - Once reviewed and tested, merge `dev` into `stage` and `stage` into `prod`.

<!-- ### **4. CI/CD Pipeline Example**

You can use **GitHub Actions** for the CI/CD pipeline.

#### **Sample GitHub Actions Workflow** (`.github/workflows/cicd.yml`):
```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - dev
      - stage
      - prod

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm install

    - name: Run Tests
      run: npm test

  deploy:
    needs: build
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Deploy to Environment
      if: github.ref == 'refs/heads/dev'
      run: |
        echo "Deploying to Dev"
        # Deployment logic for dev environment (can use AWS, Heroku, etc.)
    
    - name: Deploy to Staging
      if: github.ref == 'refs/heads/stage'
      run: |
        echo "Deploying to Staging"
        # Deployment logic for staging environment

    - name: Deploy to Production
      if: github.ref == 'refs/heads/prod'
      run: |
        echo "Deploying to Production"
        # Deployment logic for production environment
``` -->

### **5. Deployment**

You can use any cloud platform for deployment. For this project, let's assume **AWS EC2** instances for the environments:

1. **Dev Environment**: Deployed to an EC2 instance for development testing.
2. **Staging Environment**: Another EC2 instance for staging, used for UAT (User Acceptance Testing).
3. **Prod Environment**: The final EC2 instance where the production app runs.

### **6. Completing the Workflow**

The flow will be:
- Developers create feature branches, make changes, and open PRs to `dev`.
- After PR approval, changes are automatically deployed to the `dev` environment.
- Once testing in `dev` is complete, the `stage` branch merges from `dev` and deploys to the staging environment.
- After testing in `stage`, the `prod` branch merges from `stage` and deploys to the production environment.

Here is the code for a simple **Node.js-based Express** web application that you can use for the project. This app will provide basic routes and endpoints for testing and can be deployed to different environments (Dev, Stage, Prod).

### **1. Setup Project Structure**

1. Create a directory for the project:
   ```bash
   mkdir cicd-express-app
   cd cicd-express-app
   ```

2. Initialize a Node.js project:
   ```bash
   npm init -y
   ```

3. Install necessary dependencies:
   ```bash
   npm install express dotenv
   ```

4. Create the following folder structure:

   ```
   cicd-express-app/
   ├── .github/
   │   └── workflows/
   │       └── cicd.yml          # GitHub Actions workflow (optional)
   ├── src/
   │   └── server.js             # Main server file
   ├── .env                      # Environment variables file
   ├── .gitignore                # Git ignore file
   ├── package.json              # Node.js config file
   └── README.md                 # Optional: Project description
   ```

---

### **2. Coding the Application**

#### **`src/server.js`** (Main App Logic)

```javascript
const express = require('express');
require('dotenv').config();  // To load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Define a basic route for the homepage
app.get('/', (req, res) => {
    res.send(`Welcome to the CICD Express App - Environment: ${process.env.ENVIRONMENT}`);
});

// Additional route for health checks
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'App is healthy!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

### **3. Environment Variables**

#### **`.env`** (Environment-Specific Configurations)

You will need to create environment variables for different environments (Dev, Stage, Prod). You can create separate `.env` files for each environment.

For example, in **development** you would have:

```plaintext
PORT=3000
ENVIRONMENT=development
```

In **staging**:

```plaintext
PORT=3001
ENVIRONMENT=staging
```

In **production**:

```plaintext
PORT=3002
ENVIRONMENT=production
```

---

### **4. Add a `.gitignore` File**

Create a `.gitignore` file to exclude unnecessary files:

#### **`.gitignore`**

```plaintext
node_modules/
.env
```

---

### **5. Run the Application**

Run the application locally to ensure it's working correctly:

```bash
node src/server.js
```

You should see output like this:

```
Server running on port 3000
```

Access it at [http://localhost:3000](http://localhost:3000), and you should see the message:

```
Welcome to the CICD Express App - Environment: development
```

If you go to the `/health` route ([http://localhost:3000/health](http://localhost:3000/health)), you'll see:

```json
{
    "status": "UP",
    "message": "App is healthy!"
}
```

---

### **6. Integrating with CI/CD Pipeline**

You can now integrate this app with the **GitHub Actions CI/CD pipeline** defined earlier. After making changes, create feature branches, PRs, and merge them following the branching strategy.

When merged to `dev`, it deploys to your Dev environment; when merged to `stage`, it deploys to Staging, and finally to Production when merged to `prod`.

---

### **7. Deployment Instructions (Optional)**

If you want to deploy the app to **AWS EC2**:

1. **Launch EC2 instances** (one for each environment: Dev, Stage, Prod).
2. **SSH into the EC2 instance** and install Node.js.
   ```bash
   sudo apt update
   sudo apt install nodejs npm -y
   ```
3. **Clone your GitHub repository** on the instance.
   ```bash
   git clone https://github.com/your-username/cicd-express-app.git
   ```
4. **Install dependencies**:
   ```bash
   cd cicd-express-app
   npm install
   ```
5. **Run the application**:
   ```bash
   node src/server.js
   ```

---

Here’s an AWS architecture block diagram for the **CICD Express Application** with the branching strategy (Dev, Stage, Prod) and deployment using AWS EC2 instances. 

### **1. Architecture Components**:

#### **Core Components**:
- **GitHub**:
  - Code repository where the branching strategy (Dev, Stage, Prod) is implemented.
  - GitHub Actions handles the CI/CD pipeline, deploying the code to different AWS environments.
  
- **AWS EC2** (Elastic Compute Cloud):
  - **EC2 Instances** in each environment (Development, Staging, Production) where the Node.js Express application is deployed.
  - Each environment has its own EC2 instance running a different version of the app based on the corresponding branch.

- **S3 (Optional)**:
  - Used for storing static assets or logs, depending on the app’s requirements.

- **RDS (Optional)**:
  - If a database is needed, RDS (Relational Database Service) can be integrated for managing data.

- **Route 53 (Optional)**:
  - Can be used for managing DNS and routing traffic to the correct environment (Dev, Stage, Prod).

- **Elastic Load Balancer (Optional)**:
  - Load balancing can be used in case of high traffic for scaling the app.

---

### **2. AWS Architecture Block Diagram**:

The diagram includes the flow from GitHub (source) through the CI/CD pipeline to the AWS environments.

```plaintext
 +-----------------------------+
 |         GitHub Repo          |
 |   - dev branch               |
 |   - stage branch             |
 |   - prod branch              |
 +-----------------------------+
              |
              v
 +-------------------------------+
 |         GitHub Actions         |
 |  - CI/CD Pipelines             |
 |  - Tests, builds, deploys      |
 +-------------------------------+
              |
              v
+-------------------------------------+
|            AWS Infrastructure       |
|                                     |
|    +---------------------------+    |
|    |       Dev Environment      |    |
|    |  +---------------------+   |    |
|    |  |    EC2 Instance      |   |    |
|    |  |  - Express App       |   |    |
|    |  |  - Environment: Dev  |   |    |
|    |  +---------------------+   |    |
|    +---------------------------+    |
|                                     |
|    +---------------------------+    |
|    |     Staging Environment    |    |
|    |  +---------------------+   |    |
|    |  |    EC2 Instance      |   |    |
|    |  |  - Express App       |   |    |
|    |  |  - Environment: Stage|   |    |
|    |  +---------------------+   |    |
|    +---------------------------+    |
|                                     |
|    +---------------------------+    |
|    |   Production Environment   |    |
|    |  +---------------------+   |    |
|    |  |    EC2 Instance      |   |    |
|    |  |  - Express App       |   |    |
|    |  |  - Environment: Prod |   |    |
|    |  +---------------------+   |    |
|    +---------------------------+    |
|                                     |
+-------------------------------------+
```

### **3. Diagram Explanation**:

- **GitHub Repository**: 
  - Developers push code to feature branches.
  - Feature branches are merged into the `dev` branch, which triggers a GitHub Actions workflow.
  - The workflow then builds and deploys the application to the **Development** EC2 instance.
  
- **GitHub Actions**:
  - **CI/CD Pipeline** automatically runs on pushes to `dev`, `stage`, and `prod` branches.
  - Each branch triggers a specific deployment to the appropriate environment (Dev, Stage, Prod).
  
- **AWS EC2 Instances**:
  - Separate EC2 instances are used for each environment: Dev, Stage, and Prod.
  - Each instance runs the Express application for its respective environment.
  - The deployment process involves SSHing into each EC2 instance and updating the application code.

### **4. Optional Components** (For Scaling):

- **RDS (Database)**:
  - Use RDS to store application data if necessary, with a shared or separate database for each environment.
  
- **Elastic Load Balancer (ELB)**:
  - If you expect high traffic, an ELB can distribute traffic between multiple EC2 instances for high availability.
  
- **S3 Bucket**:
  - If you want to store logs, assets, or backups, you can use an S3 bucket.
  
- **Route 53**:
  - Route 53 can manage DNS and direct traffic to the correct environment (dev, stage, prod).

---

### **5. Summary of Steps**:

1. **GitHub Actions** will monitor for changes in your `dev`, `stage`, and `prod` branches.
2. When a PR is merged into one of the branches:
   - **Dev Branch**: Deploy to the **Dev EC2 instance**.
   - **Stage Branch**: Deploy to the **Stage EC2 instance**.
   - **Prod Branch**: Deploy to the **Prod EC2 instance**.
3. Each EC2 instance will host a different version of the app, depending on the branch.
4. You can add scaling, load balancing, and databases as your application grows.

To create a **Dev (Primary Development)** branch from **VS Code** and manage it with **Git**, follow these steps:

### **1. Initialize Git in Your Project**

If you haven’t initialized Git in your project directory, do so:

1. **Open your project in VS Code**.
2. Open the **terminal** in VS Code (`Ctrl + ``).
3. Run the following command to initialize Git in your project directory:

   ```bash
   git init
   ```

This will initialize a new Git repository in your project folder.

---

### **2. Create the `dev` Branch**

1. **Open the Git tab** in VS Code (on the left-hand side with the `source control` icon).
   
2. In the terminal, **create the `dev` branch** by running:

   ```bash
   git checkout -b dev
   ```

   This command does the following:
   - `git checkout`: Switches branches.
   - `-b dev`: Creates a new branch called `dev` and switches to it.

3. After running the command, you will now be working on the `dev` branch. You can confirm this by looking at the **bottom left corner** of VS Code. It will display `dev` as the active branch.

---

### **3. Stage, Commit, and Push Changes**

Now that you have created the `dev` branch, let's commit some code:

1. **Stage your changes** (if you have any changes to commit):

   You can do this from the **Git tab** in VS Code by clicking the **plus (+)** icon next to the files you want to stage, or you can use the terminal:

   ```bash
   git add .
   ```

   The `.` adds all changes in your current directory.

2. **Commit the changes**:

   ```bash
   git commit -m "Initial commit on dev branch"
   ```

3. **Push the `dev` branch to the remote repository** (if you have a remote setup, like GitHub):

   ```bash
   git push -u origin dev
   ```

   - `-u origin dev`: This sets the upstream branch so that future `git push` commands will automatically push to the `dev` branch without needing to specify it.

---

### **4. Verify the Dev Branch**

You can verify that your `dev` branch is created and switched correctly by:

- Checking the **bottom left corner** of VS Code (it should show `dev`).
- Running the following Git command to list all branches:

   ```bash
   git branch
   ```

   The active branch will have an asterisk (*) next to it, like this:

   ```bash
   * dev
     main
   ```

---

### **5. Switching Between Branches**

Once the `dev` branch is created, you can switch between the `main` and `dev` branches at any time:

- To switch to the `main` branch:

   ```bash
   git checkout main
   ```

- To switch back to the `dev` branch:

   ```bash
   git checkout dev
   ```

---

### **6. Best Practices for Dev Branching**

- **Create feature branches** from the `dev` branch when working on new features. You can do this with:

   ```bash
   git checkout -b feature/your-feature-name
   ```

- After completing the feature, **merge the feature branch back into the `dev` branch**:

   ```bash
   git checkout dev
   git merge feature/your-feature-name
   ```

---
