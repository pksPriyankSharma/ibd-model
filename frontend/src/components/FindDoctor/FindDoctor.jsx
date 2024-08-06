import React from "react";
import "./FindDoctor.css";

const FindDoctor = () => {
  return (
    <div className="finddoctor">
      <h1 style={{ padding: "4px", margin: "4px" }}>Find A Doctor</h1>
      <div className="search">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="speciality" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default FindDoctor;
