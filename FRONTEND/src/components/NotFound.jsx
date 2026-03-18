import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">Go back to Homepage</Link>
    </div>
  );
};

export default NotFound;