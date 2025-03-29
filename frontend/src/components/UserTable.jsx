import React from "react";
import styles from "./UserManagement.module.css";

const UserTable = ({ users, onDelete, onEdit }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>ID</th>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Gender</th>
            <th className={styles.tableHeader}>Designation</th>
            <th className={styles.tableHeader}>Favorites</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{user.id}</td>
              <td className={styles.tableCell}>{user.name}</td>
              <td className={styles.tableCell}>{user.gender}</td>
              <td className={styles.tableCell}>{user.designation}</td>
              <td className={styles.tableCell}>{user.favorites.join(", ")}</td>
              <td className={styles.tableCell}>
                <div className={styles.actionButtons}>
                  <button
                    onClick={() => onEdit(user)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
