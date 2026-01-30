import React from "react";
import './PlaceholderContainer.css';

export default function PlaceholderContainer({extraClasses = ''}) {
  return (
    <div className={`placeholder-container ${extraClasses}`}></div>
  )
}
