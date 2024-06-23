import HeaderSmall from "../components/headerSmall/HeaderSmall";
import React from "react";
import ServiceDetails from "../components/cardServices/ServiceDetails";

function App({ user }) {
  return (
    <div className="app-container">
      <HeaderSmall user={user} />
      <div className="content-container">
        <ServiceDetails user={user} />
      </div>
    </div>
  );
}

export default App;
