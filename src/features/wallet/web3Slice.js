import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

let initialState = {
  provider: "Not Connected",
  status: "Please connect using Metamask or WalletConnect",
  statusMin: "Not Connected",
};
if (localStorage.getItem("store")) {
  initialState = JSON.parse(localStorage.getItem("store")).web3
}
export const connectAsync = createAsyncThunk(
  "wallet/connectMetamask",
  async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      console.log(window.ethereum);
      return await web3.eth
        .requestAccounts()
        .then((data) => {
          console.log(data);
          if (typeof data === "object") {
            return "metamask connected";
          } else {
            return "error connecting metamask";
          }
        })
        .catch((error) => {
          console.log(error);
          return "error connecting metamask";
        });
    } else {
      return "metmask not installed";
    }
  }
);

export const connectWalletConnect = createAsyncThunk(
  "wallet/connectWalletConnect",
  async () => {
    const provider = new WalletConnectProvider({
      infuraId: "b9d586efbb3546afbf364a7d840f40c2",
    });
    return await provider.enable().then((response) => {
      if (provider.connected) {
        return "WalletConnect Connected";
      } else {
        return "WalletConnect Disconnected";
      }
    });
  }
);

export const web3Slice = createSlice({
  name: "web3",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    disconnect: (state, action) => {
      state.provider = "Not Connected";
      state.status = "Please connect using Metamask or WalletConnect";
      state.statusMin = "Not Connected";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectAsync.pending, (state) => {
        state.status = "Trying to connect";
        state.statusMin = "Not Connected";
      })
      .addCase(connectAsync.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload === "metamask connected") {
          state.provider = "Metamask";
          state.status = "Metamask connected";
          state.statusMin = "Metamask";
        } else if (action.payload === "metmask not installed") {
          state.status = "Metamask not found. Please install metamask";
          state.statusMin = "Not Connected";
        } else if (action.payload === "error connecting metamask") {
          state.status = "Error connecting to metamask";
          state.statusMin = "Not Connected";
        }
      })
      .addCase(connectWalletConnect.pending, (state) => {
        state.status = "Trying to connect";
        state.statusMin = "Not Connected";
      })
      .addCase(connectWalletConnect.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload === "WalletConnect Connected") {
          state.provider = "WalletConnect";
          state.status = "Wallet Connect connected";
          state.statusMin = "WalletConnect";
        } else if (action.payload === "WalletConnect Disconnected") {
          state.status = "Wallet Connect Disconnected";
          state.statusMin = "Not Connected";
        } else if (action.payload === "error connecting metamask") {
          state.status = "Error connecting to metamask";
          state.statusMin = "Not Connected";
        }
      });
  },
});

export const { disconnect } = web3Slice.actions;
export const selectWeb3 = (state) => state.web3.web3;
export const selectWeb3Status = (state) => state.web3.status;
export const selectWeb3MinStatus = (state) => state.web3.statusMin;
export default web3Slice.reducer;
