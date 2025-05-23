import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <FaExclamationTriangle className="display-1 text-warning" />
      <h1>404 Not Found</h1>
      <p className="lead">
        Page does not exist. Go back to the <Link to="/">Home</Link> page.
      </p>
    </div>
  );
};

export default NotFound;
