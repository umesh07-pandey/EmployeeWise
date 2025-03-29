import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import UserList from "./pages/userlist.jsx";

import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
