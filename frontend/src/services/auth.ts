import { loginUser, registerUser } from './api.ts';

interface User {
  _id: string;
  name: string;
  email: string;
  learningGoals?: string[];
  confidenceScore?: number;
}

interface AuthResponse {
  message: string;
  user: User;
  token?: string;
}

// Auth state management
class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  constructor() {
    // Check for existing token in localStorage
    this.token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('current_user');
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.logout();
      }
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await loginUser({ email, password });
      
      // Store user data and token
      this.currentUser = response.user;
      if (response.token) {
        this.token = response.token;
        localStorage.setItem('auth_token', response.token);
      }
      localStorage.setItem('current_user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await registerUser({ name, email, password });
      
      // Store user data and token
      this.currentUser = response.user;
      if (response.token) {
        this.token = response.token;
        localStorage.setItem('auth_token', response.token);
      }
      localStorage.setItem('current_user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.token !== null;
  }

  updateCurrentUser(userData: Partial<User>): void {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...userData };
      localStorage.setItem('current_user', JSON.stringify(this.currentUser));
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;

// Export utility functions for easier use
export const login = (email: string, password: string) => authService.login(email, password);
export const register = (name: string, email: string, password: string) => authService.register(name, email, password);
export const logout = () => authService.logout();
export const getCurrentUser = () => authService.getCurrentUser();
export const getToken = () => authService.getToken();
export const isAuthenticated = () => authService.isAuthenticated();
export const updateCurrentUser = (userData: Partial<User>) => authService.updateCurrentUser(userData);