import React, { useContext } from "react";
import "./App.css";

// Transaction context
import { TransactionContext } from "./context/contractContext";

// Utility method to short the addresses
import { shortAddress } from "./hooks/shortAddress";

function App() {
  // Context data
  const {
    rookieLasting,
    amateurLasting,
    proLasting,
    legendLasting,
    buyLegendPresale,
    buyProPresale,
    buyAmateurPresale,
    buyRookiePresale,
    connectWallet,
    currentAccount,
    errorMessage,
    loadingMessage,
  } = useContext(TransactionContext);

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
        <button onClick={buyRookiePresale}>BUY ROOKIE NFT</button>
        <p>Rookies restantes {rookieLasting}</p>
        <br />
        <button onClick={buyAmateurPresale}>BUY AMATEUR NFT</button>
        <p>Amateur restantes {amateurLasting}</p>
        <br />
        <button onClick={buyProPresale}>BUY PRO NFT</button>
        <p>Pros restantes {proLasting}</p>
        <br />
        <button onClick={buyLegendPresale}>BUY LEYEND NFT</button>
        <p>Legend restantes {legendLasting}</p>

        {/* Loading label */}
        <h1>{loadingMessage ? "Loading Transaction..." : ""}</h1>
      </header>
    </div>
  );
}

export default App;
