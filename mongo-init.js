// MongoDB initialization script for production
db = db.getSiblingDB('scholar-dorm');

// Create collections with proper indexes
db.createCollection('users');
db.createCollection('learningprogresses');
db.createCollection('mentorshipassignments');
db.createCollection('confidencedashboards');
db.createCollection('portfolioprojects');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.learningprogresses.createIndex({ "userId": 1 });
db.mentorshipassignments.createIndex({ "menteeId": 1 });
db.mentorshipassignments.createIndex({ "mentorId": 1 });
db.confidencedashboards.createIndex({ "userId": 1 });
db.portfolioprojects.createIndex({ "userId": 1 });

print('Database initialized successfully!');
