import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// ABIs and addresses
import contract from "../utils/Contracts.json";

// React context
export const TransactionContext = React.createContext();

// Ethereum object
const { ethereum } = window;

// Contracts creation
const getUsdcContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const usdcContract = new ethers.Contract(
    contract.usdcAddress,
    contract.usdcAbi,
    signer
  );
  return usdcContract;
};

const getRookieContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const rookieContract = new ethers.Contract(
    contract.rookieAddress,
    contract.rookieAbi,
    signer
  );
  return rookieContract;
};

const getAmateurContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const amateurContract = new ethers.Contract(
    contract.amateurAddress,
    contract.amateurAbi,
    signer
  );
  return amateurContract;
};

const getProContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const proContract = new ethers.Contract(
    contract.proAddress,
    contract.proAbi,
    signer
  );
  return proContract;
};

const getLegendContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const legendContract = new ethers.Contract(
    contract.legendAddress,
    contract.legendAbi,
    signer
  );
  return legendContract;
};

// Context itself
export const TransactionProvider = ({ children }) => {
  // Lasting NFTS
  const [rookieLasting, setRookieLasting] = useState();
  const [amateurLasting, setAmateurLasting] = useState();
  const [proLasting, setProLasting] = useState();
  const [legendLasting, setLegendLasting] = useState();

  // Loading message
  const [loadingMessage, setLoadingMessage] = useState("");

  // Error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Account connected
  const [currentAccount, setCurrentAccount] = useState("");

  // Chain ID
  const ChainId = 80001;

  // Function that buys a rookie NFT
  const buyRookiePresale = async () => {
    // Gets the rookie contract
    const rookieContract = getRookieContract();

    // Gets the usdc contrct
    const usdcContract = getUsdcContract();

    // Price of a Rookie NFT
    const rookiePrice = 0.001;

    // Check allowance
    let allowanceOk = true;

    // Allowance of contract
    if (
      parseInt(
        await usdcContract.allowance(currentAccount, rookieContract.address)
      ) < parseInt(ethers.utils.parseEther(rookiePrice.toString()))
    ) {
      const approveTx = await usdcContract.approve(
        rookieContract.address,
        ethers.utils.parseEther(rookiePrice.toString())
      );

      const receipt = await approveTx.wait();

      if (receipt.status === 0) {
        allowanceOk = false;
      }
    }

    if (allowanceOk) {
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

      // Gets the count of the NFTs minted
      const countRookies = await rookieContract.getPrivatelySellCount();

      // Gets the current NFT id
      const currentRookie = await rookieContract.getCurrentTokenId();

      // Sets the variable of lasting rookies NFT
      setRookieLasting(
        1000 - (countRookies.toNumber() + currentRookie.toNumber())
      );

      // Changes the loading to false
      setLoadingMessage(false);
    }
  };

  // Function that buys an amateur NFT
  const buyAmateurPresale = async () => {
    // Gets the amateur contract
    const amateurContract = getAmateurContract();

    // Gets the usdc contrct
    const usdcContract = getUsdcContract();

    // Price of a Amateur NFT
    const amateurPrice = 0.002;

    // Check allowance
    let allowanceOk = true;

    // Allowance of contract
    if (
      parseInt(
        await usdcContract.allowance(currentAccount, amateurContract.address)
      ) < parseInt(ethers.utils.parseEther(amateurPrice.toString()))
    ) {
      const approveTx = await usdcContract.approve(
        amateurContract.address,
        ethers.utils.parseEther(amateurPrice.toString())
      );

      const receipt = await approveTx.wait();

      if (receipt.status === 0) {
        allowanceOk = false;
      }
    }

    if (allowanceOk) {
      // Calls the function of the contract passsing the account
      const transactionHash = await amateurContract.mintAmateur(currentAccount);

      // Changes the loading to true
      setLoadingMessage(true);

      // Shows a message of loading
      console.log(`Loading - ${transactionHash.hash}`);

      // Waits for the transaction to finish
      await transactionHash.wait();

      const countAmateurs = await amateurContract.getPrivatelySellCount();
      const currentAmateur = await amateurContract.getCurrentTokenId();
      setAmateurLasting(
        1000 - (parseInt(countAmateurs) + parseInt(currentAmateur))
      );

      // Shows a message of success
      console.log(`Success - ${transactionHash.hash}`);

      // Changes the loading to false
      setLoadingMessage(false);
    }
  };

  // Function that buys an pro NFT
  const buyProPresale = async () => {
    // Gets the pro contract
    const proContract = getProContract();

    // Gets the usdc contrct
    const usdcContract = getUsdcContract();

    // Price of a pro NFT
    const proPrice = 0.003;

    // Check allowance
    let allowanceOk = true;

    // Allowance of contract
    if (
      parseInt(
        await usdcContract.allowance(currentAccount, proContract.address)
      ) < parseInt(ethers.utils.parseEther(proPrice.toString()))
    ) {
      const approveTx = await usdcContract.approve(
        proContract.address,
        ethers.utils.parseEther(proPrice.toString())
      );

      const receipt = await approveTx.wait();

      if (receipt.status === 0) {
        allowanceOk = false;
      }
    }

    if (allowanceOk) {
      // Calls the function of the contract passsing the account
      const transactionHash = await proContract.mintPro(currentAccount);

      // Changes the loading to true
      setLoadingMessage(true);

      // Shows a message of loading
      console.log(`Loading - ${transactionHash.hash}`);

      // Waits for the transaction to finish
      await transactionHash.wait();

      const countPro = await proContract.getPrivatelySellCount();
      const currentPro = await proContract.getCurrentTokenId();
      setProLasting(1000 - (parseInt(countPro) + parseInt(currentPro)));

      // Shows a message of success
      console.log(`Success - ${transactionHash.hash}`);

      // Changes the loading to false
      setLoadingMessage(false);
    }
  };

  // Function that buys an legend NFT
  const buyLegendPresale = async () => {
    // Gets the legend contract
    const legendContract = getLegendContract();

    // Gets the usdc contrct
    const usdcContract = getUsdcContract();

    // Price of a legend NFT
    const legendPrice = 0.004;

    // Check allowance
    let allowanceOk = true;

    // Allowance of contract
    if (
      parseInt(
        await usdcContract.allowance(currentAccount, legendContract.address)
      ) < parseInt(ethers.utils.parseEther(legendPrice.toString()))
    ) {
      const approveTx = await usdcContract.approve(
        legendContract.address,
        ethers.utils.parseEther(legendPrice.toString())
      );

      const receipt = await approveTx.wait();

      if (receipt.status === 0) {
        allowanceOk = false;
      }
    }

    if (allowanceOk) {
      // Calls the function of the contract passsing the account
      const transactionHash = await legendContract.mintLegend(currentAccount);

      // Changes the loading to true
      setLoadingMessage(true);

      // Shows a message of loading
      console.log(`Loading - ${transactionHash.hash}`);

      // Waits for the transaction to finish
      await transactionHash.wait();

      const countLegends = await legendContract.getPrivatelySellCount();
      const currentLegend = await legendContract.getCurrentTokenId();
      setLegendLasting(
        1000 - (parseInt(countLegends) + parseInt(currentLegend))
      );

      // Shows a message of success
      console.log(`Success - ${transactionHash.hash}`);

      // Changes the loading to false
      setLoadingMessage(false);
    }
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

        // Gets the count of the NFTs minted
        const rookieContract = getRookieContract();
        const countRookies = await rookieContract.getPrivatelySellCount();
        const currentRookie = await rookieContract.getCurrentTokenId();
        const baseUri = await rookieContract.baseURI();

        setRookieLasting(
          1000 - (parseInt(countRookies) + parseInt(currentRookie))
        );

        const amateurContract = getAmateurContract();
        const countAmateurs = await amateurContract.getPrivatelySellCount();
        const currentAmateur = await amateurContract.getCurrentTokenId();
        setAmateurLasting(
          1000 - (parseInt(countAmateurs) + parseInt(currentAmateur))
        );

        const proContract = getProContract();
        const countPro = await proContract.getPrivatelySellCount();
        const currentPro = await proContract.getCurrentTokenId();
        setProLasting(1000 - (parseInt(countPro) + parseInt(currentPro)));

        const legendContract = getLegendContract();
        const countLegends = await legendContract.getPrivatelySellCount();
        const currentLegend = await legendContract.getCurrentTokenId();
        setLegendLasting(
          1000 - (parseInt(countLegends) + parseInt(currentLegend))
        );

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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
