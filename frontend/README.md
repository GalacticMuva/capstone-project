# IP & Compliance Asset Ledger
### *Integrated Full-Stack Product Management and AI Automation Architecture*

## 🚀 Project Overview
This repository contains a unified full-stack enterprise product catalog engineered to model a **Legal-Tech & Compliance Asset Marketplace**. It allows creators and enterprise teams to track, register, and modify software licensing assets (e.g., automated accessibility compliance modules, digital copyright engines, and privacy configuration wrappers).

The architecture features a custom, relational database persistence tier, a responsive, highly accessible dashboard interface, an automated conversational AI workflow, and a single-process production cloud runtime pattern.

---

## 🛠️ Technical Stack & Infrastructure

### 1. Relational Persistence & Backend API
*   **Engine**: Python 3.11+ / Flask Framework
*   **Database**: PostgreSQL Relational Engine
*   **Driver**: `psycopg2-binary` (Utilizing raw database cursors and explicit transaction controls)
*   **Data Models**: Implements structured JSON-serialized endpoints managing a normalized schema tracking `id` (Primary Key), `name` (String descriptor), `price` (Numeric precision currency), and `quantity` (Integer tracking distribution licenses).

### 2. Frontend User Interface
*   **Engine**: React / Vite Compilation Architecture
*   **Styling**: Tailwind CSS v4 (Utility-first atomic styling framework)
*   **Accessibility Implementation (WCAG 2.2 Compliant)**: Designed from the ground up to ensure screen-reader and assistive hardware compatibility. Incorporates high-visibility focus indicators, explicit semantic structures, native element grouping, and keyboard-navigable interactive components.

### 3. Workflow Automation & Information Assistant
*   **Platform**: n8n Workflow Automation Sandbox Engine
*   **AI Brokerage**: Advanced LLM Token Core Processing
*   **Data Loop**: Intercepts natural language inputs, triggers a transactional `GET` payload request to the Flask API endpoint, extracts the active item schema list, and dynamically injects the payload variables into the model's environment window to formulate accurate inventory and compliance audits.

### 4. Cloud Compilation & Build Optimization
*   **Pipeline**: React production compilation bundles (`npm run build`) are natively integrated and served directly from Flask's internal `/static` and `/templates` layout indices. This single-process configuration removes cross-origin hosting overheads and balances system workloads inside AWS EC2 computing zones.

---

## 📂 Repository Structural Mapping
```text
capstone-project/
├── backend/
│   ├── app.py             # Main Flask routing server and psycopg2 raw SQL endpoints
│   ├── templates/         # Houses the production-compiled front-end index.html file
│   ├── static/            # Hosts the packed UI application script assets
│   ├── .env               # Encrypted local database system parameter configurations
│   └── requirements.txt   # Documented Python software dependencies
├── frontend/
│   ├── src/               # React codebase module files (App.jsx, index.css)
│   ├── vite.config.js     # Configured compiler plugin tracking Tailwind integration
│   └── package.json       # Documented Node module architecture details
├── n8n_workflow.json      # Exportable system automation script object mapping the AI logic
└── .gitignore             # Git security standard protecting local credentials and folders
```

---

## 💻 Local Quickstart Installation

### 1. Launch the Database Layer
Ensure your local PostgreSQL server instance is active, create a target database, and note your system credentials.

### 2. Configure the Backend API
Navigate to the `/backend` folder, initiate a virtual python environment, install packages, and append your credentials to your local `.env` file:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

# Add your credentials to your local .env file inside /backend
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name

# Launch the Flask server process
python app.py
```
*The database layer will auto-initialize the required schema and run on `http://localhost:5000`.*

### 3. Configure the Front-End Dashboard
Open an independent terminal tab, navigate to the `/frontend` directory, install system assets, and activate the compiler framework:
```bash
cd frontend
npm install
npm run dev
```
*The local development interface will launch on `http://localhost:5173` or `http://localhost:5174`.*

---

## 🌐 Production Cloud Deployment Steps (AWS EC2)

Once your AWS IAM dashboard credentials and security permissions are activated by the administrator, execute the deployment phase using these production configurations:

### 1. Bundle and Link Front-End Static Assets
Run the build script in your React workspace and migrate the compressed components directly into Flask's processing folders:
```bash
cd frontend
npm run build
mkdir -p ../backend/templates && rm -rf ../backend/static ../backend/templates/index.html && cp -r dist/assets ../backend/static && cp dist/index.html ../backend/templates/
```

### 2. Provision and Run the EC2 Virtual Instance
1. Launch an **AWS EC2 Virtual Ubuntu Instance** inside your console sandbox.
2. Update the system **Inbound Security Groups** to process active web traffic routing on Port `80` (HTTP) and Port `5000`.
3. Clone your GitHub repository onto your virtual instance container, install your project dependencies, and execute `python app.py`.

### 3. Route Your Custom Subdomain Architecture
Map your running instance's static elastic public IP reference address to your required DNS naming record structures within the base class tracking environments:
`http://yourdomain.com`

---

## 🎯 Verification Milestones & Deliverables
*   **Public Repository Access Link**: `https://github.com`
*   **Live Cloud Subdomain Execution Target**: `http://yourdomain.com`
*   **Automation Asset Script**: Documented node orchestration variables are safely exported inside `n8n_workflow.json`.


### 🚀 Implementation Retrospective & Execution Plan

#### **What I Accomplished Tonight**
1. **Engineered the Data and API Layer**: Built a robust Python/Flask backend using raw `psycopg2` cursor tracking. Configured deep error handling and structural table auto-initialization patterns to guarantee seamless PostgreSQL database provisioning.
2. **Created a Premium User Experience**: Developed an interactive front-end application architecture with React and Vite. Styled the canvas with utility-first Tailwind CSS, prioritizing high-visibility focus layers and semantic element grouping to maintain strict WCAG accessibility compliance.
3. **Mapped Out the Automation Logic**: Engineered and wrote the complete JSON node schema for the 3-node n8n workflow pipeline. Structured the data mapping to feed live relational database objects directly into the AI system message block.
4. **Compiled for Production Environments**: Successfully executed the front-end distribution compiler workflows (`npm run build`). Used automated command-line scripts to migrate the compressed static code directories into Flask's internal routing targets, establishing a single-process deployment setup.
5. **Secured Source Code Backups**: Initialized a master tracking Git repository, mapped comprehensive system safety filters (`.gitignore`), and pushed all code assets securely to a remote GitHub cloud vault on the main branch.

#### **My Strategic Plan to Finalize Step 3 & Step 4**
The local full-stack codebase, compilation pipelines, and automation schemas are **100% complete**. Once I am back from traveling and the instructor opens administrative AWS security clearance, I will execute these remaining steps:
1. **Import the n8n JSON Schema**: Open the instructor's n8n sandbox link, paste the completed workflow JSON onto the canvas grid, plug in the designated class chat model, and save the automation.
2. **Provision the Instance Container**: Spin up an AWS EC2 instance environment, map the inbound network security rules to process traffic on web port `5000`, and pull down the finished GitHub code assets.
3. **Map the Subdomain Architecture**: Bind the server's public network reference link to my personal student naming routing path (`http://yourdomain.com`).
4. **Update Automation Call Paths**: Swap the internal testing target string (`http://localhost:5000`) inside the n8n HTTP request block to match the live, cloud-deployed student subdomain URL.
5. **Capture Validation Artifacts**: Run a live diagnostic check by asking the n8n chatbot to calculate active database inventory metrics, capture a screenshot of the successful text interaction, and save it for final grading.
