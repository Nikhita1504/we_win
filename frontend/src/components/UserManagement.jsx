import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserManagement.module.css";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import SearchBar from "./SearchBar";
import { ToastContainer, toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // API base URL - adjust according to your backend
  const API_URL = "http://localhost:3000/api/users";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (query = "") => {
    try {
      let url = API_URL;
      if (query) {
        url = `${API_URL}/search/${query}`;
      }
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users");
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      setUsers([...users, response.data]);
      setShowForm(false);
      toast.success("user added sucessfully")
      return true;
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
      return false;
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      // Ensure we have a valid _id
      if (!userData._id) {
        throw new Error("User ID is missing");
      }
  
      const response = await axios.put(
        `${API_URL}/${userData._id}`,
        userData
      );
      
      setUsers(users.map(user => 
        user._id === response.data._id ? response.data : user
      ));
      setEditingUser(null);
      setShowForm(false);
      toast.success("user updated sucessfully")
      return true;
    } catch (error) {
      console.error("Update error:", {
        error: error.response?.data || error.message,
        userData // Log the data being sent
      });
      alert(error.response?.data?.error || "Failed to update user");
      return false;
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user._id !== id));
      toast.error("user deleted sucessfully")
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
      return false;
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.designation.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.gradientBlue} />
        <div className={styles.gradientGreen} />

        <section className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>User Management System</h1>
            <button
              className={styles.actionButton}
              onClick={() => {
                setShowForm(!showForm);
                setEditingUser(null);
              }}
            >
              {showForm ? "Close Form" : "Add New User"}
            </button>
          </header>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {showForm && (
            <UserForm
              onSubmit={editingUser ? handleUpdateUser : handleAddUser}
              editingUser={editingUser}
            />
          )}

          <UserTable
            users={filteredUsers}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
          />
        </section>
      </div>
      <ToastContainer />
    </main>
  );
};

export default UserManagement;