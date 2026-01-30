import React from "react";
import "./Toggle.css";

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="slider" />
    </label>
  );
}

export default Toggle;
