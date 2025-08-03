# Scholar-Dorm

Scholar-Dorm is a web-based learning management system designed to empower Nigerian girls and young women (ages 13–35) with tech skills, mentorship, and project-based learning. This project is part of the Advanced DevOps course, where principles such as containerization, CI/CD, and deployment are applied.
Features

User registration and personalised learning goals
Modular tech courses with quizzes and offline resources
Mentorship matching and virtual check-ins
Confidence tracking dashboard (future development)
Project-based challenges and digital portfolio (future development)

Tech Stack

Backend: Node.js, Express, MongoDB
Frontend: React.js, TailwindCSS
Tools: Docker, GitHub Actions, Azure

Prerequisites

Node.js: v18.x
MongoDB: Local installation or MongoDB Atlas account
Git: For version control
Docker: For containerization (local setup)
npm: Included with Node.js

Setup Instructions
1. Clone the Repository
git clone https://github.com/JoyOffere/scholar-dorm.git
cd scholar-dorm

2. Backend Setup

Navigate to the Backend Directory:
cd backend


Install Dependencies:
npm install


Configure Environment Variables:

Create a .env file in the backend directory:
MONGO_URI=mongodb://localhost:27017/scholar-dorm
PORT=5000


Start the Backend:
npm start


The server will run on http://localhost:5000. Use Nodemon for auto-restart on file changes.



3. Frontend Setup

Navigate to the Frontend Directory:
cd ../frontend


Install Dependencies:
npm install


Start the Frontend:
npm start


The app will be available at http://localhost:3000.


4. MongoDB Setup

Local Installation:
Download and install MongoDB Community Server from the MongoDB Download Center.
Create a data directory: mkdir C:\data\db.
Start the MongoDB server in a new terminal: mongod.
Verify connection by restarting the backend and checking for “MongoDB connected”.


MongoDB Atlas (Alternative):
Sign up at MongoDB Atlas.
Create a free cluster and copy the connection string.
Update the .env file with the connection string.



5. Run Tests

Backend Tests:
cd backend
npm test


Frontend Tests (to be added in the future):
cd frontend
npm test



6. CI/CD Pipeline

The project uses GitHub Actions for CI.
Configure the pipeline in .github/workflows/ci.yml to run linting and tests on PRs.
Ensure your repository secrets (MongoDB URI for CI) are set in GitHub Settings.

7. Deployment

Local Docker:
Build Docker images: docker build -t scholar-dorm-backend ./backend and docker build -t scholar-dorm-frontend ./frontend.
Run with docker-compose up (using docker-compose.yml to be added).


Cloud Deployment:
Deploy to Azure using the CI/CD pipeline.
Update MONGO_URI for production in the deployment environment.



Project Board
Track progress on the GitHub Project Board.
Contributing

Create a feature branch: git checkout -b feature/<feature-name>.
Commit changes: git commit -m "feat: add <feature>".
Push and create a PR: git push origin feature/<feature-name>.

License
MIT License (see LICENSE file).
