import { configureStore } from "@reduxjs/toolkit";
import web3Reducer from "../features/wallet/web3Slice";

function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
  persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));
