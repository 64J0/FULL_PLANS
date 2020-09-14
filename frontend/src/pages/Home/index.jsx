import React from "react";

import "./styles.css";
import logoImage from "../../assets/fullE_icon.png";

function Home() {
  return (
    <div className="home">
      <div id="img-logo">
        <img src={logoImage} alt="Logo da Full Engenharia" />
      </div>
      <hr />
      <h3>Nós não vendemos papel, vendemos solução</h3>
    </div>
  );
}

export default Home;