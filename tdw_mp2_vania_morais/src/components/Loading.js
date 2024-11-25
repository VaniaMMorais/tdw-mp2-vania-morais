import React from "react";
import "./style.css"; 

function Loading() {
    return (
      <div className="comic-loading-container">
        <div className="comic-spinner">
          {/* <span>💥</span> */}
        </div>
        <p className="comic-loading-text">Loading, Hero!</p>
      </div>
    );
  }

export default Loading;