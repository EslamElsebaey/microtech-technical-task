import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@fortawesome/fontawesome-free/js/all.min.js"
import "jquery/dist/jquery.min.js"
import "axios/dist/axios.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>)