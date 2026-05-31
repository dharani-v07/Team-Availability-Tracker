# Team Availability Tracker

A beginner-friendly React dashboard for tracking team member availability with real-time state synchronization.

## Features

- **User List Display**: Shows all team members with their current availability status
- **Toggle Switches**: Click to toggle each member's availability
- **Database Integration**: Uses localStorage as a simple database to persist data
- **State Synchronization**: UI updates immediately when database changes
- **Conditional Rendering**: Different styles and text based on availability status
- **Statistics Dashboard**: Real-time count of available/unavailable members
- **Data Persistence**: Data survives page refreshes

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **localStorage** - Simple database for beginners

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal

## Key Concepts Demonstrated

### 1. State Management
```javascript
const [users, setUsers] = useState([]);
```
Using React's `useState` hook to manage the list of users.

### 2. Database Operations
```javascript
export function updateUserAvailability(userId, isAvailable) {
  const users = getUsers();
  const updatedUsers = users.map(user => 
    user.id === userId ? { ...user, available: isAvailable } : user
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  return updatedUsers;
}
```
Simple CRUD operations using localStorage as a database.

### 3. State Synchronization
```javascript
const handleToggle = (userId, newAvailability) => {
  const updatedUsers = updateUserAvailability(userId, newAvailability);
  setUsers(updatedUsers); // Keep UI in sync with database
};
```
Updating both the database and the UI state together.

### 4. Conditional Rendering
```javascript
<p className={`text-sm ${user.available ? 'text-green-600' : 'text-red-600'}`}>
  {user.available ? '✓ Available' : '✗ Unavailable'}
</p>
```
Rendering different content and styles based on conditions.

### 5. useEffect Hook
```javascript
useEffect(() => {
  const loadedUsers = getUsers();
  setUsers(loadedUsers);
  setLoading(false);
}, []);
```
Loading data when the component first mounts.

## Project Structure

```
team-availability-tracker/
├── src/
│   ├── App.jsx          # Main React component
│   ├── db.js            # Database utility functions
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md           # This file
```

## How to Use

1. Toggle the switch next to any team member to change their availability
2. Watch the statistics update in real-time
3. Refresh the page - your changes will persist
4. Click "Reset Data" to restore the initial sample data

## Learning Outcomes

This project teaches:
- React component structure and props
- State management with hooks
- Working with localStorage as a database
- Conditional rendering based on state
- Event handling
- State synchronization patterns
- Modern CSS with Tailwind
