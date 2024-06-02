import React from 'react';
import '../styles/AdminButton.css'; 

const AdminButton = () => {
  return (
    <div className="admin-button">
        <span>ADMIN</span>
      <span className="dropdown-icon">▼</span>
      <div className="profile-image">
        <div className="status-indicator"></div>
      </div>
    </div>
  );
}

export default AdminButton;
