import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// ABIs and addresses
import rookieAddress from "../utils/Contracts.json";
import rookieAbi from "../utils/Contracts.json";
import amateurAddress from "../utils/Contracts.json";
import amateurAbi from "../utils/Contracts.json";
import proAddress from "../utils/Contracts.json";
import proAbi from "../utils/Contracts.json";
import legendAddress from "../utils/Contracts.json";
import legendAbi from "../utils/Contracts.json";

// React context
export const TransactionContext = React.createContext();

// Ethereum object
const { ethereum } = window;

// Contracts creation
const getRookieContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const rookieContract = new ethers.Contract(rookieAddress, rookieAbi, signer);
  return rookieContract;
};

const getAmateurContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const amateurContract = new ethers.Contract(
    amateurAddress,
    amateurAbi,
    signer
  );
  return amateurContract;
};

const getProContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const proContract = new ethers.Contract(proAddress, proAbi, signer);
  return proContract;
};

const getLegendContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const legendContract = new ethers.Contract(legendAddress, legendAbi, signer);
  return legendContract;
};

// Context itself
export const TransactionProvider = ({ children }) => {
  // Loading message
  const [loadingMessage, setLoadingMessage] = useState("");

  // Error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Account connected
  const [currentAccount, setCurrentAccount] = useState("");

  // Chain ID
  const ChainId = 97;

  // Function that buys a rookie NFT
  const buyRookiePresale = async () => {
    // Gets the rookie contract
    const rookieContract = getRookieContract();

    // Calls the function of the contract passsing the account
    const transactionHash = await rookieContract.mintRookie(currentAccount);

    // Changes the loading to true
    setLoadingMessage(true);

    // Shows a message of loading
    console.log(`Loading - ${transactionHash.hash}`);

    // Waits for the transaction to finish
    await transactionHash.wait();

    // Shows a message of success
    console.log(`Success - ${transactionHash.hash}`);

    // Changes the loading to false
    setLoadingMessage(false);
  };

  // Function that buys an amateur NFT
  const buyAmateurPresale = async () => {
    // Gets the amateur contract
    const amateurContract = getAmateurContract();

    // Calls the function of the contract passsing the account
    const transactionHash = await amateurContract.mintAmateur(currentAccount);

    // Changes the loading to true
    setLoadingMessage(true);

    // Shows a message of loading
    console.log(`Loading - ${transactionHash.hash}`);

    // Waits for the transaction to finish
    await transactionHash.wait();

    // Shows a message of success
    console.log(`Success - ${transactionHash.hash}`);

    // Changes the loading to false
    setLoadingMessage(false);
  };

  // Function that buys an pro NFT
  const buyProPresale = async () => {
    // Gets the pro contract
    const proContract = getProContract();

    // Calls the function of the contract passsing the account
    const transactionHash = await proContract.mintPro(currentAccount);

    // Changes the loading to true
    setLoadingMessage(true);

    // Shows a message of loading
    console.log(`Loading - ${transactionHash.hash}`);

    // Waits for the transaction to finish
    await transactionHash.wait();

    // Shows a message of success
    console.log(`Success - ${transactionHash.hash}`);

    // Changes the loading to false
    setLoadingMessage(false);
  };

  // Function that buys an legend NFT
  const buyLegendPresale = async () => {
    // Gets the legend contract
    const legendContract = getLegendContract();

    // Calls the function of the contract passsing the account
    const transactionHash = await legendContract.mintLegend(currentAccount);

    // Changes the loading to true
    setLoadingMessage(true);

    // Shows a message of loading
    console.log(`Loading - ${transactionHash.hash}`);

    // Waits for the transaction to finish
    await transactionHash.wait();

    // Shows a message of success
    console.log(`Success - ${transactionHash.hash}`);

    // Changes the loading to false
    setLoadingMessage(false);
  };

  // Function that checks our accounts
  const checkWalletConnection = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!!");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      // If there are accounts connected and the chain id is valid
      if (accounts.length && parseInt(window.ethereum.chainId) === ChainId) {
        setCurrentAccount(accounts[0]);
        setErrorMessage("");
        // If the chain id isn't valid
      } else if (parseInt(window.ethereum.chainId) !== ChainId) {
        setCurrentAccount("");
        setErrorMessage("Wrong Network");
        // If there are no accounts connected and the chain id is valid
      } else {
        setCurrentAccount("");
        setErrorMessage("");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  // Function that requests metamask
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!!");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      console.log(currentAccount);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  // Listener launched at account changed
  window.ethereum.on("accountsChanged", async () => {
    checkWalletConnection();
  });

  // Listener launched at ID chain changed
  window.ethereum.on("chainChanged", async () => {
    checkWalletConnection();
  });

  // Component did mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Returns the context
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        errorMessage,
        loadingMessage,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
