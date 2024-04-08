import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Authprovider } from "./components/cotext/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <Authprovider>
      <BrowserRouter>
    <App />
  </BrowserRouter>
  </Authprovider>

);
