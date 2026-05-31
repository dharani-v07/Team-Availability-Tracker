// Simple database utility using localStorage
// This acts as our "database" for the application

const STORAGE_KEY = 'team_availability_data';

// Initial sample data
const INITIAL_USERS = [
  { id: 1, name: 'Subi', available: true, avatar: '👩‍💻' },
  { id: 2, name: 'Dharani', available: false, avatar: '👨‍💼' },
  { id: 3, name: 'Carol Williams', available: true, avatar: '👩‍🎨' },
  { id: 4, name: 'David Brown', available: false, avatar: '👨‍🔧' },
  { id: 5, name: 'Eva Martinez', available: true, avatar: '👩‍🚀' },
];

/**
 * Get all users from the database
 * @returns {Array} Array of user objects
 */
export function getUsers() {
  const data = localStorage.getItem(STORAGE_KEY);
  
  // If no data exists, initialize with sample data
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  
  return JSON.parse(data);
}

/**
 * Update a user's availability status
 * @param {number} userId - The ID of the user to update
 * @param {boolean} isAvailable - The new availability status
 * @returns {Array} Updated array of users
 */
export function updateUserAvailability(userId, isAvailable) {
  const users = getUsers();
  
  // Find and update the user
  const updatedUsers = users.map(user => 
    user.id === userId 
      ? { ...user, available: isAvailable }
      : user
  );
  
  // Save to "database"
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  
  return updatedUsers;
}

/**
 * Reset the database to initial data (useful for testing)
 */
export function resetDatabase() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
  return INITIAL_USERS;
}
