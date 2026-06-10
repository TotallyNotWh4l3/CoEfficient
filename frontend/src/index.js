import React from "react";
import ReactDOM from "react-dom/client";

import "../src/styles/index.css";
import "../src/styles/global.css";
import "../src/styles/variable.css";

import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,