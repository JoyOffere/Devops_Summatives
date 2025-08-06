import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../pages/Dashboard';
import * as auth from '../services/auth';
import * as api from '../services/api';

// Mock the auth service
jest.mock('../services/auth');
const mockAuth = auth as jest.Mocked<typeof auth>;

// Mock the api service
jest.mock('../services/api');
const mockApi = api as jest.Mocked<typeof api>;

// Mock DashboardCard component
jest.mock('../components/DashboardCard', () => {
  return function MockDashboardCard({ title, value, icon, trend, trendDirection, color }: any) {
    return (
      <div data-testid="dashboard-card" data-title={title}>
        <h3>{title}</h3>
        <span data-testid="card-value">{value}</span>
        <span data-testid="card-icon">{icon}</span>
        <span data-testid="card-trend">{trend}</span>
        <span data-testid="card-trend-direction">{trendDirection}</span>
        <span data-testid="card-color">{color}</span>
      </div>
    );
  };
});

describe('Dashboard Component', () => {
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    id: '1'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default authenticated state
    mockAuth.isAuthenticated.mockReturnValue(true);
    mockAuth.getCurrentUser.mockReturnValue(mockUser);
    
    // Mock API responses
    mockApi.fetchConfidenceDashboards.mockResolvedValue([]);
    mockApi.fetchLearningProgress.mockResolvedValue([]);
    mockApi.fetchPortfolioProjects.mockResolvedValue([]);
  });

  describe('Authentication States', () => {
    it('renders access denied when user is not authenticated', () => {
      mockAuth.isAuthenticated.mockReturnValue(false);
      
      render(<Dashboard />);
      
      expect(screen.getByText('Access Denied')).toBeInTheDocument();
      expect(screen.getByText('Please log in to view your dashboard')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /go to login/i })).toHaveAttribute('href', '/login');
    });

    it('shows loading state initially when authenticated', () => {
      render(<Dashboard />);
      
      expect(screen.getByText('Loading your dashboard...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Dashboard Content', () => {
    it('renders welcome message with user name and platform branding', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByText(/Welcome to Scholar-Dorm, Test User!/)).toBeInTheDocument();
      });
    });

    it('displays user initial in avatar', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByText('T')).toBeInTheDocument();
      });
    });

    it('handles users without names gracefully', async () => {
      const userWithoutName = { ...mockUser, name: undefined };
      mockAuth.getCurrentUser.mockReturnValue(userWithoutName);
      
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByText(/Welcome to Scholar-Dorm,/)).toBeInTheDocument();
      });
    });

    it('renders all dashboard cards with correct data', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        const dashboardCards = screen.getAllByTestId('dashboard-card');
        expect(dashboardCards).toHaveLength(6);
        
        // Check specific cards
        expect(screen.getByTestId('dashboard-card')).toBeInTheDocument();
        expect(screen.getByText('Confidence Score')).toBeInTheDocument();
        expect(screen.getByText('Courses Completed')).toBeInTheDocument();
        expect(screen.getByText('Projects Submitted')).toBeInTheDocument();
        expect(screen.getByText('Learning Streak')).toBeInTheDocument();
        expect(screen.getByText('Mentorship Hours')).toBeInTheDocument();
        expect(screen.getByText('Skills Gained')).toBeInTheDocument();
      });
    });

    it('displays quick action buttons with correct links', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /start learning/i })).toHaveAttribute('href', '/courses');
        expect(screen.getByRole('link', { name: /find mentor/i })).toHaveAttribute('href', '/mentorship');
        expect(screen.getByRole('link', { name: /submit project/i })).toHaveAttribute('href', '/projects');
        expect(screen.getByRole('link', { name: /take assessment/i })).toHaveAttribute('href', '/assessment');
      });
    });

    it('renders recent activities section', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByText('Recent Activity')).toBeInTheDocument();
        expect(screen.getByText('Completed React Fundamentals')).toBeInTheDocument();
        expect(screen.getByText('Started JavaScript Advanced')).toBeInTheDocument();
        expect(screen.getByText('Mentorship session with Sarah')).toBeInTheDocument();
        expect(screen.getByText('Confidence score improved by 5%')).toBeInTheDocument();
      });
    });

    it('renders learning goals section with progress bars', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Goals')).toBeInTheDocument();
        expect(screen.getByText('Complete JavaScript Course')).toBeInTheDocument();
        expect(screen.getByText('75% complete')).toBeInTheDocument();
        expect(screen.getByText('Build 3 Portfolio Projects')).toBeInTheDocument();
        expect(screen.getByText('2 of 3 completed')).toBeInTheDocument();
        expect(screen.getByText('Find a Mentor')).toBeInTheDocument();
        expect(screen.getByText('✅ Completed!')).toBeInTheDocument();
      });
    });
  });

  describe('API Integration', () => {
    it('calls API endpoints on component mount', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(mockApi.fetchConfidenceDashboards).toHaveBeenCalledTimes(1);
        expect(mockApi.fetchLearningProgress).toHaveBeenCalledTimes(1);
        expect(mockApi.fetchPortfolioProjects).toHaveBeenCalledTimes(1);
      });
    });

    it('handles API errors gracefully', async () => {
      mockApi.fetchConfidenceDashboards.mockRejectedValue(new Error('API Error'));
      mockApi.fetchLearningProgress.mockRejectedValue(new Error('API Error'));
      mockApi.fetchPortfolioProjects.mockRejectedValue(new Error('API Error'));
      
      // Mock console.error to prevent error output in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByText(/Welcome to Scholar-Dorm/)).toBeInTheDocument();
      });
      
      expect(consoleSpy).toHaveBeenCalledWith('Error loading dashboard data:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    it('updates dashboard data based on API responses', async () => {
      const mockConfidenceData = [{ score: 90 }];
      const mockLearningData = [{ course: 'React' }, { course: 'Node.js' }];
      const mockProjectsData = [{ project: 'Portfolio' }];
      
      mockApi.fetchConfidenceDashboards.mockResolvedValue(mockConfidenceData);
      mockApi.fetchLearningProgress.mockResolvedValue(mockLearningData);
      mockApi.fetchPortfolioProjects.mockResolvedValue(mockProjectsData);
      
      render(<Dashboard />);
      
      await waitFor(() => {
        // Should show data-driven values
        expect(screen.getByText('85%')).toBeInTheDocument(); // Confidence score when data exists
        expect(screen.getByText('2')).toBeInTheDocument(); // Courses completed
        expect(screen.getByText('1')).toBeInTheDocument(); // Projects submitted
      });
    });

    it('shows default values when API returns empty data', async () => {
      mockApi.fetchConfidenceDashboards.mockResolvedValue([]);
      mockApi.fetchLearningProgress.mockResolvedValue([]);
      mockApi.fetchPortfolioProjects.mockResolvedValue([]);
      
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByText('75%')).toBeInTheDocument(); // Default confidence score
        expect(screen.getByText('3')).toBeInTheDocument(); // Default courses
        expect(screen.getByText('2')).toBeInTheDocument(); // Default projects
      });
    });
  });

  describe('Responsive Design and CSS Classes', () => {
    it('applies correct CSS classes for responsive layout', async () => {
      const { container } = render(<Dashboard />);
      
      await waitFor(() => {
        const mainContainer = container.querySelector('.container');
        expect(mainContainer).toHaveClass('mx-auto', 'px-4', 'py-8');
      });
    });

    it('applies gradient background classes', async () => {
      const { container } = render(<Dashboard />);
      
      await waitFor(() => {
        const backgroundDiv = container.querySelector('.bg-gradient-to-br');
        expect(backgroundDiv).toHaveClass('from-purple-50', 'via-white', 'to-pink-50');
      });
    });
  });

  describe('User Interactions', () => {
    it('quick action buttons have hover effects', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        const startLearningButton = screen.getByRole('link', { name: /start learning/i });
        expect(startLearningButton).toHaveClass('hover:scale-105', 'transform', 'transition-all');
      });
    });

    it('activity items have hover effects', async () => {
      render(<Dashboard />);
      
      await waitFor(() => {
        const activityItems = document.querySelectorAll('.hover\\:bg-gray-100');
        expect(activityItems.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Loading States', () => {
    it('shows loading spinner with proper accessibility', () => {
      render(<Dashboard />);
      
      const loadingSpinner = screen.getByRole('status');
      expect(loadingSpinner).toBeInTheDocument();
      expect(screen.getByText('Loading your dashboard...')).toBeInTheDocument();
    });

    it('removes loading state after data loads', async () => {
      render(<Dashboard />);
      
      // Initially loading
      expect(screen.getByText('Loading your dashboard...')).toBeInTheDocument();
      
      // After data loads
      await waitFor(() => {
        expect(screen.queryByText('Loading your dashboard...')).not.toBeInTheDocument();
        expect(screen.getByText(/Welcome to Scholar-Dorm/)).toBeInTheDocument();
      });
    });
  });

  describe('Error Boundaries and Edge Cases', () => {
    it('handles null user gracefully', async () => {
      mockAuth.getCurrentUser.mockReturnValue(null);
      
      render(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByText(/Welcome to Scholar-Dorm,/)).toBeInTheDocument();
      });
    });

    it('handles user with empty name', async () => {
      const userWithEmptyName = { ...mockUser, name: '' };
      mockAuth.getCurrentUser.mockReturnValue(userWithEmptyName);
      
      render(<Dashboard />);
      
      await waitFor(() => {
        // Should handle empty name gracefully
        expect(screen.getByText(/Welcome to Scholar-Dorm,/)).toBeInTheDocument();
      });
    });
  });
});
