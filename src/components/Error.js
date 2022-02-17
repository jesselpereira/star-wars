import React from "react";
import '../App.css';

function Error({ error }) {
  return(
    <div className="Error">
      <header className="Error-header">
        <h2>Erro: {error}</h2>
      </header>
    </div>
  );
}

export default Error