import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import '../styles/index.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Delete user by ID and refresh list
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      if (response.status === 204) {
        // Update user list after deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert('User deleted successfully!');
      } else {
        alert('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again later.');
    }
  };

  // Update user after editing and stay on the same page
  const handleUpdate = async (updatedUser) => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${updatedUser.id}`, updatedUser);

      if (response.status === 200) {
        // Update user in the list without redirect
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? { ...user, ...updatedUser } : user
          )
        );
        alert('User updated successfully!');
        setEditingUser(null); // Close edit form
      } else {
        alert('Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <div className="user-cards-container">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDelete}
            onEdit={() => setEditingUser(user)}
          />
        ))}
      </div>
      {editingUser && (
        <div className="edit-popup">
          <h3>Edit User</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingUser);
            }}
          >
            <input
              type="text"
              value={editingUser.first_name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, first_name: e.target.value })
              }
            />
            <input
              type="text"
              value={editingUser.last_name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, last_name: e.target.value })
              }
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingUser(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;
