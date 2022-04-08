import React, { useContext } from "react";
import "./App.css";

// Transaction context
import { TransactionContext } from "./context/contractContext";

// Utility method to short the addresses
import { shortAddress } from "./hooks/shortAddress";

function App() {
  // Context data
  const {
    rookieBalance,
    amateurBalance,
    proBalance,
    legendBalance,
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

        {/* My NFTs section */}
        <h1>Mis NFTs</h1>

        <div>
          {/* Rookie */}
          <div style={{ display: "inline", float: "left" }}>
            <img
              src="http://vegabuild.es/mcg_images/rookie.png"
              alt="Rookie"
              width="300"
              height="400"
              style={{ padding: "10px" }}
            ></img>
            <p>Tus Rookies: {rookieBalance}</p>
          </div>

          {/* Amateur */}
          <div style={{ display: "inline", float: "left" }}>
            <img
              src="http://vegabuild.es/mcg_images/amateur.png"
              alt="Amateur"
              width="300"
              height="400"
              style={{ padding: "10px" }}
            ></img>
            <p>Tus Amateur: {amateurBalance}</p>
          </div>

          {/* Pro */}
          <div style={{ display: "inline", float: "left" }}>
            <img
              src="http://vegabuild.es/mcg_images/pro.png"
              alt="Pro"
              width="300"
              height="400"
              style={{ padding: "10px" }}
            ></img>
            <p>Tus Pro: {proBalance}</p>
          </div>

          {/* Legend */}
          <div style={{ display: "inline", float: "left" }}>
            <img
              src="http://vegabuild.es/mcg_images/legend.png"
              alt="Legend"
              width="300"
              height="400"
              style={{ padding: "10px" }}
            ></img>
            <p>Tus Legend: {legendBalance}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
