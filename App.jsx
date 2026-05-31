import React, { useState, useEffect } from 'react';
import { getUsers, updateUserAvailability, resetDatabase } from './db';

function App() {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  // State to track when data is loading
  const [loading, setLoading] = useState(true);

  // Load users from database when component mounts
  useEffect(() => {
    const loadedUsers = getUsers();
    setUsers(loadedUsers);
    setLoading(false);
  }, []);

  /**
   * Handle toggle change for a user
   * This demonstrates state synchronization between UI and database
   */
  const handleToggle = (userId, newAvailability) => {
    // Update the database
    const updatedUsers = updateUserAvailability(userId, newAvailability);
    
    // Update the local state to reflect the change
    // This ensures the UI stays in sync with the database
    setUsers(updatedUsers);
  };

  /**
   * Reset the database to initial state
   */
  const handleReset = () => {
    const resetUsers = resetDatabase();
    setUsers(resetUsers);
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            👥 Team Availability Tracker
          </h1>
          <p className="text-gray-600">
            Toggle team member availability to update the database
          </p>
        </div>

        {/* Stats Section - Shows conditional rendering based on data */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{users.length}</p>
              <p className="text-gray-600">Total Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">
                {users.filter(u => u.available).length}
              </p>
              <p className="text-gray-600">Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-600">
                {users.filter(u => !u.available).length}
              </p>
              <p className="text-gray-600">Unavailable</p>
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm"
            >
              Reset Data
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-2">💡 How it works:</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Each toggle updates a boolean value in localStorage (our database)</li>
            <li>• The UI immediately reflects the change (state synchronization)</li>
            <li>• Data persists even after refreshing the page</li>
            <li>• Conditional rendering shows different styles based on availability</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * UserCard Component
 * Displays individual user with toggle switch
 * Demonstrates conditional rendering based on availability status
 */
function UserCard({ user, onToggle }) {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
      {/* User Info */}
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{user.avatar}</div>
        <div>
          <h3 className="font-semibold text-gray-800">{user.name}</h3>
          {/* Conditional rendering: Show different status based on availability */}
          <p className={`text-sm ${user.available ? 'text-green-600' : 'text-red-600'}`}>
            {user.available ? '✓ Available' : '✗ Unavailable'}
          </p>
        </div>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={() => onToggle(user.id, !user.available)}
        className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
          user.available ? 'bg-green-500' : 'bg-gray-300'
        }`}
        aria-label={`Toggle ${user.name}'s availability`}
      >
        {/* Toggle knob - moves based on availability state */}
        <span
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            user.available ? 'left-9' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

export default App;
