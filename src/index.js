import "./polyfill";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from './app/store';
import Prologue from "./Prologue";
import reportWebVitals from "./reportWebVitals";

function SwarajCoin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="prologue" element={<Prologue />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SwarajCoin />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
