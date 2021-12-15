import React from "react";
import settings from "../settings";

function Home() {
  return (
    <div>
      <div className="bg"></div>
      <div className="content">
        <h1 className="font">{settings.name}</h1>
      </div>
    </div>
  );
}

export default Home;
