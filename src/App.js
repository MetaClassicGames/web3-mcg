import React, { useContext } from "react";
import "./App.css";

// Transaction context
import { TransactionContext } from "./context/contractContext";

// Utility method to short the addresses
import { shortAddress } from "./hooks/shortAddress";

function App() {
  // Context data
  const { connectWallet, currentAccount, errorMessage, loadingMessage } =
    useContext(TransactionContext);

  return (
    <div className="App">
      <header className="App-header">
        <br />

        {/* Connect address button */}
        <button onClick={connectWallet}>Connect wallet</button>

        {/* Address label */}
        <h1>
          Your Account is:
          {currentAccount === ""
            ? " No account connected"
            : " " + shortAddress(currentAccount)}
        </h1>

        {/* Error message label */}
        <h1>{errorMessage === "" ? "" : errorMessage}</h1>

        <br />

        {/* Buy NFT buttons */}
        <button>BUY ROOKIE NFT</button>
        <br />
        <button>BUY AMATEUR NFT</button>
        <br />
        <button>BUY PRO NFT</button>
        <br />
        <button>BUY LEYEND NFT</button>

        {/* Loading label */}
        <h1>{loadingMessage ? "Loading Transaction..." : ""}</h1>
      </header>
    </div>
  );
}

export default App;
