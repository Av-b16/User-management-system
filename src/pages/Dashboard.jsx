// /src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import '../styles/index.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch users when component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users');
        const data = await response.json();
        setUsers(data.data || []); // Handle case where no users returned
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <h1 className="dashboard-title">User Management</h1>
      
      {/* Pass users and setUsers to UserList */}
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
};

export default Dashboard;
