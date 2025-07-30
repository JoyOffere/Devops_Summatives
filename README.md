# Scholar-Dorm

Scholar-Dorm is a web-based learning management system designed to empower Nigerian girls and young women (ages 13–35) with tech skills, mentorship, and project-based learning.
<img width="1364" height="621" alt="image" src="https://github.com/user-attachments/assets/e3a0345d-3ef3-4e25-bb01-335cc0be0155" />


<img width="1336" height="634" alt="image" src="https://github.com/user-attachments/assets/bd8c7365-d724-4afb-a666-3f5af8b65890" />

## Youtube URL : 

## Features
- User registration and personalized learning goals
- Modular tech courses with quizzes and offline resources
- Mentorship matching and virtual check-ins
- Confidence tracking dashboard
- Project-based challenges and digital portfolio
- Real-time progress tracking
- Community forums and peer collaboration
- Certificate generation upon course completion

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Firebase (Authentication)
- **Frontend**: React.js, TailwindCSS
- **DevOps Tools**: Docker, GitHub Actions, AWS/Heroku, Nginx
- **Database**: MongoDB Atlas
- **Authentication**: Firebase Auth
- **Testing**: Jest, Cypress
- **Code Quality**: ESLint, Prettier

## Prerequisites
Before setting up the project, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose
- Git
- MongoDB (local) or MongoDB Atlas account
- Firebase account

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/JoyOffere/Devops_Summatives.git
cd Devops_Summatives
```

### 2. Environment Configuration
Create environment files for both frontend and backend:

**Backend (.env)**
```bash
cp backend/.env.example backend/.env
```
Update the backend/.env file with your configurations:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scholar-dorm
JWT_SECRET=your_jwt_secret_here
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

**Frontend (.env)**
```bash
cp frontend/.env.example frontend/.env
```
Update the frontend/.env file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 3. Install Dependencies

**Backend Dependencies**
```bash
cd backend
npm install
```

**Frontend Dependencies**
```bash
cd frontend
npm install
```

### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Start MongoDB service (macOS/Linux)
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
- Create a MongoDB Atlas account
- Create a new cluster
- Update MONGODB_URI in your .env file with the connection string

### 5. Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication with Email/Password
3. Download the service account key
4. Update Firebase configuration in your .env files

### 6. Running the Application

**Development Mode**
```bash
# Start backend server
cd backend
npm run dev

# Start frontend (in a new terminal)
cd frontend
npm start
```

**Using Docker**
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api-docs

## Development Workflow

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests with coverage
npm run test:coverage
```

### Code Formatting
```bash
# Format backend code
cd backend
npm run format

# Format frontend code
cd frontend
npm run format
```

### Linting
```bash
# Lint backend code
cd backend
npm run lint

# Lint frontend code
cd frontend
npm run lint
```

## Docker Commands

### Build Images
```bash
# Build backend image
docker build -t scholar-dorm-backend ./backend

# Build frontend image
docker build -t scholar-dorm-frontend ./frontend
```

### Run Containers
```bash
# Run with Docker Compose
docker-compose up

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

## Deployment

### Production Build
```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production mode
cd backend
npm start
```

### Environment Variables for Production
Ensure the following environment variables are set in your production environment:
- `NODE_ENV=production`
- `MONGODB_URI=your_production_mongodb_uri`
- `JWT_SECRET=strong_production_secret`
- Firebase production credentials

## CI/CD Pipeline
This project uses GitHub Actions for continuous integration and deployment:
- Automated testing on pull requests
- Code quality checks
- Docker image building
- Deployment to staging/production environments

## Project Structure
```
Devops_Summatives/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── public/
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
└── .github/
    └── workflows/
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues
- **Port already in use**: Change the PORT in your .env file
- **MongoDB connection error**: Ensure MongoDB is running and connection string is correct
- **Firebase authentication error**: Verify Firebase configuration and API keys
- **Docker issues**: Ensure Docker daemon is running

### Logs
```bash
# View application logs
docker-compose logs app

# View database logs
docker-compose logs db

# View all logs
docker-compose logs
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap
- [ ] Mobile application development
- [ ] Advanced analytics dashboard
- [ ] Integration with more learning platforms
- [ ] Multi-language support
- [ ] Offline learning capabilities
