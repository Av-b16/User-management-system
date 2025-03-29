// /src/components/EditUser.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/editUser.css";

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user; // User data passed from UserList

  // If user data not passed, fetch it from the API
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // Pre-fill the form if user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      fetchUserData();
    }
  }, [user]);

  // Fetch user data if not available
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      const fetchedUser = response.data.data;
      setFormData({
        first_name: fetchedUser.first_name,
        last_name: fetchedUser.last_name,
        email: fetchedUser.email,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Error loading user data.");
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${id}`,
        formData
      );
      if (response.status === 200) {
        alert("User updated successfully! ✅");
        navigate("/"); // Redirect to User List
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Try again later.");
    }
  };

  return (
    <div className="edit-page-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit" className="btn-update">
          Update
        </button>
      </form>
      <button className="btn-back" onClick={() => navigate("/")}>
        Back to User List
      </button>
    </div>
  );
};

export default EditUser;
