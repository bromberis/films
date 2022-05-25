import React from "react";

import "./Home.css";
import Login from "./Login";
import Registration from "./Registration";

function Home() {
  return (
    <>
      <div>
        <Login />
      </div>
      <div>
        <Registration />
      </div>
    </>
  );
}

export default Home;
