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
  // Private sell count NFTS
  const [rookiePrivateSellCount, setRookieprivateSellCount] = useState();
  const [amateurPrivateSellCount, setAmateurprivateSellCount] = useState();
  const [proPrivateSellCount, setProprivateSellCount] = useState();
  const [legendPrivateSellCount, setLegendprivateSellCount] = useState();

  // Lasting NFTS
  const [rookieLasting, setRookieLasting] = useState();
  const [amateurLasting, setAmateurLasting] = useState();
  const [proLasting, setProLasting] = useState();
  const [legendLasting, setLegendLasting] = useState();

  // Balance of NFTS
  const [rookieBalance, setRookieBalance] = useState();
  const [amateurBalance, setAmateurBalance] = useState();
  const [proBalance, setProBalance] = useState();
  const [legendBalance, setLegendBalance] = useState();

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
      // Changes the loading to true
      setLoadingMessage(true);

      const approveTx = await usdcContract.approve(
        rookieContract.address,
        ethers.utils.parseEther(rookiePrice.toString())
      );

      const receipt = await approveTx.wait();

      if (receipt.status === 0) {
        allowanceOk = false;
      }

      // Changes the loading to false
      setLoadingMessage(false);
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
        1000 - (parseInt(countRookies) + parseInt(currentRookie))
      );

      // Upadtes the balance variable
      const balanceOfRookies = await rookieContract.balanceOf(currentAccount);
      setRookieBalance(parseInt(balanceOfRookies));

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
      // Changes the loading to true
      setLoadingMessage(true);

      const approveTx = await usdcContract.approve(
        amateurContract.address,
        ethers.utils.parseEther(amateurPrice.toString())
      );

      const receipt = await approveTx.wait();

      if (receipt.status === 0) {
        allowanceOk = false;
      }

      // Changes the loading to false
      setLoadingMessage(false);
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

      // Sets the variable of lasting rookies NFT
      setAmateurLasting(
        1000 - (parseInt(countAmateurs) + parseInt(currentAmateur))
      );

      // Upadtes the balance variable
      const balanceOfAmateurs = await amateurContract.balanceOf(currentAccount);
      setAmateurBalance(parseInt(balanceOfAmateurs));

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
      // Changes the loading to true
      setLoadingMessage(true);

      const approveTx = await usdcContract.approve(
        proContract.address,
        ethers.utils.parseEther(proPrice.toString())
      );

      const receipt = await approveTx.wait();

      if (receipt.status === 0) {
        allowanceOk = false;
      }

      // Changes the loading to false
      setLoadingMessage(false);
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

      // Sets the variable of lasting rookies NFT
      setProLasting(1000 - (parseInt(countPro) + parseInt(currentPro)));

      // Upadtes the balance variable
      const balanceOfPros = await proContract.balanceOf(currentAccount);
      setProBalance(parseInt(balanceOfPros));

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
      // Changes the loading to true
      setLoadingMessage(true);

      const approveTx = await usdcContract.approve(
        legendContract.address,
        ethers.utils.parseEther(legendPrice.toString())
      );

      const receipt = await approveTx.wait();

      if (receipt.status === 0) {
        allowanceOk = false;
      }

      // Changes the loading to false
      setLoadingMessage(false);
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

      // Sets the variable of lasting rookies NFT
      setLegendLasting(
        1000 - (parseInt(countLegends) + parseInt(currentLegend))
      );

      // Upadtes the balance variable
      const balanceOfLegends = await legendContract.balanceOf(currentAccount);
      setLegendBalance(parseInt(balanceOfLegends));

      // Shows a message of success
      console.log(`Success - ${transactionHash.hash}`);

      // Changes the loading to false
      setLoadingMessage(false);
    }
  };

  const initialChecks = async (address) => {
    // Gets the count of the NFTs minted, the balance of NFTs minted and the private sell for Rookies
    const rookieContract = getRookieContract();
    const countRookies = await rookieContract.getPrivatelySellCount();
    const currentRookie = await rookieContract.getCurrentTokenId();
    const balanceOfRookies = await rookieContract.balanceOf(address);
    const privateSellOfRookies = await rookieContract.getPrivateSell(address);
    setRookieLasting(1000 - (parseInt(countRookies) + parseInt(currentRookie)));
    setRookieBalance(balanceOfRookies.toNumber());
    setRookieprivateSellCount(privateSellOfRookies.toNumber());

    // Gets the count of the NFTs minted, the balance of NFTs minted and the private sell for Amateurs
    const amateurContract = getAmateurContract();
    const countAmateurs = await amateurContract.getPrivatelySellCount();
    const currentAmateur = await amateurContract.getCurrentTokenId();
    const balanceOfAmateurs = await amateurContract.balanceOf(address);
    const privateSellOfAmateurs = await amateurContract.getPrivateSell(address);
    setAmateurLasting(
      1000 - (parseInt(countAmateurs) + parseInt(currentAmateur))
    );
    setAmateurBalance(balanceOfAmateurs.toNumber());
    setAmateurprivateSellCount(privateSellOfAmateurs.toNumber());

    // Gets the count of the NFTs minted, the balance of NFTs minted and the private sell for Pros
    const proContract = getProContract();
    const countPro = await proContract.getPrivatelySellCount();
    const currentPro = await proContract.getCurrentTokenId();
    const balanceOfPros = await proContract.balanceOf(address);
    const privateSellOfPros = await proContract.getPrivateSell(address);
    setProLasting(1000 - (parseInt(countPro) + parseInt(currentPro)));
    setProBalance(balanceOfPros.toNumber());
    setProprivateSellCount(privateSellOfPros.toNumber());

    // Gets the count of the NFTs minted, the balance of NFTs minted and the private sell for Legends
    const legendContract = getLegendContract();
    const countLegends = await legendContract.getPrivatelySellCount();
    const currentLegend = await legendContract.getCurrentTokenId();
    const balanceOfLegend = await legendContract.balanceOf(address);
    const privateSellOfLegend = await legendContract.getPrivateSell(address);
    setLegendLasting(1000 - (parseInt(countLegends) + parseInt(currentLegend)));
    setLegendBalance(balanceOfLegend.toNumber());
    setLegendprivateSellCount(privateSellOfLegend.toNumber());
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
        initialChecks(accounts[0]);
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
        rookiePrivateSellCount,
        amateurPrivateSellCount,
        proPrivateSellCount,
        legendPrivateSellCount,
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
