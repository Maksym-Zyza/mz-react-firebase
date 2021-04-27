import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App.js";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAEz2Evg5Hiks9Aj002yIBBg6saiZJwZ1s",
  authDomain: "mz-step.firebaseapp.com",
  databaseURL: "https://mz-step-default-rtdb.firebaseio.com",
  projectId: "mz-step",
  storageBucket: "mz-step.appspot.com",
  messagingSenderId: "567590342714",
  appId: "1:567590342714:web:0ec469448dcfa2e760a503",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
