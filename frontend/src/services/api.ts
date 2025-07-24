export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Development mode flag - set to true when backend is not available
const USE_MOCK_API = process.env.NODE_ENV === 'development' && !process.env.REACT_APP_USE_REAL_API;

// Mock data for development
const mockUsers = [
  { _id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { _id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123' }
];

// Helper function for API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // Use mock API in development mode
  if (USE_MOCK_API) {
    return mockApiRequest(endpoint, options);
  }

  const url = `${API_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Mock API function for development
async function mockApiRequest(endpoint: string, options: RequestInit = {}) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body as string) : null;
  
  // Handle different endpoints
  if (endpoint === '/users/login' && method === 'POST') {
    const { email, password } = body;
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + user._id,
        message: 'Login successful'
      };
    } else {
      throw new Error('Invalid email or password');
    }
  }
  
  if (endpoint === '/users/register' && method === 'POST') {
    const { name, email, password } = body;
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      _id: (mockUsers.length + 1).toString(),
      name,
      email,
      password
    };
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + newUser._id,
      message: 'Registration successful'
    };
  }
  
  // Default response for other endpoints
  return { message: 'Mock API response', data: [] };
}

// User API functions
export async function fetchUsers() {
  return apiRequest('/users');
}

export async function fetchUser(id: string) {
  return apiRequest(`/users/${id}`);
}

export async function registerUser(userData: { name: string; email: string; password: string }) {
  return apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function loginUser(credentials: { email: string; password: string }) {
  return apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function updateUser(id: string, userData: { name?: string; learningGoals?: string[]; confidenceScore?: number }) {
  return apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

export async function deleteUser(id: string) {
  return apiRequest(`/users/${id}`, {
    method: 'DELETE',
  });
}

// Learning Progress API functions
export async function fetchLearningProgress() {
  return apiRequest('/learning-progress');
}

export async function fetchLearningProgressById(id: string) {
  return apiRequest(`/learning-progress/${id}`);
}

export async function createLearningProgress(progressData: {
  userId: string;
  courseId: string;
  lessonsCompleted: number;
  quizScores: number[];
  offlineResourcesDownloaded: boolean;
}) {
  return apiRequest('/learning-progress', {
    method: 'POST',
    body: JSON.stringify(progressData),
  });
}

export async function updateLearningProgress(id: string, progressData: {
  lessonsCompleted?: number;
  quizScores?: number[];
  offlineResourcesDownloaded?: boolean;
}) {
  return apiRequest(`/learning-progress/${id}`, {
    method: 'PUT',
    body: JSON.stringify(progressData),
  });
}

export async function deleteLearningProgress(id: string) {
  return apiRequest(`/learning-progress/${id}`, {
    method: 'DELETE',
  });
}

// Portfolio Projects API functions
export async function fetchPortfolioProjects() {
  return apiRequest('/portfolio-projects');
}

export async function fetchPortfolioProject(id: string) {
  return apiRequest(`/portfolio-projects/${id}`);
}

export async function createPortfolioProject(projectData: {
  userId: string;
  projectTitle: string;
  description: string;
  challengeId?: string;
}) {
  return apiRequest('/portfolio-projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
}

export async function updatePortfolioProject(id: string, projectData: {
  status?: string;
  feedback?: string;
}) {
  return apiRequest(`/portfolio-projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
}

export async function deletePortfolioProject(id: string) {
  return apiRequest(`/portfolio-projects/${id}`, {
    method: 'DELETE',
  });
}

// Mentorship Assignments API functions
export async function fetchMentorshipAssignments() {
  return apiRequest('/mentorship-assignments');
}

export async function fetchMentorshipAssignment(id: string) {
  return apiRequest(`/mentorship-assignments/${id}`);
}

export async function createMentorshipAssignment(assignmentData: {
  menteeId: string;
  mentorId: string;
  checkInSchedule: string;
}) {
  return apiRequest('/mentorship-assignments', {
    method: 'POST',
    body: JSON.stringify(assignmentData),
  });
}

export async function updateMentorshipAssignment(id: string, assignmentData: {
  status?: string;
  checkInSchedule?: string;
  lastCheckIn?: Date;
  feedback?: string;
}) {
  return apiRequest(`/mentorship-assignments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(assignmentData),
  });
}

export async function deleteMentorshipAssignment(id: string) {
  return apiRequest(`/mentorship-assignments/${id}`, {
    method: 'DELETE',
  });
}

// Confidence Dashboards API functions
export async function fetchConfidenceDashboards() {
  return apiRequest('/confidence-dashboards');
}

export async function fetchConfidenceDashboard(id: string) {
  return apiRequest(`/confidence-dashboards/${id}`);
}

export async function createConfidenceDashboard(dashboardData: {
  userId: string;
  skillArea: string;
  currentConfidence: number;
  targetConfidence: number;
  lastAssessment?: Date;
}) {
  return apiRequest('/confidence-dashboards', {
    method: 'POST',
    body: JSON.stringify(dashboardData),
  });
}

export async function updateConfidenceDashboard(id: string, dashboardData: {
  skillArea?: string;
  currentConfidence?: number;
  targetConfidence?: number;
  lastAssessment?: Date;
}) {
  return apiRequest(`/confidence-dashboards/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dashboardData),
  });
}

export async function deleteConfidenceDashboard(id: string) {
  return apiRequest(`/confidence-dashboards/${id}`, {
    method: 'DELETE',
  });
}