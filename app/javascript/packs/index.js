import React from "react";
import { render } from "react-dom";
import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.body.appendChild(document.createElement("div"))
  );
});