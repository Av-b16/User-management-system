import React from "react";
import "../styles/index.css";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="user-avatar" />
      <div className="user-info">
        <h3>{user.first_name} {user.last_name}</h3>
        <p>{user.email}</p>
        <div className="btn-group">
          <button onClick={() => onEdit(user)} className="btn-edit" aria-label="Edit User">
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(user.id)} className="btn-delete" aria-label="Delete User">
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
