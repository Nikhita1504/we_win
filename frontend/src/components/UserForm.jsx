
import React, { useState, useEffect } from "react";
import styles from "./UserManagement.module.css";

const DESIGNATIONS = ["Developer", "Designer", "Manager", "Director"];
const FAVORITE_OPTIONS = ["Reading", "Gaming", "Sports", "Music"];

const UserForm = ({ onSubmit, editingUser }) => {
  const [formData, setFormData] = useState({
    id: editingUser?.id || null,
    name: "",
    gender: "",
    designation: "",
    favorites: [],
  });

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const validate = () => {
    if (!formData.name) {
      alert("Name is required");
      return false;
    }
    if (!formData.gender) {
      alert("Gender is required");
      return false;
    }
    if (!formData.designation) {
      alert("Designation is required");
      return false;
    }
    if (formData.favorites.length === 0) {
      alert("At least one favorite must be selected");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const handleFavoriteToggle = (option) => {
    setFormData((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(option)
        ? prev.favorites.filter((fav) => fav !== option)
        : [...prev.favorites, option],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                checked={formData.gender === "Male"}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, gender: "Male" }))
                }
                className={styles.radio}
              />
              <span>Male</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                checked={formData.gender === "Female"}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, gender: "Female" }))
                }
                className={styles.radio}
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Designation</label>
          <select
            value={formData.designation}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, designation: e.target.value }))
            }
            className={styles.select}
          >
            <option value="">Select Designation</option>
            {DESIGNATIONS.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Favorites</label>
          <div className={styles.checkboxGroup}>
            {FAVORITE_OPTIONS.map((option) => (
              <label key={option} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.favorites.includes(option)}
                  onChange={() => handleFavoriteToggle(option)}
                  className={styles.checkbox}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {editingUser ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
