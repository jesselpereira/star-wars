import React from "react";
import '../App.css';

function Loader() {
  return(
    <div className="Loader">
      <header className="Loader-header">
        <div id="app" className="Loader" />
      </header>
    </div>
  );
}

export default Loader