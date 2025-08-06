const mongoose = require('mongoose');

// Mock MongoDB connection for testing
let originalConnect;

beforeAll(async () => {
  // Mock mongoose.connect to avoid real database connections during testing
  originalConnect = mongoose.connect;
  mongoose.connect = jest.fn().mockResolvedValue({
    connection: { 
      host: 'localhost-mock',
      readyState: 1 // Connected state
    }
  });
  
  // Mock the connection object
  mongoose.connection = {
    readyState: 1,
    collections: {},
    close: jest.fn().mockResolvedValue(true)
  };
  
  console.log('Mock MongoDB connection setup for testing');
}, 30000);

// Cleanup after all tests
afterAll(async () => {
  try {
    // Restore original connect function
    if (originalConnect) {
      mongoose.connect = originalConnect;
    }
  } catch (error) {
    console.warn('Error during test cleanup:', error.message);
  }
}, 30000);

// Clean up between tests
afterEach(async () => {
  // Clear any jest mocks between tests
  jest.clearAllMocks();
});
