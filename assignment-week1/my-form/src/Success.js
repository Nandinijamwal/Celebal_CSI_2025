import React from "react";
import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  const form = location.state || {};
  return (
    <div className="success">
      <h2>Form Submitted Successfully!</h2>
      <ul>
        {Object.entries(form).map(([key, value]) => (
          <li key={key}><strong>{key}</strong>: {value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Success;