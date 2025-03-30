import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../page_css/UserList.css"; // Import the external CSS file

const BASE_URL = "https://reqres.in/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id)); // Simulating delete
  };

  return (
    <div className="userlist-container">
      <div className="userlist-card">
        <div className="userlist-header">
          <h2>User List</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        {users.length === 0 ? (
          <p className="no-users">No users found.</p>
        ) : (
          <div className="userlist">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="user-avatar"
                  />
                  <p className="user-name">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
                <div className="user-actions">
                  <button
                    onClick={() => navigate(`/edit-user/${user.id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="page-btn"
          >
            Prev
          </button>
          <p>
            Page {page} of {totalPages}
          </p>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            className="page-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserList;
