
import React, { useState, useEffect } from "react";
import styles from "./UserManagement.module.css";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import SearchBar from "./SearchBar";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const storedId = parseInt(localStorage.getItem("currentId") || "1");
    setUsers(storedUsers);
    setCurrentId(storedId);
  }, []);

  const saveToLocalStorage = (updatedUsers, newId) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentId", newId.toString());
  };

  const handleAddUser = (userData) => {
    const newUser = { ...userData, id: currentId };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentId(currentId + 1);
    setShowForm(false);
    saveToLocalStorage(updatedUsers, currentId + 1);
  };

  const handleUpdateUser = (userData) => {
    const updatedUsers = users.map((user) =>
      user.id === userData.id ? userData : user,
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    setShowForm(false);
    saveToLocalStorage(updatedUsers, currentId);
  };

  const handleDeleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers, currentId);
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
    </main>
  );
};

export default UserManagement;
