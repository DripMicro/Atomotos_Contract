import React, {useState, useEffect} from 'react';
// import getWeb3 from "./getWeb3";
import Web3 from "web3";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import evmChains from 'evm-chains';
import Fortmatic from 'fortmatic';
import BVToken from "../../contracts/BVToken.json";
import PublicSale from "../../contracts/PublicSale.json";
import BUSDToken from "../../contracts/BUSDToken.json";
import { initOnboard, initNotify } from './services.js';
// import { ethers } from 'ethers';
// import getSigner from './signer'
import Onboard from 'bnc-onboard'
import avatarPlaceholder from './avatar-placeholder.png'
import networkEnum from './networkEnum'
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Modal from "react-modal";
import TimeAgo from 'javascript-time-ago';
import en from "javascript-time-ago/locale/en.json";
import "../css/style.css";
// import { init, onConnect, onDisconnect } from '../../util/we3modal';

TimeAgo.addDefaultLocale(en);
Modal.setAppElement("#root");

export default function HomeNavbar() {
    const [userTokens,setUserTokens] = useState(0);
    const [tokenInstance, setTokenInstance] = useState(null);
    const [publicSaleInstance, setPublicSaleInstance] = useState(null);
    const [proAddress, setProAddress] = useState(null);
    const [pro, setPro] = useState(10);
    const [BUSDTokenInstance, setBUSDTokenInstance] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [busdAmount, setbusdAmount] = useState(0);
    const [bnbAmount, setbnbAmount] = useState(0);
    const [web3, setWeb3] = useState(0);
    const [Amount, setAmount] = useState(0);
    const [onboard, setOnboard] = useState(null)
    const [notify, setNotify] = useState(null)
    // const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState(null)
    const [ens, setEns] = useState(null)
    const [network, setNetwork] = useState(null)
    const [balance, setBalance] = useState(null)
    const [wallet, setWallet] = useState({}); 
    //time
    let [CountTime, setCountTime] = useState(-1);
    let [day, setDay] = useState(0);
    let [hour, setHour] = useState(0);
    let [minute, setMinute] = useState(0);
    let [second, setSecond] = useState(0);
    let [startTime, setStartTime] = useState(1638801600); // start unix time -- privateSale
    let [endTime, setEndTime] = useState(1639363768); // end unix time -- privateSale
    //Modal
    const [isOpen, setIsOpen] = useState(false);
    const [isPrivateBuy, setIsPrivateBuy] = useState(false);
    const [isGetBV, setIsGetBV] = useState(false);

    // Web3modal instance
    const [web3Modal, setWeb3Modal] = useState(null);

    const [walletConnected, setWalletConnected] = useState(false);

    // Chosen wallet provider given by the dialog window
    let [provider, setProvider] = useState(null);
    // Address of the selected account
    let selectedAccount;
    
    // let provider;

    function toggleModal() {
        setIsOpen(!isOpen);
    }
///////////////////////////////////////////////
    function init() {
      // Count Time
      let localTime = Math.ceil((new Date).getTime()/1000);
      if(localTime > startTime)
        setCountTime(endTime - localTime);
      else 
        setCountTime(endTime - startTime);
      console.log("Initializing example");
      console.log("WalletConnectProvider is", WalletConnectProvider);
      console.log("Fortmatic is", Fortmatic);
      console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
      // console.log(provider);
      // Check that the web page is run in a secure context,
      // as otherwise MetaMask won't be available
      // if(window.location.protocol !== 'https:') {
      //   // https://ethereum.stackexchange.com/a/62217/620
      //   const alert = document.querySelector("#alert-error-https");
      //   alert.style.display = "block";
      //   document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
      //   return;
      // }
    
      // Tell Web3modal what providers we have available.
      // Built-in web browser provider (only one can exist as a time)
      // like MetaMask, Brave or Opera is added automatically by Web3modal
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            // Mikko's test key - don't copy as your mileage may vary
            infuraId: "3f88fa504c1d4ec1bec07966779f1ce0",
          }
        },
    
        fortmatic: {
          package: Fortmatic,
          options: {
            // Mikko's TESTNET api key
            key: "pk_test_391E26A3B43A3350"
          }
        }
      };
    
      let web3_Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
      });

      setWeb3Modal(web3_Modal);
    
      console.log("Web3Modal instance is", web3Modal);
    }

    async function fetchAccountData() {

      // Get a Web3 instance for the wallet
      const web3 = new Web3(provider);
      setWeb3(web3);
    
      console.log("Web3 instance is", web3);
    
      // Get connected chain id from Ethereum node
      const chainId = await web3.eth.getChainId();
      // Load chain information over an HTTP API
      // console.log(chainId)
      // console.log(evmChains)
      // const chainData = evmChains.getChain(chainId);
      // document.querySelector("#network-name").textContent = chainData.name;
    
      // Get list of accounts of the connected wallet
      const accounts_temp = await web3.eth.getAccounts();
      
      const networkId_temp = web3.eth.net.getId();
      networkId_temp.then(function(networkId){
        setNetwork(networkId);
      })

      // accounts_temp.then(function(accounts){
        setAccounts(accounts_temp);

        // console.log(accounts_temp)
      // })
    
      const tokenInstance_temp = new web3.eth.Contract(
        BVToken.abi,
        BVToken.networks[networkId_temp] && BVToken.networks[networkId_temp].address,
      );
      tokenInstance_temp.options.address = "0x8057F40f92dA0b6A8C954cb365fa8c20b05F0354";
      setTokenInstance(tokenInstance_temp);

      const publicSaleInstance_temp = new web3.eth.Contract(
        PublicSale.abi,
        PublicSale.networks[networkId_temp] && PublicSale.networks[networkId_temp].address,
      );
      console.log(2)
      publicSaleInstance_temp.options.address = "0xB5Ae04865E5a205CD2E706462ca24453D44Fc24F";
      setPublicSaleInstance(publicSaleInstance_temp);
      console.log(publicSaleInstance_temp)
    
      // MetaMask does not give you all accounts, only the selected account
      console.log("Got accounts", accounts);
      // selectedAccount = accounts[0];
    
      // document.querySelector("#selected-account").textContent = selectedAccount;
      // console.log('selectedAccount', selectedAccount);
    
      // Get a handl
      // const template = document.querySelector("#template-balance");
      // const accountContainer = document.querySelector("#accounts");
    
      // Purge UI elements any previously loaded accounts
      // accountContainer.innerHTML = '';
    
      // Go through all accounts and get their ETH balance
      const rowResolvers = accounts.map(async (address) => {
        const balance = await web3.eth.getBalance(address);
        // ethBalance is a BigNumber instance
        // https://github.com/indutny/bn.js/
        const ethBalance = web3.utils.fromWei(balance, "ether");
        const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
        // Fill in the templated row and put in the document
        // const clone = template.content.cloneNode(true);
        // clone.querySelector(".address").textContent = address;
        // clone.querySelector(".balance").textContent = humanFriendlyBalance;
        // accountContainer.appendChild(clone);
        console.log(address);
        console.log(humanFriendlyBalance);
      });
    
      // Because rendering account does its own RPC commucation
      // with Ethereum node, we do not want to display any results
      // until data for all accounts is loaded
      await Promise.all(rowResolvers);
      // Display fully loaded UI for wallet data
      // document.querySelector("#prepare").style.display = "none";
      // document.querySelector("#connected").style.display = "block";
      setWalletConnected(true);
    }
    
    async function refreshAccountData() {

      // If any current data is displayed when
      // the user is switching acounts in the wallet
      // immediate hide this data
      // document.querySelector("#connected").style.display = "none";
      // document.querySelector("#prepare").style.display = "block";
      setWalletConnected(false);
      // Disable button while UI is loading.
      // fetchAccountData() will take a while as it communicates
      // with Ethereum node via JSON-RPC and loads chain data
      // over an API call.
      // document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
      await fetchAccountData(provider);
      // document.querySelector("#btn-connect").removeAttribute("disabled")
    }



    async function onConnect() {

      console.log("Opening a dialog", web3Modal);
      try {
        provider = await web3Modal.connect();
      } catch(e) {
        console.log("Could not get a wallet connection", e);
        return;
      }
      console.log(provider);
      setProvider(provider);
      console.log(provider);
      console.log('provider accounts changed')
      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
      });
      console.log('provider chain changed')
      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        fetchAccountData();
      });
      console.log('provider network changed')
      // Subscribe to networkId change
      provider.on("networkChanged", (networkId) => {
        fetchAccountData();
      });
    
      await refreshAccountData();
    }

    async function onDisconnect() {

      console.log("Killing the wallet connection", provider);
    
      // TODO: Which providers have close method?
      if(provider.close) {
        await provider.close();
    
        // If the cached provider is not cleared,
        // WalletConnect will default to the existing session
        // and does not allow to re-scan the QR code with a new wallet.
        // Depending on your use case you may want or want not his behavir.
        await web3Modal.clearCachedProvider();
        setProvider(null);
      }
    
      selectedAccount = null;
    
      // Set the UI back to the initial state
      // document.querySelector("#prepare").style.display = "block";
      // document.querySelector("#connected").style.display = "none";
      setWalletConnected(false);
    }
///////////////////////////////////////////////



    const getPets = () => {
        try{

        // Count Time
        let localTime = Math.ceil((new Date).getTime()/1000);
        if(localTime > startTime)
          setCountTime(endTime - localTime);
        else 
          setCountTime(endTime - startTime);
          // Get network provider and web3 instance.
          const onboard = initOnboard({
            address: setAddress,
            ens: setEns,
            network: setNetwork,
            balance: setBalance,
            wallet: wallet => {
              if (wallet.provider) {
                setWallet(wallet)
      
                const web3_provider = new Web3(
                  wallet.provider
                )
                // setProvider(web3_provider);
                setWeb3(web3_provider);
    
                const networkId_temp = web3_provider.eth.net.getId();
                networkId_temp.then(function(networkId){
                  setNetwork(networkId);
                })
    
                const accounts_temp = web3_provider.eth.getAccounts();
                accounts_temp.then(function(accounts){
                  setAccounts(accounts);
                })
    
                const tokenInstance_temp = new web3_provider.eth.Contract(
                  BVToken.abi,
                  BVToken.networks[networkId_temp] && BVToken.networks[networkId_temp].address,
                );
                // tokenInstance_temp.options.address = "0x67Aa195a37BFaEd9135757BD9C08ea341a06fA4d";
                setTokenInstance(tokenInstance_temp);
    
                const publicSaleInstance_temp = new web3_provider.eth.Contract(
                  PublicSale.abi,
                  PublicSale.networks[networkId_temp] && PublicSale.networks[networkId_temp].address,
                );
                
                // publicSaleInstance_temp.options.address = "0x87974e335eD405F8BE47a78a459A6244517E5368";
                setPublicSaleInstance(publicSaleInstance_temp);
                
        
                window.localStorage.setItem('selectedWallet', wallet.name)
              } else {
                let provider_temp = null;
                // setProvider(provider_temp);
                setWallet({})
              }
            }
          })
      
          setOnboard(onboard);
      
          setNotify(initNotify());
    
        }catch(error){
           // Catch any errors for any of the above operations.
          console.error(error);
          store.addNotification({
            title: "Failed to load",
            message: "Failed to load web3, accounts, or contract. Check console for details.",
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
        }
    }


  
    useEffect(() => {
        const previouslySelectedWallet =
          window.localStorage.getItem('selectedWallet')
    
        if (previouslySelectedWallet && onboard) {
          onboard.walletSelect(previouslySelectedWallet)
        }
    }, [onboard])
    
      const updateUserTokens = async () => {
        if (accounts.length > 0 ){
          let userTokens = await tokenInstance.methods.balanceOf(accounts[0]).call();
          setUserTokens(userTokens);
        } else {
          store.addNotification({
            title: "Error cannot find your account",
            message: "Please check out available wallets",
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
        }
      }
    
      const listenToTokenTransfer = () => {
        if(accounts[0])
          tokenInstance.events.Transfer({to: accounts[0]}).on("data", updateUserTokens);
      }
    
      const InputBusdValue = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setbusdAmount(value);
      }
      
      const InputProAddressValue = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setProAddress(value);
      }
      
      const InputPro = async(event) => {
        setPro(event.target.value);
      }
    
      const InputBnbValue = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setbnbAmount(value);
      }

      const InputValue= (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setAmount(value);
      }
      
      const handlePro = async() => {
        await publicSaleInstance.methods.updatePro(pro).send({from:accounts[0]});
        console.log(await publicSaleInstance.methods.getPro().call());
      }
    
      const handleAddProAddress = async() => {
        if(publicSaleInstance && BUSDTokenInstance){
          console.log(proAddress);
          await publicSaleInstance.methods.updateProtectAddr(proAddress).send({from:accounts[0]});
        }
      }
    
      const handlegetProAddress = async() => {
        if(publicSaleInstance && BUSDTokenInstance){
          let proaddress = await publicSaleInstance.methods.getProAddress().call();
          console.log(proaddress);
        }
      }
    
      const handleBuyBUSDToken = async() => {
        if(publicSaleInstance && BUSDTokenInstance)
        {
          const birthDateInUnixTimestamp = await publicSaleInstance.methods.getCurrentTime().call();
          let date = new Date(birthDateInUnixTimestamp * 1000);
          const amount = Number(busdAmount * 10 ** 18);
    //      const fee = web3.utils.toWei(parseFloat(Number(busdAmount)/10).toString(),'ether');
          await BUSDTokenInstance.methods.approve(publicSaleInstance._address, web3.utils.toBN(amount.toString())).send({from:accounts[0]});
          await publicSaleInstance.methods.investBUSD(web3.utils.toBN(amount.toString())).send({from: accounts[0]});
      //    web3.eth.sendTransaction({from:accounts[0], to:'0xEEFaA2676F8091ba960bb23c8A17eA06bf45B712', value:fee, gas:3000000});
        }
      }
      
      const handlegetFundsBUSD = async() => {
        if(publicSaleInstance){
          await publicSaleInstance.methods.getFundsBUSD().send({from:accounts[0]});
        }
      }
    
      const handlewithdrawBUSD = async() => {
        if(publicSaleInstance){
          await publicSaleInstance.methods.withdrawBUSD().send({from:accounts[0]});
        }
      }
    
      const handleBuyBNBToken = async() => {
        console.log(publicSaleInstance);
        if(publicSaleInstance){
          console.log(accounts[0]);
          const amount = Number(bnbAmount) * Number(10 ** 18);
          await publicSaleInstance.methods.investBNB().send({from: accounts[0], value: web3.utils.toWei(amount.toString(),"wei")});
          console.log("public_balance", await publicSaleInstance.methods.getbalance().call());
          const amount1 = await publicSaleInstance.methods.getmsgvalue().call();
          console.log("msgvalue",amount1);
        }
      }
    
      const handleBuyToken = async() => {
        const tokenAmount = Number(Amount * 10 ** 18);
        if (Number(Amount) >= 0.25 && Number(Amount) <= 2){
          if (publicSaleInstance) {
            const walletlist = await publicSaleInstance.methods.getPrivateWhiteList().call();
            console.log(publicSaleInstance);
            if(walletlist.indexOf(accounts[0]) !== -1) {
              store.addNotification({
                title: "Error BNB Request",
                message: "You already bought BV Token. You can only buy once.",
                type: "danger", // 'default', 'success', 'info', 'warning'
                container: "top-right", // where to position the notifications
                animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
                dismiss: {
                  duration: 3000
                }
              });
            } else {
              const amount = tokenAmount;
              console.log(accounts[0].toString())
              console.log(amount);
              console.log( web3.utils.toWei(amount.toString(),"wei"))
              const bnbfunds = await publicSaleInstance.methods.getbalance().call();
              console.log(bnbfunds);
              if (accounts.length > 0)
                await publicSaleInstance.methods.investBNB().send({from: accounts[0].toString(), value: web3.utils.toWei(amount.toString(),"wei")});
              else {
                store.addNotification({
                  title: "Error Not Connected Your Wallet",
                  message: "Please connect your wallet",
                  type: "danger", // 'default', 'success', 'info', 'warning'
                  container: "top-right", // where to position the notifications
                  animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
                  animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
                  dismiss: {
                    duration: 3000
                  }
                });
              }
            }
           }
        } else {
          console.log(publicSaleInstance);
          store.addNotification({
            title: "Error BNB quantity",
            message: "You have to input between 0.5 BNB and 2 BNB.",
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          });
        }
      }


      const handlegetFundsBNB = async() => {
        if(publicSaleInstance){
          if (accounts.length > 0)
            await publicSaleInstance.methods.getFundsBNB().send({from:accounts[0]});
          else {
            store.addNotification({
              title: "Error cannot find your account",
              message: "Please check out available wallets",
              type: "danger", // 'default', 'success', 'info', 'warning'
              container: "top-right", // where to position the notifications
              animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
              dismiss: {
                duration: 3000
              }
            });
          }
        }
      }
    
      const handlewithdrawBNB = async() => {
        if(publicSaleInstance){
          await publicSaleInstance.methods.withdrawBNB().send({from:accounts[0]});
        }
      }
    
      const handlegetTime = async() => {
        if(publicSaleInstance){
          const time = await publicSaleInstance.methods.getCurrentTime().call();
          console.log(time);
        }
      }
        
      const handleGetBUSDBalance = async() => {
        if(publicSaleInstance){
          const busdfunds = await publicSaleInstance.methods.getBUSDBalance().call();
          console.log(busdfunds);
        }
      }
    
      const handleGetBNBBalance = async() => {
        if(publicSaleInstance){
          const bnbfunds = await publicSaleInstance.methods.getbalance().call();
          console.log(bnbfunds);
        }
      }

      function countdown(s) {
        const d = Math.floor(s / (3600 * 24));
        s  -= d * 3600 * 24;
        setDay(d);
    
        const h = Math.floor(s / 3600);
        s  -= h * 3600;
        setHour(h);
    
        const m = Math.floor(s / 60);
        s  -= m * 60;
        setMinute(m);
    
        const tmp = [];
        (d) && tmp.push(d + 'd');
        (d || h) && tmp.push(h + 'h');
        (d || h || m) && tmp.push(m + 'm');
        tmp.push(s + 's');
    
        setSecond(s);
        return tmp.join(' ');
      }
    
      function initTime(){
        setDay(0);
        setHour(0);
        setMinute(0);
        setSecond(0);
      }
    
      useEffect(() => {
        if(accounts && tokenInstance && publicSaleInstance)
        {
          // listenToTokenTransfer();
        }
      }, [userTokens, tokenInstance, publicSaleInstance])
      
      useEffect(()=>{
        //getPets();
        init();
      },[])

      useEffect(() => {
          let localTime = Math.ceil((new Date).getTime()/1000);
          let remainTime = CountTime;
          // privateSale Time
          if (localTime >= startTime && localTime <= endTime){
            remainTime -= 1;
            if (remainTime >= 0) {
              countdown(remainTime)
              setIsPrivateBuy(true)
            } 
            // console.log(remainTime)  
          } else {
            initTime()
            setIsPrivateBuy(false)
          }
          // Get BV
          if (localTime > endTime){
            setIsGetBV(true)
          } else {
            setIsGetBV(false)
          }
      
          setTimeout(() => setCountTime(remainTime), 1000);
      }, );

  return (
    <>
      <header className="header">
        <div className="container">
          <nav id="navigation1" className="navigation">
            <div className="nav-header">
              <a className="nav-brand" href="index.html">
                <img src="assets/images/trypto_logo_blue.png" alt="" />
              </a>
              <div className="nav-toggle" />
            </div>

            <div className="nav-menus-wrapper xs-menu">
              <ul className="header-right align-to-right">
               
              </ul>
              <ul className="nav-menu align-to-right">
                <li className="active">
                  <a href="#">Home</a>
               
                </li>
                <li>
                  <a href="#featured" className="scrolls">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how_work" className="scrolls">
                    Pre-Sale ICO
                  </a>
                </li>
   
                <li>
                  <a href="#whitePaper" className="scrolls">
                    White Paper
                  </a>
                </li>
                <li>
                  {/* {wallet.provider && (
                    <button className="btn btn-primary wallet_btn" onClick={onboard.walletReset}>
                      Reset Wallet
                    </button>
                  )}
                  {wallet.provider && (
                    <button className="btn btn-primary wallet_btn" onClick={onboard.walletCheck}>
                      Wallet Checks
                    </button>
                  )} */}
                  {!walletConnected && (
                    <button className="btn btn-primary wallet_btn" onClick={() => { onConnect() }}>
                      Connect Wallet
                    </button>
                  )}
                  {walletConnected && (
                    <button className="btn btn-primary wallet_btn" onClick={() => { onDisconnect() }}>
                      Disconnect Wallet
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {/* <!-- .container END --> */}
      </header>
      
      <div id="particles-js">
          <section className="banner-sec" id="particles-js1">
            <div
              className="banner-item"
              style={{
                background:
                  'url(assets/images/background/banner_bg.jpg) no-repeat center center /cover'
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <div className="banner-content">
                      <h1 className="banner-title">Welcome to the BlocVault Ecosystem</h1>
                      <p>
                        BlocVault is a decentralized BSC project that will use the BVLT token to reward
                        investors and holders within our App and on our Platform. 
                      </p>
                      <a href="#" className="btn btn-primary">
                        HOW TO BUY
                      </a>
                    </div>
                  </div>
                </div>
                <div className="banner-img-item">
                  <img
                    className="banner-img"
                    src="assets/images/banner/banner_img.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-1"
                    src="assets/images/banner/b1.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-2"
                    src="assets/images/banner/b2.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-3"
                    src="assets/images/banner/b3.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-4"
                    src="assets/images/banner/b4.png"
                    alt=""
                  />
                  <img
                    className="banner-ico banner-ico-5"
                    src="assets/images/banner/b5.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="featured-area">
            <div className="blockcain-and-featured-area">
              
              <section className="blockcain-top-sec">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-md-6 wow fadeInUp"
                      data-wow-duration="1.5s"
                    >
                    
                      <div className="blockcain-top">
                        <h2 className="column-title">
                          Our revolutionary App suite.
                        </h2>
                        <p>
                          Buy, Sell, Swap, Trade, Chat and track all your 
                          investments in one place. Use our BV debit card
                          in-store worldwide.  
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-md-5 offset-md-1 wow fadeInUp"
                      data-wow-duration="2s"
                    >
                      <div className="blockcain-top-content">
                        <h2 className="column-title">
                          Stay connected with our marketplace. 
                        </h2>
                        <p>
                          Our NFT marketplace & online products will allow
                          users to connect send & receive assets in seconds
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  
              <section className="featured-sec" id="featured">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <div className="section-title-item">
                        <small className="xs-section-title"></small>
                        <h2 className="section-title">Revolutionary Features</h2>
                      </div>
                    </div>
                  </div>
                  <div className="main-fetured-item">
                    <div className="row">
                      <div
                        className="col-md-4 wow fadeInUp"
                        data-wow-duration="1.5s"
                      >
                        <div className="single-feaured-item">
                          <img src="assets/images/feature/icon-1.png" alt="" />
                          <h3 className="feature-title">
                            BV PAY
                          </h3>
                          <p>
                            Use our in app exchange 
                            and BV Debit Card to shop 
                            in-store worldwide. 
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-md-4 wow fadeInUp"
                        data-wow-duration="2s"
                      >
                        <div className="single-feaured-item">
                          <img src="assets/images/feature/icon-2.png" alt="" />
                          <h3 className="feature-title">BV CHAT</h3>
                          <p>
                            Chat with friends & family
                            on the go. Video call or group
                            call with other investors. 
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-md-4 wow fadeInUp"
                        data-wow-duration="2.5s"
                      >
                        <div className="single-feaured-item">
                          <img src="assets/images/feature/icon-3.png" alt="" />
                          <h3 className="feature-title">
                            BV SWAP
                          </h3>
                          <p>
                            Swap tokens across 
                            networks in seconds with 
                            BV multi chain swap
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div
                    className="featured-poligonal-img wow fadeInUp"
                    data-wow-duration="1.5s"
                  >
                    <img
                      className="poligonal-img"
                      src="assets/images/feature/poligonal.png"
                      alt=""
                    />
                  </div>
                </div>
              </section>
            </div>
            <div className="blockcain-and-logo-area">
              <section className="blockcain-business-sec">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-md-6 col-lg-6 wow fadeInUp"
                      data-wow-duration="1.5s"
                    >
                      <div className="blockcain-img">
                        <img
                          src="assets/images/blockchain/block_img.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-6 col-lg-5 offset-lg-1 wow fadeInUp"
                      data-wow-duration="2s"
                    >
                      <div className="blockcain-content">
                        <small className="xs-section-title">
                        </small>
                        <h3 className="column-title">The BVLT Token</h3>
                        <p>
                          The BVLT token is a Binance smart chain (BSC) deflationary token.
                          Binance smart chain (BSC) was developed as a means of utilizing
                          solidity-based smart contracts with much greater speed and efficiency
                          than other, competing chains. With decentralized exchanges on BSC
                          offering lightning fast swaps and extremely low fees, BSC has started to
                          become one of the most widely used block-chains for decentralized
                          finance (Defi). BSC uses a token protocol developed by the Binance team
                          called BEP-20. The BVLT tokens deflationary nature means that each time
                          a transaction occurs using a deflationary token a percentage of the tokens
                          used in the transactions are destroyed permanently. This function is
                          constantly at work removing tokens from the total available supply. Over
                          time, this action works to help increase the value of each token
                          dramatically as it increases the scarcity of tokens.
                        </p>
                        <a href="#" className="btn btn-primary">
                          BUY TOKEN
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  
              <section className="client-logo-sec">
                <div className="container">
                  <div className="client-logo-item">
                    <div className="row owl-carousel" id="client-slider">
                      <div
                        className="col-sm wow fadeInUp"
                        data-wow-duration="1.5s"
                      >
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style1.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-sm wow fadeInUp" data-wow-duration="2s">
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style2.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        className="col-sm wow fadeInUp"
                        data-wow-duration="2.5s"
                      >
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style3.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-sm wow fadeInUp" data-wow-duration="3s">
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style4.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        className="col-sm wow fadeInUp"
                        data-wow-duration="3.5s"
                      >
                        <div className="client-logo">
                          <img
                            src="assets/images/client_logo/logo_style5.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
     
        <div className="how-work-and-token-area">
          <section className="how-work-sec section-padding" id="how_work">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <div className="section-title-item">
                    <small className="xs-section-title"></small>
                    <h2 className="section-title">Token Launch Details</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 wow fadeInUp " data-wow-duration="1.5s">
                  <div className="xs-count-down">
                    <h3 className="xs-single-title">Private Sale</h3>
                    <ul className="xs-counter-list">
                      <li>
                        <strong id="">{day}</strong>
                        <span>Day</span>
                      </li>
                      <li>
                        <strong id="">{hour}</strong>
                        <span>Hours</span>
                      </li>
                      <li>
                        <strong id="">{minute}</strong>
                        <span>Minute</span>
                      </li>
                      <li>
                        <strong id="">{second}</strong>
                        <span>Second</span>
                      </li>
                    </ul>
                    <div className="btn-wrapper text-center">
                      { isPrivateBuy==true && (<button className="btn btn-primary" onClick={toggleModal}>Buy BV</button>)}
                      { isGetBV==true && (<button className="btn btn-primary" onClick={handlegetFundsBNB}>Get BV</button>)}
                    </div>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={toggleModal}
                      contentLabel="My dialog"
                      className="mymodal"
                      overlayClassName="myoverlay"
                      closeTimeoutMS={500}
                    >
                       <div className="language-content">
                            <p>PrivateSale</p>
                            <ul className="xs-counter-list">
                              <li>
                                <strong id="">{day}</strong>
                                <span>Day</span>
                              </li>
                              <li>
                                <strong id="">{hour}</strong>
                                <span>Hours</span>
                              </li>
                              <li>
                                <strong id="">{minute}</strong>
                                <span>Minute</span>
                              </li>
                              <li>
                                <strong id="">{second}</strong>
                                <span>Second</span>
                              </li>
                            </ul>
                            <ul className="flag-lists">
                              <li>
                                <span>Input amount of BNB</span>
                                <input type="number" name="amount" value={Amount} onChange={InputValue} />
                              </li>
                              <li>
                                <div className="btn-wrapper text-center"><button className="btn btn-primary" onClick={handleBuyToken}>Buy</button></div>
                              </li>
                            </ul>
                            <a className="closeModal" onClick={toggleModal}>X</a>
                          </div>
                      
                    </Modal>
                    {/* <!-- xs modal --> */}
                    
                  </div>
                </div>
                <div className="col-lg-3 offset-lg-1 col-md-6 align-self-center wow fadeInUp" data-wow-duration="2s">
                  <div className="work-token-item">
                    <ul>
                      <li>
                        <strong> Pre-Sale Starts</strong>
                        <span> Open for registration</span>
                      </li>
                      <li>
                        <strong> Pre-Sale Terms</strong>
                        <span>To be confirmed</span>
                      </li>
                      <li>
                        <strong> Token Symbol</strong>
                        <span>BVLT</span>
                      </li>
                      <li>
                        <strong> Total Number of Tokens</strong>
                        <span>To be confirmed</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 align-self-center col-md-12 wow fadeInUp" data-wow-duration="2.5s">
                  <div className="work-video">
                    <img src="assets/images/how-works/video.jpg" alt=""/>
                    <a href="https://www.youtube.com/watch?v=G5Hy4-ri6b4" className="video-btn xs-video" data-effect="mfp-zoom-in">
                      <i className="icon icon-play-button2"></i>
                      <span className="btn-hover-anim"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="token-roadmap-area">
            <section className="token-distribution-sec section-padding" >
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <div className="section-title-item">
                      <small className="xs-section-title">Token Details</small>
                      <h2 className="section-title">Token Distribution</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 wow fadeInUp" data-wow-duration="1.5s">
                    <div className="row chart-gap">
                      <div className="col-sm-7 ml-lg-auto">
                        <canvas className="token-chart-item" id="myChart"></canvas>
                        <h3 className="xs-single-title">Token Distribution</h3>
                      </div>
                      <div className=" col-sm-5">
                        <ul className="chart-label">
                          <li>
                            <img src="assets/images/token/label_img1.png" alt=""/>
                            <span className="chart-bg1"></span> To Be Comfirmed
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2.png" alt=""/>
                            <span className="chart-bg2"></span> To Be Comfirmed
                          </li>
                          <li>
                            <img src="assets/images/token/label_img3.png" alt=""/>
                            <span className="chart-bg3"></span> To Be Comfirmed
                          </li>
                          <li>
                            <img src="assets/images/token/label_img4.png" alt=""/>
                            <span className="chart-bg4"></span> To Be Comfirmed
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 wow fadeInUp" data-wow-duration="2s">
                    <div className="row chart-gap">
                      <div className="col-sm-7 ml-lg-auto">
                        <canvas className="token-chart-item" id="myChartTwo"></canvas>
                        <h3 className="xs-single-title">Tokenomics</h3>
                      </div>
                      <div className="col-sm-5">
                        <ul className="chart-label chartLabel2">
                          <li>
                            <img src="assets/images/token/label_img2-1.png" alt=""/>
                            <span className="chart-bg1">2 %</span> Liquidity
                          </li>
                          <li>  
                            <img src="assets/images/token/label_img2-2.png" alt=""/>
                            <span className="chart-bg2">3 %</span> Development
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2-3.png" alt=""/>
                            <span className="chart-bg3">2 %</span> Marketing
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2-4.png" alt=""/>
                            <span className="chart-bg4">3 %</span> Holders
                          </li>
                          <li>
                            <img src="assets/images/token/label_img2-5.png" alt=""/>
                            <span className="chart-bg5">2 %</span> Buy Back
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="roadmap-sec section-padding" >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <div className="section-title-item">
                      <small className="xs-section-title"></small>
                      <h2 className="section-title">Blocvault Roadmap</h2>
                    </div>
                  </div>
                </div>
                <div className="roadmap-timeline">
                  <img src="assets/images/roadmap/timelinered.png" alt=""/>
                  <div className="custom-container container">
                    <div className="row roadmap-timeline-item">
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="1.5s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Oct 2021</h3>
                          <p> 
                              Social Media Platforms<br/>
                              Whitepaper Launch<br/>
                              Build out our community<br/>
                              Begin App Development
                          </p>
                        </div>
                      </div>
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="2s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Nov 2021</h3>
                            <p> 
                              Website Launch<br/>
                              Social Marketing<br/>
                              New token platforms<br/>
                              Techrate Audit.<br/>
                              Begin PPC campaign’s<br/>
                              Token Giveaways<br/>
                            </p>
                        </div>
                      </div>
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="2.5s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Dec 2021</h3>
                          <p> 
                            Pre-Sale BVLT Token<br/> 
                            Public Launch BVLT<br/>
                            List on CMC & CG<br/>
                            (fast-tracked)<br/>
                            Trend on DEX & CMC<br/> 
                            Massive marketing<br/>
                            push directly with<br/>
                            Launch
                          </p>
                        </div>
                      </div>
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="3s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Jan-Feb 2022</h3>
                          <p> 
                            Continue to market<br/>
                            BVLT Globally<br/>
                            Ramp up Development<br/>
                            of our App<br/>
                            Second Audit By Certik<br/>
                            Listing on Major<br/>
                            Exchanges<br/>
                            Launch of New Website 
                          </p>
                        </div>
                      </div>
                      <div className="col-md xs-roadmap wow fadeInUp" data-wow-duration="3.5s">
                        <div className="single-roadmap-timeline">
                          <b></b>
                          <h3>Mar-Apr 2022</h3>
                          <p>
                            Global App Marketing<br/>
                            Release Merch Store<br/>
                            Test App for Launch<br/>
                            Release BVW Wallet<br/>
                            Listing on top 10<br/>
                            exchange
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
    </>
  );
}
